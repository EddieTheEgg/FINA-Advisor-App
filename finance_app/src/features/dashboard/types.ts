// Backend Types
export type BackendDashboardAccountInfo = {
    name: string;
    account_type: string;
    balance: number;
    color: string;
}

export type BackendDashboardRecentTransaction = {
    transaction_id: string;
    amount: number;
    title: string | null;
    transaction_date: string;
    transaction_type: 'INCOME' | 'EXPENSE' | 'TRANSFER';
    category: CategoryData | null;
    merchant: string | null;
    account_name: string;
    to_account_name?: string;  // For transfers
    notes: string | null;
}

// Frontend Types
export type CategoryData = {
    categoryId: string;
    categoryName: string;
    icon: string;
    color: string;
    isIncome: boolean;
    isCustom: boolean;
    userId: string | null;
    createdAt: string;
    updatedAt: string | null;
}

export type UserSimpleResponse = {
    firstName: string;
    lastName: string;
    email: string;
}

export type DashboardData = {
    user: UserSimpleResponse;
    period: {
        month: string;
        year: number;
    }
    financialSummary: {
        totalBalance: number;
        monthlyIncome: number;
        monthlyExpense: number;
        monthlyTransfer: number;
        monthlyNet: number;
        isPositive: boolean;
    }
    accounts: {
        count: number;
        accountInfos: Array<{
            name: string;
            accountType: string;
            balance: number;
            color: string;
        }>;
    }
    recentTransactions: Array<{
        transactionId: string;
        amount: number;
        title: string | null;
        transactionDate: string;
        transactionType: 'INCOME' | 'EXPENSE' | 'TRANSFER';
        category: CategoryData | null;
        merchant: string | null;
        accountName: string;
        toAccountName?: string;
        notes: string | null;
    }>;
}

//Component Props

//MonthSelector Props
export type MonthSelectorProps = {
    month: string;
    year: number;
    onPeriodChange: (month: string, year: number) => void;
}

