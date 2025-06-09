import logging
from typing import List
from uuid import UUID
from sqlalchemy.orm import Session
from backend.src.accounts.model import AccountBalance
from backend.src.entities.account import Account
from backend.src.exceptions import AccountNotFoundError

def get_all_account_information(db: Session, user_id: UUID) -> List[AccountBalance]:
    try: 
        accounts = db.query(Account).filter(Account.user_id == user_id).all()
        account_infos = []
        for account in accounts:
            account_infos.append(AccountBalance(
                name=account.name, 
                account_type=account.account_type, 
                balance=account.balance, 
                color=account.color))
        return account_infos
    except Exception as e:
        logging.warning(f"Failed to get all account information for user {user_id}. Error: {str(e)}")
        raise AccountNotFoundError(user_id)
    
def update_account_balance(db: Session, account_id: UUID, user_id: UUID, amount: float) -> AccountBalance:
    try:
        account = db.query(Account).filter(Account.account_id == account_id, Account.user_id == user_id).first()
        if not account:
            raise AccountNotFoundError(account_id)
        account.balance += amount
        db.commit()
        db.refresh(account)
        return AccountBalance(name=account.name, account_type=account.account_type, balance=account.balance, color=account.color)
    except Exception as e:
        logging.warning(f"Failed to update account balance for user {user_id}. Error: {str(e)}")
        raise AccountNotFoundError(account_id)

#Gets only the name of the account associated with the given account id
#Helper function for get_recent_transactions
def get_account_name_by_id(db: Session, account_id: UUID, user_id: UUID) -> str:
    try:
        account = db.query(Account).filter(Account.account_id == account_id, Account.user_id == user_id).first()
        if not account:
            raise AccountNotFoundError(account_id)
        return account.name
    except Exception as e:
        logging.warning(f"Failed to get account name for user {user_id}. Error: {str(e)}")
        raise AccountNotFoundError(account_id)

