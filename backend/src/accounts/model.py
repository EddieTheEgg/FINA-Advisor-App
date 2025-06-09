from pydantic import BaseModel


class AccountBalance(BaseModel):
    name: str
    account_type: str
    balance: float
    color: str