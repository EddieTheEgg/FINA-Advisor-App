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

class OpenAIError(HTTPException):
    pass

class OpenAIResponseError(OpenAIError):
    def __init__(self):
        super().__init__(status_code=400, detail="OpenAI response error, could not format response")

class OpenAICallError(OpenAIError):
    def __init__(self):
        super().__init__(status_code=400, detail="OpenAI call error, could not call OpenAI")