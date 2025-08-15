from datetime import datetime, date as Date
from typing import List
from uuid import UUID
from pydantic import BaseModel, Field, validator
from enum import Enum

from backend.src.categories.model import CategoryResponse, CategorySimplifiedResponse   
from backend.src.entities.enums import AccountType, SubscriptionStatus, TransactionType, PaymentType, SubscriptionFrequency, TransactionSortBy, SortOrder

class TransactionCreate(BaseModel):
    transaction_type: TransactionType
    account_id: str
    category_id: str
    amount: float = Field(..., ge=0)
    title: str
    transaction_date: Date
    
    notes: str | None = None
    location: str | None = None
    merchant: str | None = None
    
    is_subscription: bool = False   
    subscription_frequency: SubscriptionFrequency | None = None
    subscription_start_date: Date | None = None
    subscription_end_date: Date | None = None
   
    to_account_id: str | None = None

    @validator('subscription_start_date')
    def validate_subscription_start_date(cls, v, values):
        if values.get('is_subscription') and not v:
            raise ValueError('Start date is required for subscriptions')
        return v

    @validator('subscription_end_date')
    def validate_subscription_end_date(cls, v, values):
        start_date = values.get('subscription_start_date')
        if v and start_date and v <= start_date:
            raise ValueError('End date must be after start date')
        return v
    
class TransactionListRequest(BaseModel):
    transaction_type: TransactionType
    transaction_timeframe: Date # YYYY-MM-01 always 1st of the provided month and year
    
    account_ids: list[str] | None = None
    category_ids: list[str] | None = None
    
    sort_by: TransactionSortBy | None = None
    sort_order: SortOrder | None = None








class TransactionUpdateRequestAccount(BaseModel):
    account_id: str
    name: str
    account_type: AccountType
    balance: float
    color: str
    icon: str | None
    credit_limit: float | None

class TransactionUpdate(BaseModel):
    transaction_id: UUID
    transaction_type: TransactionType
    source_account: TransactionUpdateRequestAccount
    amount: float
    title: str
    date: str #YYYY-MM-DD
    category_id: str
    notes: str | None
    location: str | None
    merchant: str | None
    is_subscription: bool
    subscription_frequency: SubscriptionFrequency | None
    subscription_start_date: str | None #YYYY-MM-DD
    subscription_end_date: str | None #YYYY-MM-DD
    to_account: TransactionUpdateRequestAccount | None

    @validator('subscription_start_date')
    def validate_subscription_start_date(cls, v, values):
        is_subscription = values.get('is_subscription')
        if is_subscription is True and not v:
            raise ValueError('Start date is required for subscriptions')
        return v

    @validator('subscription_end_date')
    def validate_subscription_end_date(cls, v, values):
        start_date = values.get('subscription_start_date')
        if v and start_date and v <= start_date:
            raise ValueError('End date must be after start date')
        return v











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
    subscription_start_date: Date | None
    subscription_end_date: Date | None
    account_name: str
    to_account_name: str | None
    merchant: str | None
    created_at: datetime
    updated_at: datetime | None
    category_simplified: CategorySimplifiedResponse

    class Config:
        from_attributes = True
        arbitrary_types_allowed = True
        
        
        
        
        
        
        
class TransactionAccountResponse(BaseModel):
    account_id: UUID
    name: str
    account_type: AccountType
    balance: float
    color: str
    icon: str | None = None
    credit_limit: float | None = None
    class Config:
        from_attributes = True
        arbitrary_types_allowed = True
        
        
class TransactionResponse(BaseModel):
    transaction_id: UUID
    account_id: UUID
    amount: float
    title: str
    transaction_date: Date
    transaction_type: TransactionType
    notes: str | None
    location: str | None
    is_subscription: bool
    subscription_frequency: SubscriptionFrequency | None
    subscription_start_date: Date | None
    subscription_end_date: Date | None
    subscription_next_payment_date: Date | None
    source_account: TransactionAccountResponse
    to_account: TransactionAccountResponse | None
    merchant: str | None
    created_at: datetime
    updated_at: datetime | None
    category: CategorySimplifiedResponse
    budget_id_affected: str | None
    
    class Config:
        from_attributes = True
        arbitrary_types_allowed = True






class TransactionSummary(BaseModel):
    transaction_id: UUID
    amount: float
    title: str
    transaction_date: Date
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
    

    
    

    
    
    


    