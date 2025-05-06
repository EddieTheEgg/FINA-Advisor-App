import datetime
from pydantic import BaseModel
from sqlalchemy.dialects.postgresql import UUID

class TransactionCreate(BaseModel):
    amount: float
    description: str

class TransactionResponse(BaseModel):
    transaction_id: UUID
    amount: float
    description: str
    created_at: datetime
    
    class Config:
        from_attributes = True
        arbitrary_types_allowed = True 
    