from datetime import datetime, timedelta, timezone
from typing import Optional
import jwt
from jwt.exceptions import InvalidTokenError
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

ACCESS_TOKEN_SECRET = os.getenv('ACCESS_TOKEN_SECRET')
REFRESH_TOKEN_SECRET = os.getenv('REFRESH_TOKEN_SECRET')
ALGORITHM = os.getenv("ALGORITHM")

if not ACCESS_TOKEN_SECRET or not REFRESH_TOKEN_SECRET:
    raise ValueError("JWT secrets must be set in environment variables")

ACCESS_TOKEN_EXPIRE_TIME = int(os.getenv('ACCESS_TOKEN_EXPIRE_TIME'))
REFRESH_TOKEN_EXPIRE_TIME = int(os.getenv('REFRESH_TOKEN_EXPIRE_TIME'))

#Create a new access token
def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_TIME)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, ACCESS_TOKEN_SECRET, algorithm=ALGORITHM)

#Create a new refresh token
def create_refresh_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(days=REFRESH_TOKEN_EXPIRE_TIME)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, REFRESH_TOKEN_SECRET, algorithm=ALGORITHM)

#Decode and validate access token
def decode_access_token(token: str) -> dict | None:
    try:
        return jwt.decode(token, ACCESS_TOKEN_SECRET, algorithms=[ALGORITHM])
    except InvalidTokenError:
        return None

#Decode and validate refresh token
def decode_refresh_token(token: str) -> dict | None:
    try:
        return jwt.decode(token, REFRESH_TOKEN_SECRET, algorithms=[ALGORITHM])
    except InvalidTokenError:
        return None 