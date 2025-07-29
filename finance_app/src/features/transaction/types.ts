import { AccountType } from '../accounts/types';

export type CategoryResponse = {
    categoryId: string,
    categoryName: string,
    icon: string,
    color: string,
    transactionType : 'INCOME' | 'EXPENSE' | 'TRANSFER',
    isCustom: boolean,
    categoryDescription: string | null,
    createdAt: Date,
    updatedAt: Date | null,
}

export type CategoryListResponse = {
    categories: CategoryResponse[],
    totalCategories: number,
    hasNext: boolean,
    currentPage: number,
    pageSize: number,
};

export type TransactionAccountResponse = {
    accountId: string,
    name: string,
    accountType: AccountType,
    balance: number,
    color: string,
    icon: string | null,
    creditLimit: number | null,
}

export type TransactionResponse = {
    transactionId: string,
    accountId: string,
    amount: number,
    title: string,
    transactionDate: string,
    transactionType: 'INCOME' | 'EXPENSE' | 'TRANSFER',
    notes: string | null,
    location: string | null,
    isSubscription: boolean,
    subscriptionFrequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY' | null,
    subscriptionStartDate: Date | null,
    subscriptionEndDate: Date | null,
    subscriptionNextPaymentDate: Date | null,
    sourceAccount: TransactionAccountResponse,
    toAccount: TransactionAccountResponse | null,
    merchant: string | null,
    createdAt: Date,
    updatedAt: Date | null,
    category: CategoryResponse,
};

//Backend Types
export type BackendCategoryResponse = {
    category_id: string,
    category_name: string,
    icon: string,
    color: string,
    transaction_type: 'INCOME' | 'EXPENSE' | 'TRANSFER',
    category_description: string | null,
    is_custom: boolean,
    created_at: string, //Returns a datetime string (YYYY-MM-DD HH:MM:SS)
    updated_at: string | null, //Returns a datetime string (YYYY-MM-DD HH:MM:SS)
}

export type BackendCategoryListResponse = {
    categories: BackendCategoryResponse[],
    total: number,
    has_next: boolean,
    current_page: number,
    page_size: number,
}

export type BackendTransactionCreateRequest = {
    //Required Fields
    transaction_type: 'INCOME' | 'EXPENSE' | 'TRANSFER',
    account_id: string,
    category_id: string,
    amount: number,
    title: string,
    transaction_date: string, //But in the format of Date type for backend

    //Optional Fields
    notes: string | null,
    location: string | null,
    merchant: string | null,

    //Optional Recurring/Subscription Fields
    is_subscription: boolean,
    subscription_frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY' | null,
    subscription_start_date: string | null, //But in the format of Date type for backend
    subscription_end_date: string | null, //But in the format of Date type for backend

    //May need transfer
    to_account_id: string | null,
}

export type BackendTransactionResponse = {
    transaction_id: string,
    account_id: string,
    amount: number,
    title: string,
    transaction_date: string, //Returns a Date
    transaction_type: 'INCOME' | 'EXPENSE' | 'TRANSFER',
    notes: string | null,
    location: string | null,
    is_subscription: boolean,
    subscription_frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY' | null,
    subscription_start_date: Date | null,
    subscription_end_date: Date | null,
    account_name: string,
    to_account_name: string | null,
    merchant: string | null,
    created_at: Date,
    updated_at: Date | null,
    category: BackendCategoryResponse,
};



export type BackendTransactionUpdateRequestAccount = {
    account_id: string;
    name: string;
    account_type: AccountType;
    balance: number;
    color: string;
    icon: string | null;
    credit_limit: number | null;
}

export type BackendTransactionUpdateRequest = {
    transaction_id: string,
    transaction_type: 'INCOME' | 'EXPENSE' | 'TRANSFER',
    sourceAccount: BackendTransactionUpdateRequestAccount;
    amount: number;
    title: string;
    date: string; //YYYY-MM-DD
    categoryId: string;
    notes: string | null;
    location: string | null;
    merchant: string | null;
    is_subscription: boolean;
    subscription_frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY' | null;
    subscription_start_date: string | null; //YYYY-MM-DD
    subscription_end_date: string | null; //YYYY-MM-DD
    to_account: BackendTransactionUpdateRequestAccount | null; //Only for transfers
}; 

