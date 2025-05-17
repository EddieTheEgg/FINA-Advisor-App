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

    class Config:
        from_attributes = True
        arbitrary_types_allowed = True

class CategorySuggestionResponse(BaseModel):
    transaction_id: UUID | None = None
    category_id: UUID | None = None
    suggested_category_name: str | None = None
    confidence: float
    method: str = "openai"

    class Config:
        from_attributes = True
        arbitrary_types_allowed = True




