from typing import Annotated
from fastapi import Depends
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

engine = create_engine(
    DATABASE_URL,
    pool_size=10,  # Larger pool size for better performance
    max_overflow=20,  # More overflow for concurrent requests
    pool_pre_ping=True,
    pool_recycle=300,
    pool_timeout=30,  # Pool timeout
    connect_args={
        "connect_timeout": 30,  # Connection timeout
        "application_name": "finance_app",
        "options": "-c statement_timeout=60000"  # 60 second statement timeout
    }
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class Base(DeclarativeBase):
    pass

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
#Used for routes and functions to access db 
DbSession = Annotated[Session, Depends(get_db)]