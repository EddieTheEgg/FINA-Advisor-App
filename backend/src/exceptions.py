#Here we create custom exceptions, especially useful in service layer for our schemasd
from starlette import status
from fastapi import HTTPException


def AuthenticationError():
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                        detail="Could not validate user.")