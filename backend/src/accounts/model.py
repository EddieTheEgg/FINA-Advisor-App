from pydantic import BaseModel


class AccountBalance(BaseModel):
    name: str
    type: str
    balance: float
    color: str