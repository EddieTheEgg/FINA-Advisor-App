from uuid import UUID
from pydantic import BaseModel, EmailStr
from backend.src.entities.enums import AccountType

#Fields that are required upon registering a new user
class RegisterUserRequest(BaseModel):
    email: EmailStr
    username: str | None
    first_name: str
    last_name: str
    password: str
    
class AccountCreateRequest(BaseModel):
    account_name: str
    account_type: AccountType
    balance: float
    credit_limit: float | None
    bank_name: str | None
    account_number: str | None
    routing_number: str | None

# Combined signup request with user and account information
class SignupRequest(BaseModel):
    user_information: RegisterUserRequest
    account_information: AccountCreateRequest

class AccountCreateRequest(BaseModel):
    account_name: str
    account_type: AccountType
    balance: float
    credit_limit: float | None
    bank_name: str | None
    account_number: str | None
    routing_number: str | None
    
class NewRegisteredUserResponse(BaseModel):
    user_id: UUID
    email: str
    username: str | None = None
    first_name: str
    last_name: str
    access_token: str
    refresh_token: str
    token_type: str

class EmailAvailabilityRequest(BaseModel):
    email: EmailStr

class EmailAvailabilityResponse(BaseModel):
    available: bool
    message: str
    
#The token itself that we return and use between server and client
class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    
#When verifies a token, we return the token along with this data
class TokenData(BaseModel):
    user_id: str | None = None
    
    def get_uuid(self) -> UUID | None:
        if self.user_id:
            return UUID(self.user_id)
        return None

class RefreshTokenRequest(BaseModel):
    refresh_token: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class PasswordValidationRequest(BaseModel):
    password: str

class PasswordValidationResponse(BaseModel):
    is_valid: bool    

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ForgotPasswordResponse(BaseModel):
    message: str
    success: bool

class ResetPasswordRequest(BaseModel):
    verification_code: str  # 6-digit code from email   
    new_password: str
    