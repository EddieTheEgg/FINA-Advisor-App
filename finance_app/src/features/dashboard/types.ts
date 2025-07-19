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
    title: string;
    transaction_date: string;
    transaction_type: 'INCOME' | 'EXPENSE' | 'TRANSFER';
    category: CategoryData;
    merchant: string | null;
    account_name: string;
    to_account_name?: string;  // For transfers
    notes: string | null;
    is_subscription: boolean;
}

export type BackendTransactionListRequest = {
    transaction_type: 'ALL' | 'INCOME' | 'EXPENSE' | 'TRANSFER';
    transaction_timeframe: Date, //In format #YYYY-MM-01 (Always start at 01)

    account_id?: string;
    category_id?: string;

    sort_by?: 'transaction_date' | 'amount' | 'created_at';
    sort_order?: 'asc' | 'desc';
}

export type BackendCategorySimplified = {
    category_id: string;
    category_name: string;
    icon: string;
    color: string;
    is_custom: boolean;
}


export type BackendTransactionSummary = {
    transaction_id: string;
    amount: number;
    title: string;
    transaction_date: Date;
    transaction_type: 'ALL' | 'INCOME' | 'EXPENSE' | 'TRANSFER';
    category: BackendCategorySimplified;
    account_name: string;
    to_account_name?: string;
}











// Frontend Types
export type CategoryData = {
    categoryId: string;
    categoryName: string;
    icon: string;
    color: string;
    transactionType: 'INCOME' | 'EXPENSE' | 'TRANSFER';
    isCustom: boolean;
    userId: string | null;
    createdAt: string;
    updatedAt: string | null;
}

export type CategorySimplifiedData = {
    categoryId: string;
    categoryName: string;
    icon: string;
    color: string;
    isCustom: boolean;
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
        title: string;
        transactionDate: string;
        transactionType: 'INCOME' | 'EXPENSE' | 'TRANSFER';
        category: CategoryData;
        merchant: string | null;
        accountName: string;
        toAccountName?: string;
        notes: string | null;
        isSubscription: boolean;
    }>;
}

export type TransactionSummary = {
    transactionId: string;
    amount: number;
    title: string;
    transactionDate: string;
    transactionType: 'INCOME' | 'EXPENSE' | 'TRANSFER';
    category: CategoryData;
    accountName: string;
    toAccountName?: string;
}

export type TransactionListResponse = {
    transactions: TransactionSummary[];
    pagination: {
        hasNext: boolean;
        currentPage: number;
        pageSize: number;
    }
    summary: {
        monthIncome: number;
        monthExpense: number;
        monthTransfer: number;
    }
}

//Component Props

//MonthSelector Props
export type MonthSelectorProps = {
    month: string;
    year: number;
    onPeriodChange: (month: string, year: number) => void;
}

