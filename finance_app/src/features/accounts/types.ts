//Types for the accounts list screen
export enum AccountType {
    CHECKING = 'checking',
    SAVINGS = 'savings',
    CREDIT_CARD = 'credit_card',
    INVESTMENT = 'investment',
    LOAN = 'loan',
    CASH = 'cash',
    OTHER = 'other'
}

export type AccountResponse = {
    accountId: string;
    name: string;
    accountType: AccountType;
    balance: number;
    color: string;
    icon: string;
    isDefault: boolean;
    includeInTotals: boolean;
    isActive: boolean;
    creditLimit: number | null;
    bankName: string | null;
    accountNumber: string | null;
    routingNumber: string | null;
    createdAt: string;
    updatedAt: string | null;
}

// Enhanced transaction types for account details
export type AccountTransactionResponse = {
    transactionId: string;
    amount: number;
    title: string;
    transactionDate: string;
    transactionType: 'INCOME' | 'EXPENSE' | 'TRANSFER';
    notes: string | null;
    location: string | null;
    isSubscription: boolean;
    subscriptionFrequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY' | null;
    subscriptionStartDate: string | null;
    subscriptionEndDate: string | null;
    accountName: string;
    toAccountName?: string;
    creditLimit: number | null;
    merchant: string | null;
    createdAt: string;
    updatedAt: string;
    categorySimplified: {
        categoryId: string;
        categoryName: string;
        icon: string;
        color: string;
        isCustom: boolean;
    };
}

// Account transactions response
export type AccountTransactionsResponse = {
    transactions: AccountTransactionResponse[];
    current_page: number;
    next_page: number | null;
}

export type GroupedAccountsResponse = {
    totalNet : number;
    percentChange: number;
    accountGroupsData: Record<string, AccountResponse[]>;
}

export type TransferSubmission = {
    fromAccount: string;
    toAccount: string;
    amount: number;
    title: string;
    note: string;
    location: string;
}

//Types for the backend
export type BackendAccountResponse = {
    account_id: string;
    name: string;
    account_type: AccountType;
    balance: number;
    color: string;
    icon: string | null;
    is_default: boolean;
    include_in_totals: boolean;
    is_active: boolean;
    credit_limit: number | null;
    bank_name: string | null;
    account_number: string | null;
    routing_number: string | null;
    created_at: string;
    updated_at: string | null;
};

export type BackendTransactionAccountResponse = {
    transaction_id: string;
    amount: number;
    title: string;
    transaction_date: string;
    transaction_type: 'INCOME' | 'EXPENSE' | 'TRANSFER';
    notes: string | null;
    location: string | null;
    is_subscription: boolean;
    subscription_frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY' | null;
    subscription_start_date: string | null;
    subscription_end_date: string | null;
    account_name: string;
    to_account_name: string | null;
    credit_limit: number | null;
    merchant: string | null;
    created_at: string;
    updated_at: string | null;
    category_simplified: {
        category_id: string;
        category_name: string;
        icon: string;
        color: string;
        is_custom: boolean;
    };
}
