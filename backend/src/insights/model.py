from pydantic import BaseModel

class MonthlyFinancialHealthResponse(BaseModel):
    analysis_detail: str
    icon: str
    status: str
    income: float
    expense: float
    net_saved: float
    
    class Config:
        orm_mode = True
        from_attributes = True
        