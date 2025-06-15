from enum import Enum

class TransactionType(Enum):
    INCOME = "INCOME"
    EXPENSE = "EXPENSE"
    TRANSFER = "TRANSFER"

class PaymentType(Enum):
    CASH = "CASH"
    CREDIT_CARD = "CREDIT_CARD"
    DEBIT_CARD = "DEBIT_CARD"
    BANK_TRANSFER = "BANK_TRANSFER"
    MOBILE_PAYMENT = "MOBILE_PAYMENT"
    PAYPAL = "PAYPAL"
    VENMO = "VENMO"
    APPLE_PAY = "APPLE_PAY"
    GOOGLE_PAY = "GOOGLE_PAY"
    ZELLE = "ZELLE"
    OTHER_ONLINE = "OTHER_ONLINE"
    OTHER = "OTHER"

class SubscriptionFrequency(Enum):
    DAILY = "DAILY"
    WEEKLY = "WEEKLY"
    MONTHLY = "MONTHLY"
    QUARTERLY = "QUARTERLY"
    YEARLY = "YEARLY"

class AccountType(Enum):
    CHECKING = "checking"
    SAVINGS = "savings"
    CREDIT_CARD = "credit_card"
    INVESTMENT = "investment"
    LOAN = "loan"
    CASH = "cash"
    OTHER = "other" 