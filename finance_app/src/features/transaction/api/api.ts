import api from '../../../api/axios';
import { BackendCategoryResponse, CategoryListResponse, BackendTransactionCreateRequest, TransactionResponse, BackendTransactionUpdateRequest } from '../types';

type userCategoriesParam = {
    skip: number,
    limit: number,
    transactionType: 'INCOME' | 'EXPENSE' | 'TRANSFER' | null,
}

export const getUserCategories = async ({skip, limit, transactionType} : userCategoriesParam) : Promise<CategoryListResponse | undefined> => {
    try {
        const response = await api.get('/categories/user-categories', {params: {skip: skip, limit: limit, transaction_type: transactionType}});
        const data = response.data;

        //Need to format data into CategoriesResponse
        const formattedCategories = data.categories.map((category: BackendCategoryResponse) => ({
            categoryId: category.category_id,
            categoryName: category.category_name,
            icon: category.icon,
            color: category.color,
            transactionType: category.transaction_type,
            isCustom: category.is_custom,
            categoryDescription: category.category_description,
            createdAt: category.created_at,
            updatedAt: category.updated_at,
        }));
        data.categories = formattedCategories;
        data.totalCategories = data.total;
        data.hasNext = data.has_next;
        data.currentPage = data.current_page;
        data.pageSize = data.page_size;

        return data;
    } catch (error) {
        console.error('Error fetching user categories:', error);
        throw error;
    }
};

// Create a new transaction, and returns the created transaction information (can be like a reciept for users)
export const createTransaction = async (transaction: BackendTransactionCreateRequest) : Promise<TransactionResponse> => {
    try {
        const response = await api.post('/transactions/create-transaction', transaction);
        const data = response.data;

        // Convert backend response to frontend format
        const formattedTransaction: TransactionResponse = {
            transactionId: data.transaction_id,
            accountId: data.account_id,
            amount: data.amount,
            title: data.title,
            transactionDate: data.transaction_date,
            transactionType: data.transaction_type,
            notes: data.notes,
            location: data.location,
            isSubscription: data.is_subscription,
            subscriptionFrequency: data.subscription_frequency,
            subscriptionStartDate: data.subscription_start_date,
            subscriptionEndDate: data.subscription_end_date,
            subscriptionNextPaymentDate: data.subscription_next_payment_date,

            sourceAccount: {
                accountId: data.source_account.account_id,
                name: data.source_account.name,
                accountType: data.source_account.account_type,
                balance: data.source_account.balance,
                color: data.source_account.color,
                icon: data.source_account.icon,
                creditLimit: data.source_account.credit_limit,
            },

            toAccount: data.to_account ? {
                accountId: data.to_account.account_id,
                name: data.to_account.name,
                accountType: data.to_account.account_type,
                balance: data.to_account.balance,
                color: data.to_account.color,
                icon: data.to_account.icon,
                creditLimit: data.to_account.credit_limit,
            } : null,

            merchant: data.merchant,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
            category: {
                categoryId: data.category.category_id,
                categoryName: data.category.category_name,
                icon: data.category.icon,
                color: data.category.color,
                transactionType: data.category.transaction_type,
                categoryDescription: data.category.category_description,
                isCustom: data.category.is_custom,
                createdAt: data.category.created_at,
                updatedAt: data.category.updated_at,
            },
        };

        return formattedTransaction;
    } catch (error) {
        console.error('Error creating transaction:', error);
        throw error;
    }
};


export const getTransaction = async (transactionId: string) : Promise<TransactionResponse> => {
    try {
        const response = await api.get('/transactions/get-transaction', {params: {transaction_id: transactionId}});
        const data = response.data;

        // Convert backend response to frontend format
        const formattedTransaction: TransactionResponse = {
            transactionId: data.transaction_id,
            accountId: data.account_id,
            amount: data.amount,
            title: data.title,
            transactionDate: data.transaction_date,
            transactionType: data.transaction_type,
            notes: data.notes,
            location: data.location,
            isSubscription: data.is_subscription,
            subscriptionFrequency: data.subscription_frequency,

            //Need to convert JSON date string to Typescript date object (Typescript Date does not equal Python Date)
            subscriptionStartDate: data.subscription_start_date ? new Date(data.subscription_start_date) : null,
            subscriptionEndDate: data.subscription_end_date ? new Date(data.subscription_end_date) : null,
            subscriptionNextPaymentDate: data.subscription_next_payment_date ? new Date(data.subscription_next_payment_date) : null,

            sourceAccount: {
                accountId: data.source_account.account_id,
                name: data.source_account.name,
                accountType: data.source_account.account_type,
                balance: data.source_account.balance,
                color: data.source_account.color,
                icon: data.source_account.icon,
                creditLimit: data.source_account.credit_limit,
            },
            toAccount: data.to_account ? {
                accountId: data.to_account.account_id,
                name: data.to_account.name,
                accountType: data.to_account.account_type,
                balance: data.to_account.balance,
                color: data.to_account.color,
                icon: data.to_account.icon,
                creditLimit: data.to_account.credit_limit,
            } : null,

            merchant: data.merchant,
            createdAt: new Date(data.created_at),
            updatedAt: data.updated_at ? new Date(data.updated_at) : null,
            category: {
                categoryId: data.category.category_id,
                categoryName: data.category.category_name,
                icon: data.category.icon,
                color: data.category.color,
                transactionType: data.category.transaction_type,
                categoryDescription: data.category.category_description,
                isCustom: data.category.is_custom,
                createdAt: new Date(data.category.created_at),
                updatedAt: data.category.updated_at ? new Date(data.category.updated_at) : null,
            },
        };

        return formattedTransaction;
    } catch (error) {
        console.error('Error fetching transaction:', error);
        throw error;
    }
};

export const updateTransaction = async (transaction: BackendTransactionUpdateRequest) : Promise<TransactionResponse> => {
    try {
        console.log('Sending update transaction request:', JSON.stringify(transaction, null, 2));
        const response = await api.put('/transactions/update-transaction', transaction);
        console.log('Update transaction response:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Error updating transaction:', error);
        console.error('Error details:', error.response?.data);
        throw error;
    }
};

