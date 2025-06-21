from typing import Dict, List
from uuid import UUID
from pydantic import BaseModel

from backend.src.entities.enums import AccountType

class AccountCreateRequest(BaseModel):
    name: str
    account_type: AccountType 
    balance: float
    color: str
    icon: str | None = None
    is_default: bool
    include_in_totals: bool
    is_active: bool
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
    bank_name: str | None = None
    account_number: str | None = None
    routing_number: str | None = None

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
    account_groups: Dict[str, List[AccountResponse]]
    class Config:
        from_attributes = True
        arbitrary_types_allowed = True