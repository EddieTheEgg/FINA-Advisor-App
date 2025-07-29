#Here we create custom exceptions, especially useful in service layer for our schemasd
from uuid import UUID
from starlette import status
from fastapi import HTTPException

class UserError(HTTPException):
    """Base exception for user-related errors"""
    pass

class UserNotFoundError(UserError):
    def __init__(self, user_id=None):
        if user_id is None:
            message = "User not found"
        else:
            message = f"User with id {user_id} was not found"
        super().__init__(status_code=404, detail=message)

class InvalidPasswordError(UserError):
    def __init__(self):
        super().__init__(status_code = 401, detail = "Current password is incorrect")

class DuplicateEmailError(UserError):
    def __init__(self, email: str):
        super().__init__(status_code=400, detail=f"Email {email} is already registered")

class DuplicateUsernameError(UserError):
    def __init__(self, username: str):
        super().__init__(status_code=400, detail=f"Username {username} is already taken")

class PasswordMismatchError(UserError):
    def __init__(self):
        super().__init__(status_code = 400, detail = "New passwords do not match")





class AuthenticationError(HTTPException):
    def __init__(self):
        super().__init__(status_code=401, detail = "Could not validate user")






class CategoryError(HTTPException):
    """Base exception for category-related errors"""
    pass

class InvalidTransactionTypeError(CategoryError):
    def __init__(self, transaction_type: str):
        super().__init__(status_code=400, detail=f"Invalid transaction type: {transaction_type}")

class CategoryNotFoundError(CategoryError):
    def __init__(self, category_id: UUID):
        super().__init__(status_code=404, detail=f"Category with id {category_id} not found")

class InvalidUserForCategoryError(CategoryError):
    def __init__(self, category_id: UUID):
        super().__init__(status_code=403, detail=f"Category {category_id} does not belong to this user")

class InvalidCategoryForDeletionError(CategoryError):
    def __init__(self, category_id: UUID):
        super().__init__(status_code=401, detail=f"Could not delete the category id {category_id} because it is a system default category")

class TransactionError(HTTPException):
    """Base exception for transaction-related errors"""
    pass

class TransactionNotFoundError(TransactionError):
    def __init__(self, transaction_id: UUID):
        super().__init__(status_code=404, detail=f"Transaction with id {transaction_id} not found")

class InvalidUserForTransactionError(TransactionError):
    def __init__(self, transaction_id: UUID):
        super().__init__(status_code=403, detail=f"Transaction {transaction_id} does not belong to this user")   

class TransactionNotFoundError(TransactionError):
    def __init__(self, transaction_id: UUID):
        super().__init__(status_code=404, detail=f"Transaction with id {transaction_id} not found")

class TransferTransactionError(TransactionError):
    def __init__(self, message: str = "Error creating transfer transaction"):
        super().__init__(status_code=400, detail=message)

class CreateTransactionError(TransactionError):
    def __init__(self, message: str = "Error creating transaction"):
        super().__init__(status_code=400, detail=message)
        
class UpdateTransactionError(TransactionError):
    def __init__(self, message: str = "Error updating a transaction"):
        super().__init__(status_code=400, detail=message)




class AICategorizationError(HTTPException):
    """Base exception for AI categorization errors"""
    pass

class TransactionNotSuitableForCategorizationError(AICategorizationError):
    def __init__(self, transaction_id: UUID = None):
        detail = f"Transaction {transaction_id} is not suitable for categorization" if transaction_id else "Transaction is not suitable for categorization"
        super().__init__(status_code=400, detail=detail)

class CategoryApplicationError(AICategorizationError):
    def __init__(self, message: str = "Error applying category to transaction"):
        super().__init__(status_code=400, detail=message)

class InvalidCategoryDataError(AICategorizationError):
    def __init__(self):
        super().__init__(
            status_code=400, 
            detail="Must provide either category_id or category_name with is_new_category=True"
        )




class TrainingDataError(AICategorizationError):
    def __init__(self, message: str = "Error logging training data"):
        super().__init__(status_code=500, detail=message)






class OpenAIError(HTTPException):
    pass

class OpenAIResponseError(OpenAIError):
    def __init__(self):
        super().__init__(status_code=422, detail="Could not process OpenAI response")

# Could have other reasons for this error, but default common is error connecting to OpenAI service
class OpenAICallError(OpenAIError):
    def __init__(self, message: str = "Error connecting to OpenAI service"):
        super().__init__(status_code=503, detail=message)

class DatabaseError(HTTPException):
    def __init__(self, message: str = "Database error"):
        super().__init__(status_code=500, detail=message)


class AccountError(HTTPException):
    """Base exception for account-related errors"""
    pass

class AccountCreationError(AccountError):
    def __init__(self, user_id: UUID):
        super().__init__(status_code=400, detail=f"Failed to create account for user {user_id}")

class AccountNotFoundError(AccountError):
    def __init__(self, account_id: UUID):
        super().__init__(status_code=404, detail=f"Account with id {account_id} not found")

class NoAccountsFoundError(AccountError):
    def __init__(self, user_id: UUID):
        super().__init__(status_code=404, detail=f"No accounts found for user {user_id}")

class GroupedAccountNotFoundError(AccountError):
    def __init__(self, user_id: UUID):
        super().__init__(status_code=404, detail=f"Failed to find grouped accounts for user {user_id}")

class NetWorthCalculationError(AccountError):
    def __init__(self, user_id: UUID):
        super().__init__(status_code=500, detail=f"Failed to calculate net worth for user {user_id}")

class AccountTransactionHistoryNotFoundError(AccountError):
    def __init__(self, user_id: UUID):
        super().__init__(status_code=404, detail=f"Failed to find account transaction history for user {user_id}")

class AccountTransactionHistoryProcessingError(AccountError):
    def __init__(self, transaction_id: UUID):
        super().__init__(status_code=400, detail=f"Failed to process transaction {transaction_id}")

class DashboardError(HTTPException):
    """Base exception for dashboard-related errors"""
    pass

class DashboardNotFoundError(DashboardError):
    def __init__(self, month: int, year: int):
        super().__init__(status_code=404, detail=f"Dashboard data for month {month} and year {year} not found")

class DashboardInvalidMonthError(DashboardError):
    def __init__(self, month: int):
        super().__init__(status_code=400, detail=f"Invalid month: {month}")

class DashboardInvalidYearError(DashboardError):
    def __init__(self, year: int):
        super().__init__(status_code=400, detail=f"Invalid year: {year}")

class DashboardInvalidMonthYearError(DashboardError):
    def __init__(self, month: int, year: int):
        super().__init__(status_code=400, detail=f"Invalid month: {month} or year: {year}")
        
class TotalBalanceError(DashboardError):
    def __init__(self, user_id: UUID, month: int, year: int):
        super().__init__(status_code=500, detail=f"Failed to get total balance for user {user_id} in month {month} and year {year}")

class MonthlyIncomeError(DashboardError):
    def __init__(self, user_id: UUID, month: int, year: int):
        super().__init__(status_code=500, detail=f"Failed to get monthly income for user {user_id} in month {month} and year {year}")

class MonthlyExpenseError(DashboardError):
    def __init__(self, user_id: UUID, month: int, year: int):
        super().__init__(status_code=500, detail=f"Failed to get monthly expense for user {user_id} in month {month} and year {year}")
        
class MonthlyTransferError(DashboardError):
    def __init__(self, user_id: UUID, month: int, year: int):
        super().__init__(status_code=500, detail=f"Failed to get monthly transfer amount for user {user_id} in month {month} and year {year}")
class MonthlyNetError(DashboardError):
    def __init__(self, user_id: UUID, month: int, year: int):
        super().__init__(status_code=500, detail=f"Failed to get monthly net for user {user_id} in month {month} and year {year}")

class RecentTransactionsError(DashboardError):
    def __init__(self, user_id: UUID, month: int, year: int):
        super().__init__(status_code=500, detail=f"Failed to get recent transactions for user {user_id} in month {month} and year {year}")


class SnapshotError(HTTPException):
    """Base exception for snapshot-related errors"""
    pass

class SnapshotCreationError(SnapshotError):
    def __init__(self, user_id: UUID, message: str = "Failed to create snapshot"):
        super().__init__(status_code=500, detail=f"{message} for user {user_id}")

class SnapshotNotFoundError(SnapshotError):
    def __init__(self, user_id: UUID, snapshot_type: str = ""):
        detail = f"No {snapshot_type} snapshots found for user {user_id}" if snapshot_type else f"No snapshots found for user {user_id}"
        super().__init__(status_code=404, detail=detail)

class NetWorthCalculationError(SnapshotError):
    def __init__(self, user_id: UUID):
        super().__init__(status_code=500, detail=f"Failed to calculate net worth for user {user_id}")

class MonthlySnapshotsJobError(SnapshotError):
    def __init__(self):
        super().__init__(status_code=500, detail="Failed to run monthly snapshots job")
