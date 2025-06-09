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
    is_income: boolean;
    category: CategoryData | null;
    merchant: string | null;
    account_name: string;
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
        monthlyNet: number;
        isPositive: boolean;
    }
    accounts: {
        count: number;
        accounts: Array<{
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
        isIncome: boolean;
        category: CategoryData | null;
        merchant: string | null;
        accountName: string;
        notes: string | null;
    }>;
}

//MonthSelector
export type MonthSelectorProps = {
    month: string;
    year: number;
    onPeriodChange: (month: string, year: number) => void;
}


//BalanceBadge
export type BalanceBadgeDisplayProps = {
    financialSummary: DashboardData['financialSummary'] | undefined;
    currencySymbol: string;
}
