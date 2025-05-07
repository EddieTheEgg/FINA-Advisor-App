from uuid import UUID
from pydantic import BaseModel, EmailStr

#Fields that are required upon registering a new user
class RegisterUserRequest(BaseModel):
    email: EmailStr
    username: str
    first_name: str
    last_name: str
    password: str
    
#The token itself that we return and use between server and client
class Token(BaseModel):
    access_token: str
    token_type: str
    
#When verifies a token, we return the token along with this data
class TokenData(BaseModel):
    user_id: str | None = None
    
    def get_uuid(self) -> UUID | None:
        if self.user_id:
            return UUID(self.user_id)
        return None
    


    
    
    
    
    
    
    