import logging
from typing import List, Dict
from uuid import UUID
from sqlalchemy.orm import Session
from backend.src.accounts.model import AccountBalance, AccountCreateRequest, AccountResponse, GroupedAccountsResponse
from backend.src.entities.account import Account
from backend.src.exceptions import AccountCreationError, AccountNotFoundError, GroupedAccountNotFoundError, NetWorthCalculationError
from backend.src.accounts.constants import ACCOUNT_GROUPS

#Creates a new account for the user
def create_account(db: Session, account_create_request: AccountCreateRequest, user_id: UUID) -> AccountResponse:
    try:
        account = Account(
            name=account_create_request.name,
            account_type=account_create_request.account_type,
            balance=account_create_request.balance,
            color=account_create_request.color,
            icon=account_create_request.icon,
            is_default=account_create_request.is_default,
            include_in_totals=account_create_request.include_in_totals,
            is_active=account_create_request.is_active,
            bank_name=account_create_request.bank_name,
            account_number=account_create_request.account_number,
            routing_number=account_create_request.routing_number,
            user_id=user_id
        )
        db.add(account)
        db.commit()
        db.refresh(account)
        
        #If the new created account becomes the default account, make past default account not default
        if account.is_default:
            db.query(Account).filter(Account.user_id == user_id, Account.is_default == True).update({"is_default": False})
        
        return AccountResponse(
            account_id=account.account_id,
            name=account.name,
            account_type=account.account_type,
            balance=account.balance,
            color=account.color,
            icon=account.icon,
            is_default=account.is_default,
            include_in_totals=account.include_in_totals,
            is_active=account.is_active,
            bank_name=account.bank_name,
            account_number=account.account_number,
            routing_number=account.routing_number
        )
    except Exception as e:
        logging.warning(f"Failed to create account for user {user_id}. Error: {str(e)}")
        raise AccountCreationError(user_id)
    


def get_user_accounts(db: Session, user_id: UUID) -> List[AccountResponse]:
    try:
        accounts = db.query(Account).filter(Account.user_id == user_id).all()
        return [AccountResponse(
            account_id=account.account_id,
            name=account.name,
            account_type=account.account_type,  
            balance=account.balance,
            color=account.color,
            icon=account.icon,
            is_default=account.is_default,
            include_in_totals=account.include_in_totals,
            is_active=account.is_active,
            bank_name=account.bank_name,
            account_number=account.account_number,
            routing_number=account.routing_number
        ) for account in accounts]
    except Exception as e:
        logging.warning(f"Failed to get user accounts for user {user_id}. Error: {str(e)}")
        raise AccountNotFoundError(user_id)



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

def get_account_by_id(db: Session, account_id: UUID, user_id: UUID) -> AccountResponse:
    try:
        account = db.query(Account).filter(Account.account_id == account_id, Account.user_id == user_id).first()
        if not account:
            logging.warning(f"Account with id {account_id} not found for user {user_id}")
            raise AccountNotFoundError(account_id)
        return AccountResponse(
            account_id=account.account_id,
            name=account.name,
            account_type=account.account_type,  
            balance=account.balance,
            color=account.color,
            icon=account.icon,
            is_default=account.is_default,
            include_in_totals=account.include_in_totals,
            is_active=account.is_active,
            bank_name=account.bank_name,
            account_number=account.account_number,
            routing_number=account.routing_number
        )
    except Exception as e:
        logging.warning(f"Failed to get account by id for user {user_id}. Error: {str(e)}")
        raise AccountNotFoundError(account_id)

#Gets all accounts for the user grouped by their type of account
def get_user_accounts_grouped(db: Session, user_id: UUID) -> GroupedAccountsResponse:
    try:
        user_accounts = get_user_accounts(db, user_id)
        grouped_accounts = {
            "Cash & Banking": [],
            "Credit Cards": [],
            "Loans": [],
            "Investments": [],
            "Other": []
        }
        total_net_worth = 0
        
        for account in user_accounts:
            total_net_worth = total_net_worth + account.balance
            if account.account_type in ACCOUNT_GROUPS["Cash & Banking"]:
                grouped_accounts["Cash & Banking"].append(account)
            elif account.account_type in ACCOUNT_GROUPS["Credit Cards"]:
                grouped_accounts["Credit Cards"].append(account)
            elif account.account_type in ACCOUNT_GROUPS["Loans"]:
                grouped_accounts["Loans"].append(account)
            elif account.account_type in ACCOUNT_GROUPS["Investments"]:
                grouped_accounts["Investments"].append(account)
            elif account.account_type in ACCOUNT_GROUPS["Other"]:
                grouped_accounts["Other"].append(account)
        
        return GroupedAccountsResponse(total_net = total_net_worth,
            account_groups=grouped_accounts)
    except Exception as e:
        logging.warning(f"Failed to get grouped user accounts for user {user_id}. Error: {str(e)}")
        raise GroupedAccountNotFoundError(user_id)


def calculate_user_net_worth(db: Session, user_id: UUID) -> float:
    try:
        accounts = db.query(Account).filter(Account.user_id == user_id, Account.is_active == True).all()
        return sum(account.balance for account in accounts)
    except Exception as e:
        logging.warning(f"Failed to calculate user net worth for user {user_id}. Error: {str(e)}")
        raise NetWorthCalculationError(user_id)