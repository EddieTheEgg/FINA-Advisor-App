from uuid import UUID
from pydantic import BaseModel
from typing import List
from datetime import datetime

from backend.src.entities.enums import TransactionType, TipDifficulty

class SuggestCategoryRequest(BaseModel):
    amount: float
    title: str
    transaction_date: datetime
    transaction_type: TransactionType
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

# Smart Saving Tip Models
class FinancialContext(BaseModel):
    user_id: UUID
    monthly_income: float
    monthly_expenses: float
    monthly_savings: float
    top_spending_categories: List[dict]  # List of {category_name: str, amount: float, percentage: float}
    recent_transactions: List[dict]  # List of recent transaction summaries
    savings_goal: float | None = None
    current_savings_rate: float  # Percentage of income saved
    
    class Config:
        from_attributes = True
        arbitrary_types_allowed = True

class SmartSavingTipRequest(BaseModel):
    financial_context: FinancialContext
    client_reference: str | None = None

    class Config:
        from_attributes = True
        arbitrary_types_allowed = True

class SmartSavingTipResponse(BaseModel):
    tip_id: UUID
    title: str
    description: str
    potential_savings: float
    timeframe: str  # e.g., "per month", "per year"
    category: str | None = None  # Related spending category
    difficulty: TipDifficulty  # How hard is it to implement the tip?
    confidence: float
    client_reference: str | None = None

    class Config:
        from_attributes = True
        arbitrary_types_allowed = True




