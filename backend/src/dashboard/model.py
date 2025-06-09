from datetime import datetime
from typing import List
from pydantic import BaseModel
from uuid import UUID

from backend.src.categories.model import CategoryResponse
from backend.src.users.model import UserSimpleResponse
from backend.src.accounts.model import AccountBalance

class DashboardRequest(BaseModel):
    month: int
    year: int
    
    class Config:
        from_attributes = True

class FinancialSummary(BaseModel):
    total_balance: float
    monthly_income: float
    monthly_expense: float
    monthlyNet: float
    isPositive: bool
    
    class Config:
        from_attributes = True

class RecentTransaction(BaseModel):
    transaction_id: UUID
    amount: float
    title: str | None = None
    transaction_date: datetime
    is_income: bool
    category: CategoryResponse | None = None
    merchant: str | None = None
    account_name: str
    notes: str | None = None
    
    class Config:
        from_attributes = True
        arbitrary_types_allowed = True
        
class PeriodReponse(BaseModel):
    month: str
    year: int
    
    class Config:
        from_attributes = True
        
        
class AccountsResponse(BaseModel):
    count: int
    accounts: List[AccountBalance]
    

class DashboardResponse(BaseModel):
    user: UserSimpleResponse
    period: PeriodReponse
    financialSummary: FinancialSummary
    accounts: AccountsResponse
    recentTransactions: List[RecentTransaction]
    
    class Config:
        from_attributes = True
        arbitrary_types_allowed = True
    
