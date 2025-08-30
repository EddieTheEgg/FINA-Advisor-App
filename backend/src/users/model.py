from pydantic import BaseModel, EmailStr, Field
from uuid import UUID

#Information that can be returned upon valid login/register using token
class UserResponse(BaseModel):
    user_id: UUID
    email: EmailStr
    username: str
    first_name: str
    last_name: str
    
    class Config:
        from_attributes = True
        arbitrary_types_allowed = True 
        
class UserSimpleResponse(BaseModel):
    email: EmailStr
    username: str | None = None
    first_name: str
    last_name: str
    
    class Config:
        from_attributes = True
        arbitrary_types_allowed = True
    
        
#When user wants to change password, we need current and the new password to be accurately confirmed to change
class PasswordChange(BaseModel):
    current_password: str
    new_password: str
    new_password_confirm: str
    
class UpdateProfileRequest(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    
class UpdatePasswordRequest(BaseModel):
    current_password: str
    new_password: str
    new_password_confirm: str
    
    
    
    
    