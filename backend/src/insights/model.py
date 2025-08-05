from pydantic import BaseModel
from backend.src.categories.model import CategoryResponse
from backend.src.entities.enums import KeyInsightsStatus

class MonthlyFinancialHealthResponse(BaseModel):
    analysis_detail: str
    icon: str
    status: KeyInsightsStatus
    income: float
    expense: float
    net_saved: float
    
    class Config:
        orm_mode = True
        from_attributes = True
        
        
class MonthlySavingsRateResponse(BaseModel):
    status: KeyInsightsStatus
    savings_analysis: str
    icon: str
    percentage_savings: float
    
    class Config:
        orm_mode = True
        from_attributes = True
    
class MonthlyTopSpendingCategoryResponse(BaseModel):
    status: KeyInsightsStatus
    category: CategoryResponse
    total_spent: float
    percentage_spent: float
    
    class Config:
        orm_mode = True
        from_attributes = True
    
    
class MonthlySpendingTrend(BaseModel):
    status: KeyInsightsStatus
    current_month_spending: float
    previous_month_spending: float
    spending_trend_percentage: float #percentage of change in spending from previous month to current month
    icon: str
    
    class Config:
        orm_mode = True
        from_attributes = True
    
    
    



class KeyInsightsResponse(BaseModel):
    monthly_financial_health: MonthlyFinancialHealthResponse
    monthly_savings_rate: MonthlySavingsRateResponse
    monthly_top_spending_category: MonthlyTopSpendingCategoryResponse | None
    monthly_spending_trend: MonthlySpendingTrend

