from datetime import timedelta, datetime, timezone 
from typing import Annotated 
from uuid import UUID, uuid4
from dotenv import load_dotenv
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
import os
from sqlalchemy.orm import Session
from backend.src.entities.user import User
from backend.src.entities.enums import ACCOUNT_TYPE_COLORS, ACCOUNT_TYPE_ICONS
from backend.src.auth.model import NewRegisteredUserResponse, Token, TokenData, RegisterUserRequest, LoginRequest, RefreshTokenRequest, EmailAvailabilityRequest, EmailAvailabilityResponse, SignupRequest
from backend.src.accounts.model import AccountCreateRequest
from backend.src.accounts.service import create_account
from backend.src.categories.service import create_default_categories
from backend.src.snapshots.service import create_user_baseline_snapshot
from backend.src.exceptions import AuthenticationError, DuplicateEmailError, DuplicateUsernameError, AccountSignUpError
from backend.src.auth.jwt import (
    create_access_token,
    create_refresh_token,
    decode_access_token,
    decode_refresh_token,
)
import logging

load_dotenv()

# For Swagger UI test purposes, will still use /login mainly in the front, this is for testing purposes only
oauth2_bearer = OAuth2PasswordBearer(tokenUrl='auth/token') # This will be used to get the access token from the client
bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated = 'auto') # This will be used to hash and verify passwords

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
    
    # Only check for duplicate username if username is provided
    if register_user_request.username:
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

# Check if email is available for registration
def check_email_availability(email_request: EmailAvailabilityRequest, db: Session) -> EmailAvailabilityResponse:
    logging.info(f"Checking email availability for: {email_request.email}")
    
    existing_user = db.query(User).filter(User.email == email_request.email).first()
    
    if existing_user:
        logging.info(f"Email {email_request.email} is already taken")
        return EmailAvailabilityResponse(
            available=False,
            message=f"This email is already registered. Please use different email."
        )
    else:
        logging.info(f"Email {email_request.email} is available")
        return EmailAvailabilityResponse(
            available=True,
            message=f"Email {email_request.email} is available"
        )

# Combined signup function - register user and create their main account and default categories
def signup_user_with_account(db: Session, signup_request: SignupRequest) -> NewRegisteredUserResponse:
    try:
        # Register user first
        user = register_user(db, signup_request.user_information)
        
        # Setup account request
        account_request_information = signup_request.account_information
        account_request_formatted = AccountCreateRequest(
            name = account_request_information.account_name,
            account_type = account_request_information.account_type,
            balance = account_request_information.balance,
            color = ACCOUNT_TYPE_COLORS[account_request_information.account_type.name].value[0],
            icon = ACCOUNT_TYPE_ICONS[account_request_information.account_type.name].value[0],
            is_default = True,
            include_in_totals = True,
            is_active = True,
            credit_limit = account_request_information.credit_limit,
            bank_name = account_request_information.bank_name,
            account_number = None, #TEMP not used
            routing_number = None, #TEMP not used
        )
        
        # Create account with the registered user
        account = create_account(db, account_request_formatted, user.user_id)
        if not account:
            logging.error(f"Failed to create account for user {user.user_id}")
            raise AccountSignUpError('Failed to sign up user since their account was not created')
        
        # Create the default categories for the user
        categories = create_default_categories(db, user.user_id)
        if not categories:
            logging.error(f"Failed to create default categories for user {user.user_id}")
            raise AccountSignUpError('Failed to sign up user since their default categories were not created')
        
        # Create baseline snapshot for the user
        snapshot = create_user_baseline_snapshot(db, user.user_id)
        if not snapshot:
            logging.error(f"Failed to create baseline snapshot for user {user.user_id}")
            raise AccountSignUpError('Failed to sign up user since their baseline snapshot was not created')
        
        return user
        
    except Exception as e:
        logging.error(f"Failed to signup user with account: {str(e)}")
        raise AccountSignUpError(f'Failed to sign up user: {str(e)}')

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



