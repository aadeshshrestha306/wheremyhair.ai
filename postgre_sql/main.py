from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
from models import Credentials
import schemas
import database

app = FastAPI(title='wheremyhair.ai')

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Secret key for JWT token
SECRET_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJleGFtcGxlQGdtYWlsLmNvbSIsImV4cCI6MTcwOTI4NjQxNX0.2vHToCC5OIeGeGaD0mhFxpV01OG-p-WpOHkgTqmjHsI"
REFRESH_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJleGFtcGxlQGdtYWlsLmNvbSIsImV4cCI6MTcwOTg4OTQxNX0.hjltim67HwVg12z1HTK9GpddkY9sGOHFBNNpDR9u0-M"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS = 7


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password, hash_password):
    return pwd_context.verify(plain_password, hash_password)

def get_user(db, email:str):
    return db.query(Credentials).filter(Credentials.email == email).first()

def authenticate_user(db, email: str, password: str):
    user = get_user(db, email)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user