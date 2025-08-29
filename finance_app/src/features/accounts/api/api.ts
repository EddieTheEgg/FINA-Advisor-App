import axios from 'axios';
import api from '../../../api/axios';
import { GroupedAccountsResponse, AccountResponse, BackendAccountResponse, AccountTransactionsResponse, BackendTransactionAccountResponse, TransferSubmission, BasicAccountCreateRequest, AccountUpdateRequest } from '../types';

type getUserAccountTransactionHistoryParams = {
    accountId : string,
    pageParam: number,
    limit: number,
}

export const getUserGroupedAccounts = async(): Promise<GroupedAccountsResponse> => {
    try {
        const response = await api.get('/accounts/user-accounts-grouped');
        const data = response.data;

        const groupedAccountsData: Record<string, AccountResponse[]> = {};
        for (const group in data.account_groups) {
            groupedAccountsData[group] = data.account_groups[group].map((account: BackendAccountResponse) => ({
                accountId: account.account_id,
                name: account.name,
                accountType: account.account_type,
                balance: account.balance,
                color: account.color,
                icon: account.icon,
                isDefault: account.is_default,
                includeInTotals: account.include_in_totals,
                isActive: account.is_active,
                creditLimit: account.credit_limit,
                bankName: account.bank_name,
                accountNumber: account.account_number,
                routingNumber: account.routing_number,
                createdAt: account.created_at,
                updatedAt: account.updated_at,
            }));
        }
        return {
            totalNet : data.total_net,
            percentChange: data.percent_change,
            accountGroupsData: groupedAccountsData };
    } catch (error : unknown) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            throw new Error('No accounts found for this user');
        }
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            throw new Error('Please log in to view your accounts');
        }
        if (axios.isAxiosError(error) && error.response?.status === 500) {
            throw new Error('Unable to load accounts at this time');
        }
        throw new Error('Failed to fetch grouped accounts');
    }
};


export const getUserAccountTransactionHistory = async ({accountId, pageParam, limit} : getUserAccountTransactionHistoryParams) : Promise<AccountTransactionsResponse> => {
    try {
        const response = await api.get('/accounts/account-transaction-history', {
            params: {account_id: accountId, offset: pageParam, limit},
        });

        // Convert backend response of transaction attributes to frontend format
        const convertedData: AccountTransactionsResponse = {
            transactions: response.data.transactions.map((transaction: BackendTransactionAccountResponse) => ({
                transactionId: transaction.transaction_id,
                amount: transaction.amount,
                title: transaction.title,
                transactionDate: transaction.transaction_date,
                transactionType: transaction.transaction_type,
                notes: transaction.notes,
                location: transaction.location,
                isSubscription: transaction.is_subscription,
                subscriptionFrequency: transaction.subscription_frequency,
                subscriptionStartDate: transaction.subscription_start_date,
                subscriptionEndDate: transaction.subscription_end_date,
                accountName: transaction.account_name,
                toAccountName: transaction.to_account_name,
                merchant: transaction.merchant,
                createdAt: transaction.created_at,
                updatedAt: transaction.updated_at,
                categorySimplified: {
                    categoryId: transaction.category_simplified.category_id,
                    categoryName: transaction.category_simplified.category_name,
                    icon: transaction.category_simplified.icon,
                    color: transaction.category_simplified.color,
                    isCustom: transaction.category_simplified.is_custom,
                },
            })),
            current_page: response.data.current_page,
            next_page: response.data.next_page,
        };

        return convertedData;
    } catch (error : unknown) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            throw new Error('No accounts found for this user');
        }
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            throw new Error('Please log in to view your account');
        }
        if (axios.isAxiosError(error) && error.response?.status === 500) {
            throw new Error('Unable to load account details at this time');
        }
        throw new Error('Failed to fetch account details');
    }
};


export const submitTransfer = async (transferSubmissionData: TransferSubmission) => {
    try {
        const response = await api.post('/transactions/transfer', transferSubmissionData);
        return response.data;
    } catch (error : unknown) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            throw new Error('Please log in again to submit a transfer');
        }
        if (axios.isAxiosError(error) && error.response?.status === 400) {
            throw new Error('Failed to submit transfer: ' + error.response?.data.detail);
        }
        if (axios.isAxiosError(error) && error.response?.status === 500) {
            throw new Error('Failed to submit transfer, please try again (Internal server error)');
        }
        throw new Error('Failed to submit transfer, please try again (Unknown error)');
    }
};


export const createAccount = async (accountCreationData: BasicAccountCreateRequest) => {
    try {
        const response = await api.post('/accounts/create-account-basic', accountCreationData);
        return response.data;
    } catch (error : unknown) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            throw new Error('Please log in again to create an account');
        }
        if (axios.isAxiosError(error) && error.response?.status === 400) {
            throw new Error('Failed to create account: ' + error.response?.data.detail);
        }
        if (axios.isAxiosError(error) && error.response?.status === 500) {
            throw new Error('Failed to create account, please try again (Internal server error)');
        }
        throw new Error('Failed to create account, please try again (Unknown error)');
    }
};

export const deleteAccount = async (accountId: string) => {
    try{
        await api.delete('/accounts/delete-account', {
            params: {
                account_id: accountId,
            },
        });
    } catch (error : unknown) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            throw new Error('Please log in again to delete an account');
        }
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            throw new Error('Account not found');
        }
        if (axios.isAxiosError(error) && error.response?.status === 500) {
            throw new Error('Failed to delete account, please try again (Internal server error)');
        }
        throw new Error('Failed to delete account, please try again (Unknown error)');
    }
};

export const updateAccount = async (accountUpdateDetails: AccountUpdateRequest) => {
    try {
        await api.put('/accounts/update-account', accountUpdateDetails);
    } catch (error : unknown) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            throw new Error('Please log in again to update an account');
        }
        if (axios.isAxiosError(error) && error.response?.status === 400) {
            throw new Error('Failed to update account: ' + error.response?.data.detail);
        }
        if (axios.isAxiosError(error) && error.response?.status === 500) {
            throw new Error('Failed to update account, please try again (Internal server error)');
        }
        throw new Error('Failed to update account, please try again (Unknown error)');
    }
};

