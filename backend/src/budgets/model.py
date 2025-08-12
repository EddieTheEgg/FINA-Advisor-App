from pydantic import BaseModel
from datetime import date
from uuid import UUID
from backend.src.categories.model import CategoryResponse

class BudgetCreateRequest(BaseModel):
    category_id: str
    budget_name: str | None #Can be none if user doesn't provide name, which will default back to category name
    budget_amount: float
    budget_month: date #Always the first day of the month to keep consistency since only month digit matters    
    
    
class BudgetResponse(BaseModel):
    budget_id: UUID
    category_data: CategoryResponse
    budget_name: str | None #Can be none if user doesn't provide name, which will default back to category name
    budget_spent: float
    budget_amount: float
    budget_month: date
    
    class Config:
        orm_mode = True    
        
        
class BudgetCategoryResponse(BaseModel):
    category_id: UUID
    category_icon: str
    category_color: str
    category_name: str
    category_description: str | None



