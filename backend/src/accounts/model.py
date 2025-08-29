from typing import Dict, List
from uuid import UUID
from pydantic import BaseModel

from backend.src.entities.enums import AccountType
from backend.src.transactions.model import AccountTransactionResponse

class AccountCreateRequest(BaseModel):
    name: str
    account_type: AccountType 
    balance: float
    color: str
    icon: str | None = None
    is_default: bool
    include_in_totals: bool
    is_active: bool
    credit_limit: float | None = None
    bank_name: str | None = None
    account_number: str | None = None
    routing_number: str | None = None
    
class BasicAccountCreateRequest(BaseModel):
    account_name: str
    account_type: AccountType
    balance: float
    credit_limit: float | None = None
    bank_name: str | None = None
    account_number: str | None = None
    routing_number: str | None = None
    
class AccountResponse(BaseModel):
    account_id: UUID
    name: str
    account_type: AccountType
    balance: float
    color: str
    icon: str | None = None
    is_default: bool
    include_in_totals: bool
    is_active: bool
    credit_limit: float | None = None
    bank_name: str | None = None
    account_number: str | None = None
    routing_number: str | None = None
    created_at: str
    updated_at: str | None = None

    class Config:
        from_attributes = True
        arbitrary_types_allowed = True
 
    
class AccountBalance(BaseModel):
    name: str
    account_type: str
    balance: float
    color: str
    
class GroupedAccountsResponse(BaseModel):
    total_net: float
    percent_change: float #Will get the percent change from current month to current balance
    account_groups: Dict[str, List[AccountResponse]]
    class Config:
        from_attributes = True
        arbitrary_types_allowed = True
        
        
class AccountTransactionHistoryRequest(BaseModel):
    account_id: str
    page_param: int
    limit: int

class AccountTransactionHistoryResponse(BaseModel):
    transactions: List[AccountTransactionResponse]
    current_page: int
    next_page: int | None = None
    
class AccountUpdateRequest(BaseModel):
    account_id: str
    account_name: str
    balance: float
    credit_limit: float | None = None
    bank_name: str | None = None
    account_number: str | None = None
    routing_number: str | None = None
    
    
    
