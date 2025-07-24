from datetime import datetime, date
from typing import List
from uuid import UUID
from pydantic import BaseModel, Field, validator
from enum import Enum

from backend.src.categories.model import CategoryResponse, CategorySimplifiedResponse   
from backend.src.entities.enums import TransactionType, PaymentType, SubscriptionFrequency, TransactionSortBy, SortOrder

class TransactionCreate(BaseModel):
    transaction_type: TransactionType
    account_id: str
    category_id: str
    amount: float = Field(..., ge=0)
    title: str
    transaction_date: date
    
    notes: str | None = None
    location: str | None = None
    merchant: str | None = None
    
    is_subscription: bool = False
    subscription_frequency: SubscriptionFrequency | None = None
    subscription_start_date: date | None = None
    subscription_end_date: date | None = None
   
    to_account_id: str | None = None
    
class TransactionListRequest(BaseModel):
    transaction_type: TransactionType
    transaction_timeframe: date # YYYY-MM-01 always 1st of the provided month and year
    
    account_ids: list[str] | None = None
    category_ids: list[str] | None = None
    
    sort_by: TransactionSortBy | None = None
    sort_order: SortOrder | None = None

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
    account_id: UUID
    amount: float
    title: str
    transaction_date: date
    transaction_type: TransactionType
    notes: str | None
    location: str | None
    is_subscription: bool
    subscription_frequency: SubscriptionFrequency | None
    subscription_start_date: datetime | None
    subscription_end_date: datetime | None
    account_name: str
    account_icon: str
    account_color: str   
    to_account_name: str | None
    to_account_icon: str | None
    to_account_color: str | None
    merchant: str | None
    created_at: datetime
    updated_at: datetime | None
    category: CategorySimplifiedResponse
    
    class Config:
        from_attributes = True
        arbitrary_types_allowed = True





class TransactionSummary(BaseModel):
    transaction_id: UUID
    amount: float
    title: str
    transaction_date: date
    transaction_type: TransactionType
    category: CategorySimplifiedResponse
    account_name: str
    to_account_name: str | None = None

class PaginationResponse(BaseModel):
    has_next: bool
    current_page: int
    page_size: int

class SummaryResponse(BaseModel):
    month_income: float
    month_expense: float
    month_transfer: float
    
class TransactionListResponse(BaseModel):
    transactions: list[TransactionSummary]
    pagination: PaginationResponse
    summary: SummaryResponse
    possible_categories: list[CategoryResponse]

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
    

    
    

    
    
    


    