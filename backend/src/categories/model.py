from datetime import datetime
from uuid import UUID
from pydantic import BaseModel, Field
from backend.src.entities.enums import TransactionType

class CategoryCreate(BaseModel):
    category_name: str
    icon: str
    color: str
    transaction_type: TransactionType
    is_custom: bool = True

class CategoryUpdate(BaseModel):
    category_name: str | None = None
    icon: str | None = None
    color: str | None = None
    transaction_type: TransactionType | None = None
    is_custom: bool | None = None

class CategoryResponse(BaseModel):
    category_id: UUID
    category_name: str
    icon: str
    color: str
    transaction_type: TransactionType
    category_description: str | None = None
    is_custom: bool
    created_at: datetime
    updated_at: datetime | None = None

    class Config:
        from_attributes = True
        arbitrary_types_allowed = True
    
class CategorySimplifiedResponse(BaseModel):
    category_id: UUID
    category_name: str
    icon: str
    color: str
    is_custom: bool
    class Config:
        from_attributes = True
        arbitrary_types_allowed = True

class CategoryListResponse(BaseModel):
    categories: list[CategoryResponse]
    total: int
    has_next: bool
    current_page: int
    page_size: int

    class Config:
        from_attributes = True
        arbitrary_types_allowed = True

class UpdateCategoryRequest(BaseModel):
    category_name: str | None = None
    icon: str | None = None
    color: str | None = None
    transaction_type: TransactionType | None = None   
    
    
    
class CategoryManageSummary(BaseModel):
    category_id: UUID
    category_name: str
    category_description: str | None
    category_type: TransactionType
    category_icon: str
    category_color: str
    used_in_transactions: int
    used_in_budgets: int
    
class CategoryManageResponse(BaseModel):
    categories: list[CategoryManageSummary]
    total_categories: int
    has_next: bool
    current_page: int
    page_size: int