from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, Form, File
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi_mail import ConnectionConfig, FastMail, MessageSchema, MessageType
from fastapi.responses import JSONResponse
from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
import bcrypt
from sqlalchemy.orm import Session
from typing import Annotated
from pydantic import EmailStr
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
import tensorflow as tf
import random
import string

import models, schemas, crud
from database import SessionLocal, engine
from dotenv import load_dotenv
import os
import io
from PIL import Image
import tensorflow as tf
import numpy as np

os.environ["CUDA_VISIBLE_DEVICES"] = "-1"

gpus = tf.config.list_physical_devices('GPU')
if gpus:
    try:
        for gpu in gpus:
            tf.config.experimental.set_virtual_device_configuration(gpu, [tf.config.experimental.VirtualDeviceConfiguration(memory_limit=1024)])
        logical_gpus = tf.config.experimental.list_logical_devices('GPU')
        print(len(gpus), "Physical GPUs,", len(logical_gpus), "Logical GPUs")
    except RuntimeError as e:
        print(e)

load_dotenv('.env')

MAIL_USERNAME= os.getenv('MAIL_USERNAME')
MAIL_PASSWORD= os.getenv('MAIL_PASSWORD')
MAIL_FROM= os.getenv('MAIL_FROM')
MAIL_PORT= int(os.getenv('MAIL_PORT'))
MAIL_SERVER= os.getenv('MAIL_SERVER')
MAIL_FROM_NAME= os.getenv('MAIL_FROM_NAME')

conf = ConnectionConfig(
    MAIL_USERNAME=MAIL_USERNAME,
    MAIL_PASSWORD=MAIL_PASSWORD,
    MAIL_FROM=MAIL_FROM,
    MAIL_PORT=MAIL_PORT,
    MAIL_SERVER=MAIL_SERVER,
    MAIL_FROM_NAME=MAIL_FROM_NAME,
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
)

model = tf.keras.models.load_model("../baldness.h5", compile=False) 

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/user-login/')

SECRET_KEY = "f53c82add9a19fa737053af04f5df4b6790a3af1d9359d498dbc8977dad50ae9"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title='wheremyhair.ai')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "DELETE", "PUT"],
    allow_headers=["*"]
)

blacklist = set()

verification_codes = {}


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def hash_password(password: str) -> str:
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    return hashed_password.decode('utf-8')


def check_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))


def authenticate_user(email: EmailStr, password: str, db: Session):
    db_user = crud.get_user_by_email(db, email=email)
    if not db_user or not check_password(password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect email or password", headers={"WWW-Authenticate": "Bearer"})
    return db_user


def create_access_token(user_email: EmailStr, user_name: str, expires_delta: timedelta):
    to_encode = {'email': user_email, 'name':user_name}
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=30)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_token(token: str):
    if token in blacklist:
        return None
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None


def generate_verification_code():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=6))


### Routes

@app.get("/hello-world/")
def hello_world():
    return {'message': 'Hello World'}

@app.post("/send-verification-code/")
async def send_verification_code(email: str = Form(...)):
    verification_code = generate_verification_code()
    verification_codes[email] = verification_code

    message = MessageSchema(
        subject="Verification Code",
        recipients=[email],
        body=f"Your verification code for wheremyhair.ai is: {verification_code}",
        subtype=MessageType.html
    )

    mail = FastMail(conf)
    await mail.send_message(message)

    return {"message": "Verification code sent", "code" : verification_code}


@app.post("/sign-up/", response_model=schemas.User)
async def verify_email(user_verification: schemas.UserVerification, user: schemas.UserCreate, db: Session = Depends(get_db)):
    stored_verification_code = verification_codes.get(user_verification.email)

    if stored_verification_code is None or stored_verification_code != user_verification.verification_code:
        raise HTTPException(status_code=400, detail="Invalid verification code")
    else:
        db_user = crud.get_user_by_email(db, email=user.email)
        if db_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        return crud.create_user(db=db, user=user)
    


@app.post("/user-login/", response_model=schemas.Token)
async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], 
                                db: Session = Depends(get_db)):
    user = authenticate_user(
        email=form_data.username, password=form_data.password, db=db
    )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        user.email, user.username, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer", "message" : "Successful Login"}


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_email: EmailStr = payload.get("email")
        user_name: str = payload.get("name")
        if user_name is None or user_email is None:
            raise credentials_exception
        return {'email': user_email, 'username': user_name}
    except JWTError:
        raise credentials_exception


@app.get("/users/auth")
async def read_users(current_user: Annotated[dict, Depends(get_current_user)],
                    db: Annotated[Session, Depends(get_db)]):
    if current_user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail='Authentication Failed')
    return (current_user)


@app.delete("/users/{user_email}")
async def delete_user(
    user_email: EmailStr,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    if current_user['email'] == user_email:
        crud.delete_user(db=db, user_email=user_email)
        return {"message": "User deleted successfully"}
    else:
        raise HTTPException(
            status_code=403, detail="You don't have permission to access this resource"
        )

#preproces uploaded image
def preprocess_img(pet):
    img_array = pet.resize((224, 224)) 
    img_array = tf.keras.utils.img_to_array(img_array)
    img_array = tf.expand_dims(img_array, axis=0)
    return img_array / 255.0


@app.post("/upload-image/")
async def upload_image(file: UploadFile):
    contents = await file.read()
    pet = Image.open(io.BytesIO(contents))

    processed_image = preprocess_img(pet)

    prediction = model.predict(processed_image)

    predicted_class_index = np.argmax(prediction[0])

    class_labels = ["type 2", "type 3", "type 4", "type 5", "type 6", "type 7"]
    prediction_label = class_labels[predicted_class_index]

    confidence = prediction[0][predicted_class_index] * 100

    return JSONResponse(content={"prediction": prediction_label,
                                 "confidence": confidence})
   