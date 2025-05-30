from datetime import timedelta, datetime, timezone 
from typing import Annotated 
from uuid import UUID, uuid4
from dotenv import load_dotenv
from fastapi import Depends
from passlib.context import CryptContext
import os
from sqlalchemy.orm import Session
from backend.src.entities.user import User
from backend.src.auth.model import NewRegisteredUserResponse, Token, TokenData, RegisterUserRequest, LoginRequest, RefreshTokenRequest
from fastapi.security import OAuth2PasswordBearer
from backend.src.exceptions import AuthenticationError, DuplicateEmailError, DuplicateUsernameError
from backend.src.auth.jwt import (
    create_access_token,
    create_refresh_token,
    decode_access_token,
    decode_refresh_token,
)
import logging

load_dotenv()

# For Swagger UI test purposes, will still use /login mainly in the front, this is for testing purposes only
oauth2_bearer = OAuth2PasswordBearer(tokenUrl='auth/token')
bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated = 'auto')

# Verifies a plaintext password against a hashed password using bcrypt
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt_context.verify(plain_password, hashed_password)

# Returns the hashed version of the password (encrypted)
def get_password_hash(password: str) -> str:
    return bcrypt_context.hash(password)

# Attempts to authenticate the given user email and password
def authenticate_user(email: str, password: str, db: Session) -> User | bool:
    logging.info(f"Attempting to authenticate user with email: {email}")
    user = db.query(User).filter(User.email == email).first()
    
    if not user:
        logging.warning(f"No user found with email: {email}")
        return False
        
    if not verify_password(password, user.hashed_password):
        logging.warning(f"Invalid password for email: {email}")
        return False
        
    logging.info(f"Successfully authenticated user: {email}")
    return user

# Generate both access and refresh tokens for a user
def create_tokens(user: User) -> Token:
    token_data = {"sub": user.email, "id": str(user.user_id)}
    access_token = create_access_token(token_data)
    refresh_token = create_refresh_token(token_data)
    return Token(
        access_token=access_token,
        refresh_token=refresh_token
    )

# Verify access token and return TokenData
def verify_access_token(token: str) -> TokenData:
    payload = decode_access_token(token)
    if not payload:
        logging.warning("Access token verification failed")
        raise AuthenticationError()
    return TokenData(user_id=payload.get("id"))

# Verify refresh token and return TokenData
def verify_refresh_token(token: str) -> TokenData:
    payload = decode_refresh_token(token)
    if not payload:
        logging.warning("Refresh token verification failed")
        raise AuthenticationError()
    return TokenData(user_id=payload.get("id"))

# Attempting to register as a new user
def register_user(db: Session, register_user_request: RegisterUserRequest) -> NewRegisteredUserResponse:
    logging.info(f"Attempting to register new user with email: {register_user_request.email}")
    
    existing_email = db.query(User).filter(User.email == register_user_request.email).first()
    if existing_email:
        logging.warning(f"Registration attempt with existing email: {register_user_request.email}")
        raise DuplicateEmailError(register_user_request.email)
    
    existing_username = db.query(User).filter(User.username == register_user_request.username).first()
    if existing_username:
        logging.warning(f"Registration attempt with existing username: {register_user_request.username}")
        raise DuplicateUsernameError(register_user_request.username)
    
    try:
        hashed_password = get_password_hash(register_user_request.password)
        create_new_user = User(
            user_id = uuid4(),
            email = register_user_request.email,
            username = register_user_request.username,
            first_name = register_user_request.first_name,
            last_name = register_user_request.last_name,
            hashed_password = hashed_password
        )
        db.add(create_new_user)
        db.commit()
        db.refresh(create_new_user)
        
        logging.info(f"Successfully registered user: {register_user_request.email}")
        
        # Generate tokens for the new user
        tokens = create_tokens(create_new_user)
        
        return NewRegisteredUserResponse(
            user_id=create_new_user.user_id,
            email=create_new_user.email,
            username=create_new_user.username,
            first_name=create_new_user.first_name,
            last_name=create_new_user.last_name,
            access_token=tokens.access_token,
            refresh_token=tokens.refresh_token,
            token_type=tokens.token_type
        )
    except Exception as e:
        logging.error(f"failed to register user: {register_user_request.email}. Error: {str(e)}")
        raise

# Login and return both access and refresh tokens
def login_user(login_request: LoginRequest, db: Session) -> Token:
    user = authenticate_user(login_request.email, login_request.password, db)
    if not user:
        raise AuthenticationError()
    return create_tokens(user)

# Refresh access token using refresh token
def refresh_access_token(refresh_request: RefreshTokenRequest, db: Session) -> Token:
    token_data = verify_refresh_token(refresh_request.refresh_token)
    if not token_data:
        raise AuthenticationError()
    
    user = db.query(User).filter(User.user_id == token_data.get_uuid()).first()
    if not user:
        raise AuthenticationError()
    
    return create_tokens(user)

# Get current user from access token
def get_current_user(token: Annotated[str, Depends(oauth2_bearer)]) -> TokenData:
    return verify_access_token(token)

CurrentUser = Annotated[TokenData, Depends(get_current_user)]



