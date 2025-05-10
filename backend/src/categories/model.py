from datetime import datetime
from uuid import UUID
from pydantic import BaseModel

class CreateCategoryRequest(BaseModel):
    category_name: str
    icon: str | None = None
    color: str
    is_income: bool = False
    is_custom: bool = False

class CategoryUpdate(BaseModel):
    category_name: str
    icon: str | None = None
    color: str | None = None
    is_income: bool = False

class CategoryResponse(BaseModel):
    category_id: UUID
    category_name: str
    icon: str | None = None
    color: str
    is_income: bool
    is_custom: bool
    user_id: UUID | None = None
    created_at: datetime
    updated_at: datetime | None = None

    class Config:
        from_attributes = True
        arbitrary_types_allowed = True

class UpdateCategoryRequest(BaseModel):
    category_name: str | None = None
    icon: str | None = None
    color: str | None = None
    is_income: bool | None = None   