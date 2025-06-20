from typing import Dict, List
from backend.src.entities.enums import AccountType

# Account type groupings for organizing accounts in the UI
# Each group contains a list of AccountType enums that belong to that category
ACCOUNT_GROUPS: Dict[str, List[AccountType]] = {
    "Cash & Banking": [
        AccountType.CHECKING,
        AccountType.SAVINGS,
        AccountType.CASH,
    ],
    "Credit Cards": [
        AccountType.CREDIT_CARD,
    ],
    "Loans": [
        AccountType.LOAN,
    ],
    "Investments": [
        AccountType.INVESTMENT,
    ],
    "Other": [
        AccountType.OTHER,
    ],
}