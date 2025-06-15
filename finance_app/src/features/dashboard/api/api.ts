import { DashboardData, BackendDashboardAccountInfo, BackendDashboardRecentTransaction } from '../types';
import { api } from '../../../api/axios';
import { AxiosError } from 'axios';

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
            recentTransactions: dashboardData.recentTransactions.map((transaction: BackendDashboardRecentTransaction) => ({
                transactionId: transaction.transaction_id,
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
        if (error instanceof AxiosError) {
            if (error.response?.status === 404) {
                throw new Error('Dashboard data not found');
            }
            if (error.response?.status === 401) {
                throw new Error('Unauthorized access to dashboard');
            }
            if (error.response?.status === 500) {
                throw new Error('Server error while fetching dashboard data');
            }
        }
        // Handle network errors or other unexpected errors
        throw new Error('Failed to fetch dashboard data');
    }
};


