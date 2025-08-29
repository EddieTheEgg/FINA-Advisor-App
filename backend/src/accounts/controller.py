from typing import List
from uuid import UUID
from fastapi import APIRouter, Query
from starlette import status
from backend.src.accounts.model import AccountCreateRequest, AccountResponse, AccountTransactionHistoryResponse, AccountUpdateRequest, BasicAccountCreateRequest, GroupedAccountsResponse
from backend.src.auth.service import CurrentUser
from backend.src.database.core import DbSession
from backend.src.accounts import service as account_service

router = APIRouter(
    prefix='/accounts',
    tags=['accounts']
)

#Creates a new account for the user (Full details)
@router.post("/create-account", response_model = AccountResponse)
def create_account(
    db: DbSession,
    account_create_request: AccountCreateRequest,
    current_user: CurrentUser
):
    return account_service.create_account(db, account_create_request, current_user.get_uuid())


@router.post("/create-account-basic", response_model = AccountResponse)
def create_account_basic(
    db: DbSession,
    account_create_request: BasicAccountCreateRequest,
    current_user: CurrentUser
):
    return account_service.create_account_basic(db, account_create_request, current_user.get_uuid())

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

#Gets the transaction history for a given account with paginationq
@router.get("/account-transaction-history", response_model = AccountTransactionHistoryResponse)
def get_account_transaction_history(
    db: DbSession,
    current_user: CurrentUser,
    account_id: str = Query(..., description="ID of the account to retrieve transactions for"),
    offset: int = Query(0, ge=0, description="Offset for pagination"),
    limit: int = Query(10, gt=0, le=30, description="Number of transactions to fetch")
):
    return account_service.get_account_transaction_history(db, current_user.get_uuid(), UUID(account_id), offset, limit)

#Deletes an account for the user
@router.delete("/delete-account")
def delete_account(
    db: DbSession,
    current_user: CurrentUser,
    account_id: str = Query(..., description="ID of the account to delete")
):
    return account_service.delete_account(db, current_user.get_uuid(), UUID(account_id))

@router.put("/update-account", status_code = status.HTTP_200_OK)
def update_account(
    db: DbSession,
    current_user: CurrentUser,
    account_update_request: AccountUpdateRequest
):
    return account_service.update_account(db, current_user.get_uuid(),account_update_request)
    