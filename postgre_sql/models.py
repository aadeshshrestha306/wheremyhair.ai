from sqlalchemy import Column, Integer, String, ForeignKey, LargeBinary, ARRAY, DateTime
from sqlalchemy.orm import relationship

from database import Base

class User(Base):
    """Create Table"""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    usage = Column(ARRAY(DateTime), default=list)

