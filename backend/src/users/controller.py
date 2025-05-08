from fastapi import APIRouter
from starlette import status
from backend.src.auth.service import CurrentUser
from backend.src.database.core import DbSession
from backend.src.users.model import UserResponse, PasswordChange
from backend.src.users import service

router = APIRouter(
    prefix='/users',
    tags=['users']
)

@router.get("/me", response_model = UserResponse)
def get_current_user( db: DbSession, current_user: CurrentUser):
    return service.get_user_by_id(db, current_user.get_uuid())

@router.put("/change-password", status_code = status.HTTP_200_OK)
def change_password(
    db: DbSession,
    current_user: CurrentUser,
    password_change: PasswordChange
):
    service.change_password(db, current_user.get_uuid(), password_change)


