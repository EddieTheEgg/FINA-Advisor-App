#User and Auth related logic will be implemented here
from typing import Annotated
from fastapi import APIRouter, Depends, Request
from fastapi.security import OAuth2PasswordRequestForm
from starlette import status
from backend.src.rate_limiting import limiter
from backend.src.auth.model import Token, RegisterUserRequest
from backend.src.auth import service as AuthService
from backend.src.categories import service as CategoryService
from backend.src.database.core import DbSession

router = APIRouter(
    prefix='/auth',
    tags=['auth']
)

@router.post("/register", status_code = status.HTTP_201_CREATED)
@limiter.limit("5/hour")
async def register_user(request: Request, register_user_request: RegisterUserRequest, db: DbSession):
    new_registered_user = AuthService.register_user(db, register_user_request)
    CategoryService.create_default_categories(db, new_registered_user.user_id)
    return new_registered_user


@router.post("/token", response_model = Token)
async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
                                 db: DbSession):
    return AuthService.login_for_access_token(form_data, db)

