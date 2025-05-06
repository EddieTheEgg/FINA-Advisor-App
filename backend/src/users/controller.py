from fastapi import APIRouter

router = APIRouter(
    prefix='/users',
    tags=['users']
)

@router.get("/")
def get_users():
    # Some implementation
    return {"message": "List of users"}

@router.post("/")
def create_user():
    # Some implementation
    return {"message": "User created"}

