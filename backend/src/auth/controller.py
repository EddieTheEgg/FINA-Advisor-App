#User and Auth related logic will be implemented here
from typing import Annotated
from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from backend.src.auth.model import NewRegisteredUserResponse, Token, RegisterUserRequest, LoginRequest, RefreshTokenRequest, EmailAvailabilityRequest, EmailAvailabilityResponse, SignupRequest
from backend.src.auth.service import register_user, login_user, refresh_access_token, check_email_availability, signup_user_with_account
from backend.src.database.core import DbSession

router = APIRouter(
    prefix='/auth',
    tags=['auth']
)

# Check if email is available for registration
@router.post("/check-email", response_model=EmailAvailabilityResponse)
def check_email(
    email_request: EmailAvailabilityRequest,
    db: DbSession,
) -> EmailAvailabilityResponse:
    return check_email_availability(email_request, db)

#Register a new user
@router.post("/register", response_model=NewRegisteredUserResponse)
def register(
    register_user_request: RegisterUserRequest,
    db: DbSession,
) -> NewRegisteredUserResponse:
    return register_user(db, register_user_request)

# Combined signup endpoint - register user and create account
@router.post("/signup", response_model=NewRegisteredUserResponse)
def signup(
    signup_request: SignupRequest,
    db: DbSession,
) -> NewRegisteredUserResponse:
    return signup_user_with_account(db, signup_request)

# Login and return both access and refresh tokens
@router.post("/login", response_model=Token)
def login(
    login_request: LoginRequest,
    db: DbSession
) -> Token:
    return login_user(login_request, db)

#For Swagger UI test purposes, will still use /login mainly in the front, this is for testing purposes only
@router.post("/token", response_model=Token)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: DbSession
) -> Token:
    login_data = LoginRequest(email=form_data.username, password=form_data.password)
    return login_user(login_data, db)

# To get a new access token using the refresh token (if the access token is expired)
@router.post("/refresh", response_model=Token)
def refresh(
    refresh_request: RefreshTokenRequest,
    db: DbSession
) -> Token:
    return refresh_access_token(refresh_request, db)

