#User and Auth related logic will be implemented here
from fastapi import APIRouter
from backend.src.users.model import UserCreate, UserLogin

router = APIRouter(
    prefix='/auth',
    tags=['auth']
)

@router.post("/register")
def register(user: UserCreate):
    # Some implementation
    return {"message": "User registered"}


@router.post("/login")
def login(user: UserLogin):
    # Some implementation
    return {"message": "User logged in"}


