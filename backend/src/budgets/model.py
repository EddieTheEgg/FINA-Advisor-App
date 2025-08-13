from pydantic import BaseModel
from datetime import date
from uuid import UUID
from backend.src.categories.model import CategoryResponse

class BudgetCreateRequest(BaseModel):
    category_id: str
    budget_amount: float
    budget_month: date #Always the first day of the month to keep consistency since only month digit matters    
    
     
        
# Fetches categories that don't have a budget when creating budgets
class BudgetCategoryResponse(BaseModel):
    category_id: UUID
    category_icon: str
    category_color: str
    category_name: str
    category_description: str | None
    
class BudgetCategoryListResponse(BaseModel):
    categories: list[BudgetCategoryResponse]
    has_next: bool
    current_page: int
    page_size: int
    
    
# Fetches active budgets for the given month
class BudgetResponse(BaseModel):
    budget_id: UUID
    category_data: BudgetCategoryResponse
    budget_spent: float
    budget_amount: float
    budget_month: date
    
    class Config:
        orm_mode = True   
        
class BudgetListResponse(BaseModel):
    budgets: list[BudgetResponse]
    has_next: bool
    current_page: int
    page_size: int
    
    
    




