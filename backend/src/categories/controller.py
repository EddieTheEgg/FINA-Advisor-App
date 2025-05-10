from typing import List
from uuid import UUID
from fastapi import APIRouter, Query
from starlette import status

from backend.src.auth.service import CurrentUser
from backend.src.categories.model import CategoryResponse, CreateCategoryRequest, UpdateCategoryRequest
from backend.src.database.core import DbSession
from backend.src.categories import service

router = APIRouter(
    prefix='/categories',
    tags=['categories']
)

#Creates a new custom category for the following user
@router.post("/create-category", response_model=CategoryResponse, status_code=status.HTTP_201_CREATED)
def create_category(
        db: DbSession,
        create_category_request: CreateCategoryRequest,
        current_user: CurrentUser
):
    return service.create_category(db, create_category_request, current_user.get_uuid())

#Gets all categories accessible to the user
@router.get("/user-categories", response_model = List[CategoryResponse])
def get_user_categories(
    db: DbSession,
    current_user: CurrentUser,
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    include_system: bool = Query(True)
):
    return service.get_user_categories(db, current_user.user_id, skip, limit, include_system)

#Updates a specific category that is associated with the current active user
@router.put("/update-category", response_model = CategoryResponse, status_code =status.HTTP_200_OK)
def update_category(
        db: DbSession,
        category_id: UUID,
        update_category_request: UpdateCategoryRequest,
        current_user: CurrentUser
    ):
        return service.update_category(db, category_id, update_category_request, current_user.get_uuid())

#Deletes a specific category that is associated with the current active user
@router.delete("/delete-category", status_code = status.HTTP_204_NO_CONTENT)
def delete_category(
        db: DbSession,
        category_id: UUID,
        current_user: CurrentUser
):
    return service.delete_category(db, category_id, current_user.get_uuid())
