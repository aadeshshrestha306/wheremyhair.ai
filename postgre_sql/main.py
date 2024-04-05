from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
import bcrypt
from sqlalchemy.orm import Session
from typing import Annotated
from pydantic import EmailStr
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional

import models, schemas, crud
from database import SessionLocal, engine

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/user-login/')

SECRET_KEY = "f53c82add9a19fa737053af04f5df4b6790a3af1d9359d498dbc8977dad50ae9"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

blacklist = set()

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

@app.post("/user-signup/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
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


@app.post("/logout/")
async def logout(token: str = Depends(oauth2_scheme)):
    blacklist.add(token)
    return {"message": "Successful Logout!"}