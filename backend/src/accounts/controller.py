from typing import List
from fastapi import APIRouter
from backend.src.accounts.model import AccountCreateRequest, AccountResponse, GroupedAccountsResponse
from backend.src.auth.service import CurrentUser
from backend.src.database.core import DbSession
from backend.src.accounts import service as account_service

router = APIRouter(
    prefix='/accounts',
    tags=['accounts']
)

#Creates a new account for the user
@router.post("/create-account", response_model = AccountResponse)
def create_account(
    db: DbSession,
    account_create_request: AccountCreateRequest,
    current_user: CurrentUser
):
    return account_service.create_account(db, account_create_request, current_user.get_uuid())

#Gets all accounts for the user
@router.get("/user-accounts", response_model = List[AccountResponse])
def get_user_accounts(
    db: DbSession,
    current_user: CurrentUser
):
    return account_service.get_user_accounts(db, current_user.get_uuid())

#Gets all accounts for the user grouped by category
@router.get("/user-accounts-grouped", response_model = GroupedAccountsResponse)
def get_user_accounts_grouped(
    db: DbSession,
    current_user: CurrentUser
):
    return account_service.get_user_accounts_grouped(db, current_user.get_uuid())