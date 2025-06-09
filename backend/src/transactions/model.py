from datetime import datetime
from typing import List
from uuid import UUID
from pydantic import BaseModel, Field, validator
from enum import Enum

from backend.src.categories.model import CategoryResponse


class PaymentType(str, Enum):
    CASH = "CASH"
    CREDIT_CARD = "CREDIT_CARD"
    DEBIT_CARD = "DEBIT_CARD"
    PAYPAL = "PAYPAL"
    APPLE_PAY = "APPLE_PAY"
    GOOGLE_PAY = "GOOGLE_PAY"
    VENMO = "VENMO"
    ZELLE = "ZELLE"
    OTHER = "OTHER"

class SubscriptionFrequency(str, Enum):
    WEEKLY = "WEEKLY"
    MONTHLY = "MONTHLY"
    QUARTERLY = "QUARTERLY"
    YEARLY = "YEARLY"

class TransactionCreate(BaseModel):
    amount: float = Field(..., ge=0)
    title: str
    transaction_date: datetime
    is_income: bool = False
    notes: str | None = None
    location: str | None = None
    is_subscription: bool = False
    subscription_frequency: SubscriptionFrequency | None = None
    subscription_start_date: datetime | None = None
    subscription_end_date: datetime | None = None
    category_id: UUID
    payment_type: PaymentType
    merchant: str | None = None
    account_id: UUID



class TransactionUpdate(BaseModel):
    amount: float | None = Field(None, ge = 0)
    title: str | None = None
    transaction_date: datetime | None = None
    is_income: bool | None = None
    notes: str | None = None
    location: str | None = None
    is_subscription: bool | None = None
    subscription_frequency: SubscriptionFrequency | None = None
    subscription_start_date: datetime | None = None
    subscription_end_date: datetime | None = None
    category_id: UUID | None = None
    payment_type: PaymentType | None = None
    merchant: str | None = None
    payment_account: str | None = None

class TransactionResponse(BaseModel):
    transaction_id: UUID
    amount: float
    title: str | None = None
    transaction_date: datetime
    is_income: bool
    notes: str | None = None
    location: str | None = None
    is_subscription: bool
    subscription_frequency: SubscriptionFrequency | None = None
    subscription_start_date: datetime | None = None
    subscription_end_date: datetime | None = None
    category_id: UUID
    account_id: UUID
    merchant: str | None = None
    created_at: datetime
    updated_at: datetime | None = None
    category: CategoryResponse | None = None

    class Config:
        from_attributes = True
        arbitrary_types_allowed = True

class TransactionListResponse(BaseModel):
    transactions: list[TransactionResponse]
    total: int

    class Config:
        from_attributes = True
        arbitrary_types_allowed = True

class CategorySummary(BaseModel):
    category_id: UUID
    category_name: str
    amount: float
    color: str | None = None

class PaymentTypeSummary(BaseModel):
    payment_type: str
    count: int
    total: float

class SubscriptionSummary(BaseModel):
    frequency: str
    count: int
    total: float
    monthly_equivalent: float

class TransactionSummary(BaseModel):
    total_income: float
    total_expenses: float
    balance: float
    expense_by_category: List[CategorySummary]
    income_by_category: List[CategorySummary]
    recent_transactions: List[TransactionResponse]
    payment_type_breakdown: List[PaymentTypeSummary]
    subscription_breakdown: List[SubscriptionSummary]
    subscription_total: float
    subscription_count: int
    subscription_monthly_estimate: float
    
    
    

    
    
    


    