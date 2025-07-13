from datetime import datetime
from typing import List
from uuid import UUID
from pydantic import BaseModel, Field, validator
from enum import Enum

from backend.src.categories.model import CategoryResponse, CategorySimplifiedResponse   
from backend.src.entities.enums import TransactionType, PaymentType, SubscriptionFrequency

class TransactionCreate(BaseModel):
    amount: float = Field(..., ge=0)
    title: str
    transaction_date: datetime
    transaction_type: TransactionType
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
    to_account_id: UUID | None = None

class TransactionUpdate(BaseModel):
    amount: float | None = Field(None, ge = 0)
    title: str | None = None
    transaction_date: datetime | None = None
    transaction_type: TransactionType | None = None
    notes: str | None = None
    location: str | None = None
    is_subscription: bool | None = None
    subscription_frequency: SubscriptionFrequency | None = None
    subscription_start_date: datetime | None = None
    subscription_end_date: datetime | None = None
    category_id: UUID | None = None
    payment_type: PaymentType | None = None
    merchant: str | None = None
    to_account_id: UUID | None = None

class AccountTransactionResponse(BaseModel):
    transaction_id: UUID
    amount: float
    title: str
    transaction_date: datetime
    transaction_type: TransactionType
    notes: str | None
    location: str | None
    is_subscription: bool
    subscription_frequency: SubscriptionFrequency | None
    subscription_start_date: datetime | None
    subscription_end_date: datetime | None
    account_name: str
    to_account_name: str | None
    merchant: str | None
    created_at: datetime
    updated_at: datetime | None
    category_simplified: CategorySimplifiedResponse

    class Config:
        from_attributes = True
        arbitrary_types_allowed = True
        
class TransactionResponse(BaseModel):
    transaction_id: UUID
    amount: float
    title: str
    transaction_date: datetime
    transaction_type: TransactionType
    notes: str | None
    location: str | None
    is_subscription: bool
    subscription_frequency: SubscriptionFrequency | None
    subscription_start_date: datetime | None
    subscription_end_date: datetime | None
    account_name: str
    to_account_name: str | None
    merchant: str | None
    created_at: datetime
    updated_at: datetime | None
    category: CategoryResponse
    
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
    total_transfers: float
    balance: float
    expense_by_category: List[CategorySummary]
    income_by_category: List[CategorySummary]
    recent_transactions: List[TransactionResponse]
    payment_type_breakdown: List[PaymentTypeSummary]
    subscription_breakdown: List[SubscriptionSummary]
    subscription_total: float
    subscription_count: int
    subscription_monthly_estimate: float
    
    
class TransferCreateRequest(BaseModel):
    fromAccount: str
    toAccount: str
    amount: float
    title: str
    note: str | None = None
    location: str | None = None
    
class TransferCreateResponse(BaseModel):
    fromAccount: str
    toAccount: str
    amount: float
    title: str
    note: str | None = None
    location: str | None = None
    class Config:
        from_attributes = True
        arbitrary_types_allowed = True
    

    
    

    
    
    


    