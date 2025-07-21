import { DashboardData, BackendDashboardAccountInfo, BackendDashboardRecentTransaction, BackendTransactionListRequest, TransactionListResponse, BackendTransactionSummary } from '../types';
import api from '../../../api/axios';
import axios from 'axios';

// Fetches the user summary dashboard data specifically for dashboard home screen
export const getDashboard = async ({month, year} : {month : number, year : number}) : Promise<DashboardData> => {
    try {
        const response = await api.get('/dashboard/userDashboard', {params: {month, year}});
        const dashboardData = response.data;
        return {
            user: {
                email: dashboardData.user.email,
                firstName: dashboardData.user.first_name,
                lastName: dashboardData.user.last_name,
            },
            period: {
                month: dashboardData.period.month,
                year: dashboardData.period.year,
            },
            financialSummary: {
                totalBalance: dashboardData.financialSummary.total_balance,
                monthlyIncome: dashboardData.financialSummary.monthly_income,
                monthlyExpense: dashboardData.financialSummary.monthly_expense,
                monthlyTransfer: dashboardData.financialSummary.monthly_transfer,
                monthlyNet: dashboardData.financialSummary.monthlyNet,
                isPositive: dashboardData.financialSummary.isPositive,
            },
            accounts: {
                count: dashboardData.accounts.count,
                accountInfos: dashboardData.accounts.accounts.map((account: BackendDashboardAccountInfo) => ({
                    name: account.name,
                    accountType: account.account_type,
                    balance: account.balance,
                    color: account.color,
                })),
            },
            recentTransactions: dashboardData.recentTransactions.map((transaction: BackendDashboardRecentTransaction) => ({                transactionId: transaction.transaction_id,
                amount: transaction.amount,
                title: transaction.title,
                transactionDate: transaction.transaction_date,
                transactionType: transaction.transaction_type,
                category: transaction.category,
                merchant: transaction.merchant,
                accountName: transaction.account_name,
                toAccountName: transaction.to_account_name,
                notes: transaction.notes,
                isSubscription: transaction.is_subscription,
            })),
        };
    } catch (error : unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                throw new Error('Dashboard data not found');
            }
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                throw new Error('Unauthorized access to dashboard');
            }
            if (axios.isAxiosError(error) && error.response?.status === 500) {
                throw new Error('Server error while fetching dashboard data');
            }
        throw new Error('Failed to fetch dashboard data');
    }
};

// Fetches the transaction list for the dashboard home screen
export const getTransactionList = async (skip: number, limit: number, requestData: BackendTransactionListRequest) : Promise<TransactionListResponse> => {
    try {
        const requestBody = {
            ...requestData,
            transaction_timeframe: requestData.transaction_timeframe.toISOString().split('T')[0],
        };

        const response = await api.post('/transactions/transaction-list', requestBody, {
            params: {
                offset: skip,
                limit: limit,
            },
        });
        const data = response.data;

        return {
            transactions: data.transactions.map((transaction: BackendTransactionSummary) => ({
                transactionId: transaction.transaction_id,
                amount: transaction.amount,
                title: transaction.title,
                transactionDate: transaction.transaction_date,
                transactionType: transaction.transaction_type,
                category: transaction.category,
                accountName: transaction.account_name,
            })),
            pagination: {
                hasNext: data.pagination.has_next,
                currentPage: data.pagination.current_page,
                pageSize: data.pagination.page_size,
            },
            summary: {
                monthIncome: data.summary.month_income,
                monthExpense: data.summary.month_expense,
                monthTransfer: data.summary.month_transfer,
            },
        };
    } catch (error : unknown) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            throw new Error('Transaction list not found');
        }
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            throw new Error('Unauthorized access to transaction list');
        }
        if (axios.isAxiosError(error) && error.response?.status === 500) {
            throw new Error('Server error while fetching transaction list');
        }
        throw new Error('Failed to fetch transaction list');
    }
};
