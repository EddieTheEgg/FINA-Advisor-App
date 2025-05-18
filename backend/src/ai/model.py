from uuid import UUID
from pydantic import BaseModel
from typing import List
from datetime import datetime

class SuggestCategoryRequest(BaseModel):
    amount: float
    title: str
    transaction_date: datetime
    is_income: bool
    notes: str | None = None
    location: str | None = None
    is_subscription: bool = False
    subscription_frequency: str | None = None
    subscription_start_date: datetime | None = None
    subscription_end_date: datetime | None = None
    merchant: str | None = None
    payment_type: str | None = None
    payment_account: str | None = None
    client_reference: str | None = None

    class Config:
        from_attributes = True
        arbitrary_types_allowed = True

class CategorySuggestionResponse(BaseModel):
    suggestion_id: UUID
    category_id: UUID | None = None
    suggested_category_name: str | None = None
    confidence: float
    method: str = "openai"
    client_reference: str | None = None

    class Config:
        from_attributes = True
        arbitrary_types_allowed = True

# Track when a suggestion is applied
class ApplySuggestionRequest(BaseModel):
    suggestion_id: UUID
    transaction_id: UUID  
    was_applied: bool = True

class ApplySuggestionResponse(BaseModel):
    success: bool
    transaction_id: UUID
    suggestion_id: UUID

    class Config:
        from_attributes = True
        arbitrary_types_allowed = True




