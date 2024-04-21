from sqlalchemy.orm import Session

import models, schemas
import bcrypt
from pydantic import EmailStr


def hash_password(password: str) -> str:
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    return hashed_password.decode('utf-8')

def get_user(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = hash_password(user.password)
    db_user = models.User(username=user.username, email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_email: EmailStr):
    db_user = db.query(models.User).filter(models.User.email == user_email).first()
    if db_user:
        db.delete(db_user)
        db.commit()
    return db_user

def update_user(db: Session, user_email : EmailStr, username : str):
    db_user = db.query(models.User).filter(models.User.email == user_email).first()
    if db_user:
        db_user.username = username
        db.commit()
        db.refresh(db_user)
        return db_user
    else:
        return None
