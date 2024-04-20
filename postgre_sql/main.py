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
import json

import models, schemas, crud
from database import SessionLocal, engine
from dotenv import load_dotenv
import os
import io
from PIL import Image
import tensorflow as tf
import numpy as np
import anthropic

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



def generate_verification_code():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=6))


### Routes

@app.get("/hello-world/")
def hello_world():
    return {'message': 'Welcome to wheremyhair.ai'}

@app.post("/send-verification-code/")
async def send_verification_code(email: EmailStr = Form(...)):
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
    return {"access_token": access_token, "token_type": "bearer", "username": user.username}


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

@app.put("/users/{username}")
async def update_user(
    user_email: EmailStr,
    username: str,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    if current_user['email'] == user_email:
        crud.update_user(db=db, user_email=user_email, username=username)
        return {"message": "Username updated successfully"}
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


client = anthropic.Anthropic(api_key="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")


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

    prompt = f"3 advice on baldness level{prediction_label} in bullet points"

    message = client.messages.create(
        model='claude-3-opus-20240229',
        max_tokens=1000,
        temperature=0.0,
        system="Respond only in Yoda-speak.",
        messages=[
            {'role':'user', 'content': prompt}
        ]
    )

    text = message.content

    advice = [block.text for block in text]

    if prediction_label == "type 2":
        description = """Type 2 baldness is the initial stage of male pattern baldness, characterized by a slightly receding hairline and minimal thinning at the crown. It is often the first sign of hair loss in men and may not be immediately noticeable to others."""
        
    elif prediction_label == "type 3":
        description = """Type 3 baldness is a moderate stage of male pattern baldness, characterized by a more pronounced receding hairline and noticeable thinning at the crown. Hair loss becomes more evident at this stage, and individuals may start to consider hair loss treatments."""
        
    elif prediction_label == "type 4":
        description = """Type 4 baldness is an advanced stage of male pattern baldness, characterized by a significantly receded hairline and extensive thinning on the crown. The hair loss is more severe, and individuals may experience a substantial change in their appearance."""
        
    elif prediction_label == "type 5":
        description = """Type 5 baldness is a severe stage of male pattern baldness, characterized by extensive hair loss with only a narrow band of hair remaining around the sides and back of the head. The scalp becomes more visible, and individuals may consider more drastic measures to address their hair loss."""
        
    elif prediction_label == "type 6":
        description = """Type 6 baldness is an advanced stage of male pattern baldness, characterized by severe hair loss with only a horseshoe-shaped band of hair remaining around the sides and back of the head. The hair loss is extensive, and individuals may need to explore surgical options to restore their hair."""
        
    elif prediction_label == "type 7":
        description = """Type 7 baldness is the most severe stage of male pattern baldness, characterized by complete baldness on the top of the head. There is no remaining hair on the top of the head, and individuals may choose to embrace their baldness or explore alternative options such as wigs or hairpieces."""
        

    return JSONResponse(content={"prediction": prediction_label,
                                 "confidence": confidence,
                                 "description": description,
                                 "advice": advice,
                                 })
   