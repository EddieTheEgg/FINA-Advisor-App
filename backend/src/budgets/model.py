from pydantic import BaseModel
from datetime import date
from uuid import UUID
from backend.src.categories.model import CategoryResponse
from backend.src.entities.enums import BudgetSpendingStatus
from backend.src.transactions.model import TransactionResponse

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
    
    
    
class BudgetTransactionSummary(BaseModel):
    category_color: str
    category_icon: str
    transaction_title: str
    transaction_date: date #Which we will turn to Month(abrev) DateNum in the frontend
    transaction_amount: float
    transaction_id: UUID
    
class BudgetInsightResponse(BaseModel):
    status_type: BudgetSpendingStatus
    icon: str
    projected_spent: float

    

class CoreBudgetData(BaseModel):
    budget_id: str
    budget_title: str
    budget_color: str
    budget_icon: str
    budget_period: date #In the form of YYYY-MM-01
    daily_average: float
    budget_amount: float
    spent_amount: float
    days_remaining: int
    projected_total: float

class BudgetInsightData(BaseModel):
    status_type: BudgetSpendingStatus
    daily_allowance_limit: float
    
class BudgetDetailResponse(BaseModel):
    category_data: BudgetCategoryResponse
    core_budget_data: CoreBudgetData
    budget_insight: BudgetInsightData
    recent_budget_transactions: list[BudgetTransactionSummary] #Limit is 5 transactions to display

    

class BudgetTransactionsResponse(BaseModel):
    transactions: list[BudgetTransactionSummary]
    transaction_count: int
    has_next: bool
    current_page: int
    page_size: int
    
    
    
    




