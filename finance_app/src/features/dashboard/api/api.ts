import { DashboardData, BackendDashboardAccountInfo, BackendDashboardRecentTransaction } from '../types';
import { api } from '../../../api/axios';


// Fetches the user summary dashboard data specifically for dashboard home screen
export const getDashboard = async ({month, year} : {month : number, year : number}) : Promise<DashboardData> => {
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
            isIncome: transaction.is_income,
        })),
    };
};


