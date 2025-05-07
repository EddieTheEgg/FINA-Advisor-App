#User and Auth related logic will be implemented here
from typing import Annotated
from fastapi import APIRouter, Depends, Request
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from starlette import status
from backend.src.database.core import get_db
from backend.src.rate_limiting import limiter
from backend.src.auth.model import Token, RegisterUserRequest
from backend.src.auth import service

router = APIRouter(
    prefix='/auth',
    tags=['auth']
)

@router.post("/register", status_code = status.HTTP_201_CREATED)
@limiter.limit("5/hour")
async def register_user(request: Request, register_user_request: RegisterUserRequest, db: Session = Depends(get_db)):
    service.register_user(db, register_user_request)


@router.post("/token", response_model = Token)
async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
                                 db: Session = Depends(get_db)):
    return service.login_for_access_token(form_data, db)

