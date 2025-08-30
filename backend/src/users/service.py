import logging
from uuid import UUID
from sqlalchemy.orm import Session
from backend.src.auth.service import verify_password, get_password_hash
from backend.src.users.model import UpdatePasswordRequest, UpdateProfileRequest, UserResponse, PasswordChange, UserSimpleResponse
from backend.src.entities.user import User
from backend.src.exceptions import DeleteAccountError, UpdatePasswordError, UpdateProfileError, UserNotFoundError, InvalidPasswordError, PasswordMismatchError

def get_user_by_id(db: Session, user_id: UUID) -> UserResponse:
    user = db.query(User).filter(user_id == User.user_id).first()
    if not user:
        logging.warning(f"User not found with given ID: {user_id}")
        raise UserNotFoundError(user_id)
    return user

#Returns the user information but without user id for security safeties
def get_quick_user_by_id(db: Session, user_id) -> UserSimpleResponse:
    user = db.query(User).filter(user_id == User.user_id).first()
    if not user:
        logging.warning(f"User not found with given ID: {user_id}")
        raise UserNotFoundError(user_id)
    return user

def change_password(db: Session, user_id: UUID, password_change: PasswordChange):
    try:
        user = get_user_by_id(db, user_id)

        #Verify current password (before change) is valid
        if not verify_password(password_change.current_password, user.hashed_password):
            logging.warning(f"Current password provided for user ID: {user_id} was invalid")
            raise InvalidPasswordError()
        
        #Verify new passwords match each other
        if password_change.new_password != password_change.new_password_confirm:
            logging.warning(f"Password mismatch during change attempt for user ID")
            raise PasswordMismatchError()

        user.hashed_password = get_password_hash(password_change.new_password)
        db.commit()
        logging.info(f"Successfully changed password for user ID: {user_id}")
    except Exception as e:
        logging.error(f"Error during password change for user ID: {user_id}. Error: {str(e)}")
        raise
    
def update_profile(db: Session, user_id: UUID, update_profile_request: UpdateProfileRequest):
    try:
        user = get_user_by_id(db, user_id)
        user.first_name = update_profile_request.first_name
        user.last_name = update_profile_request.last_name
        user.email = update_profile_request.email
        db.commit()
        logging.info(f"Successfully updated profile for user ID: {user_id}")
    except Exception as e:
        logging.error(f"Error during profile update for user ID: {user_id}. Error: {str(e)}")
        raise UpdateProfileError(str(e))
    
def update_password(db: Session, user_id: UUID, update_password_request: UpdatePasswordRequest):
    try:
        user = get_user_by_id(db, user_id)
        user.hashed_password = get_password_hash(update_password_request.new_password)
        db.commit()
        logging.info(f"Successfully updated password for user ID: {user_id}")
    except Exception as e:
        logging.error(f"Error during password update for user ID: {user_id}. Error: {str(e)}")
        raise UpdatePasswordError(str(e))
    
def delete_account(db: Session, user_id: UUID):
    try:
        user = get_user_by_id(db, user_id)
        db.delete(user)
        db.commit()
        logging.info(f"Successfully deleted account for user ID: {user_id}")
    except Exception as e:
        logging.error(f"Error during account deletion for user ID: {user_id}. Error: {str(e)}")
        raise DeleteAccountError(str(e))
        