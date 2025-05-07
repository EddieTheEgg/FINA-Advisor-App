from datetime import timedelta, datetime, timezone 
from typing import Annotated 
from uuid import UUID, uuid4
from dotenv import load_dotenv
from fastapi import Depends
from passlib.context import CryptContext
import os
import jwt
from jwt import PyJWTError
from sqlalchemy.orm import Session
from backend.src.entities.user import User
from backend.src.auth.model import Token, TokenData, RegisterUserRequest
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jose import jwt
from backend.src.exceptions import AuthenticationError
import logging

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_bearer = OAuth2PasswordBearer(tokenUrl='auth/token')
bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated = 'auto')

# Verifies a plaintext password against a hashed password using bcrypt
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt_context.verify(plain_password, hashed_password)

# Returns the hashed version of the password (encrypted)
def get_password_hash(password: str) -> str:
    return bcrypt_context.hash(password)



# Attempts to authenticate the given user email and password, where if these
# entered fields are valid the user authenticated gets returned, else false
def authenticate_user(email: str, password: str, db: Session) -> User | bool:
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.hashed_password):
        logging.warning(f"Failed authentication attempt for email: {email}")
        return False
    return user

# When an authenticated user logs in sucessfully, create JWT token to be sent over
def create_access_token(email: str, user_id: UUID, expires_delta: timedelta) -> str:
    #The payload/signature
    encode = {
        'sub': email,
        'id': str(user_id),
        'exp': datetime.now(timezone.utc) + expires_delta
    }
    return jwt.encode(encode, SECRET_KEY, algorithm = ALGORITHM)

# When user sends a request along with the token, verify the token
# signature/payload is valid upon decoding
def verify_token(token: str) -> TokenData:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get('id')
        return TokenData(user_id=user_id)
    except PyJWTError as e:
        logging.warning(f"Token verification failed: {str(e)}")
        raise AuthenticationError()

# Attempting to register as a new user adding to the db, hashing password as part of the request.
def register_user(db: Session, register_user_request: RegisterUserRequest) -> None:
    try:
        create_new_user = User(
            user_id = uuid4(),
            email = register_user_request.email,
            username = register_user_request.username,
            first_name = register_user_request.first_name,
            last_name = register_user_request.last_name,
            hashed_password = get_password_hash(register_user_request.password)
        )
        db.add(create_new_user)
        db.commit()
    except Exception as e:
        logging.error(f"failed to register user: {register_user_request.email}. Error: {str(e)}")
        raise

# When user logs in, provide a token if login is valid
def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], 
                                                db: Session) -> Token:
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise AuthenticationError()
    token = create_access_token(user.email, user.id, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    return Token(access_token = token, token_type = 'bearer')


# Checks if the given token is valid, and if so returns TokenData object which represents
# the authenticated user (via id)
def get_current_user(token: Annotated[str, Depends(oauth2_bearer)]) -> TokenData:
    return verify_token(token)

CurrentUser = Annotated[TokenData, Depends(get_current_user)]



