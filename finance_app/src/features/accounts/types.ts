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
    length: number;
    accountId: string;
    name: string;
    accountType: AccountType;
    balance: number;
    color: string;
    icon: string | null;
    isDefault: boolean;
    includeInTotals: boolean;
    isActive: boolean;
    bankName: string | null;
    accountNumber: string | null;
    routingNumber: string | null;
    createdAt: string;
    updatedAt: string | null;
}

// Enhanced transaction types for account details
export type TransactionResponse = {
    transactionId: string;
    amount: number;
    title: string;
    transactionDate: string;
    transactionType: 'INCOME' | 'EXPENSE' | 'TRANSFER';
    notes: string | null;
    location: string | null;
    merchant: string | null;
    accountName: string;
    toAccountName?: string;
    isSubscription: boolean;
    category: {
        categoryId: string;
        categoryName: string;
        icon: string;
        color: string;
    } | null;
}

// Account transactions response
export type AccountTransactionsResponse = {
    transactions: TransactionResponse[];
    current_page: number;
    next_page: number | null;
}

export type GroupedAccountsResponse = {
    totalNet : number;
    percentChange: number;
    accountGroupsData: Record<string, AccountResponse[]>;
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
    bank_name: string | null;
    account_number: string | null;
    routing_number: string | null;
    created_at: string;
    updated_at: string | null;
}

export type BackendTransactionResponse = {
    transaction_id: string;
    amount: number;
    title: string;
    transaction_date: string;
    transaction_type: 'INCOME' | 'EXPENSE' | 'TRANSFER';
    notes: string | null;
    location: string | null;
    merchant: string | null;
    account_name: string;
    to_account_name?: string;
    is_subscription: boolean;
    category: {
        category_id: string;
        category_name: string;
        icon: string;
        color: string;
    } | null;
}
