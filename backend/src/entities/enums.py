from enum import Enum

class TransactionType(Enum):
    INCOME = "INCOME"
    EXPENSE = "EXPENSE"
    TRANSFER = "TRANSFER"
    ALL = "ALL"

class TransactionSortBy(Enum):
    TRANSACTION_DATE = "TRANSACTION_DATE"
    AMOUNT = "AMOUNT"
    TITLE = "TITLE"
    CREATED_AT = "CREATED_AT"
    
class SortOrder(Enum):
    ASC = "ASC"
    DESC = "DESC"
    
class SubscriptionStatus(Enum):
    ACTIVE = "ACTIVE"
    PAUSED = "PAUSED"
    INACTIVE = "INACTIVE"
    
class SnapshotType(Enum):
    ACCOUNT = "ACCOUNT"
    NET_WORTH = "NET_WORTH"
    BUDGET_PROGRESS = 'BUDGET_PROGRESS'
    CATEGORY_SPENDING = 'CATEGORY_SPENDING'

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
    
class AuditAction(Enum):
    UPDATE = 'UPDATE'
    DELETE = 'DELETE'
    
class KeyInsightsStatus(Enum):
    POSITIVE = "POSITIVE"
    NEGATIVE = "NEGATIVE"
    WARNING = "WARNING"
    NEUTRAL = "NEUTRAL"
    
class TipDifficulty(Enum):
    EASY = "EASY"
    MEDIUM = "MEDIUM"
    HARD = "HARD"
    UNKNOWN = "UNKNOWN"
    
    
class BudgetType(Enum):
    CATEGORY = "CATEGORY"
    TOTAL = "TOTAL"

#Status to show how on track the user is to spending the budget for the remainder of the month    
class BudgetSpendingStatus(Enum):
    NO_DATA = "NO_DATA" #No data/spending on the budget
    EXCELLENT = "EXCELLENT" #Spending <70% of budget
    ON_TRACK = "ON_TRACK" #Spending 70-100% of budget
    WARNING = "WARNING" #Spending 100-110% of the budget
    OVER_BUDGET = "OVER_BUDGET" #Spending > 110% of the budget
    
    
    