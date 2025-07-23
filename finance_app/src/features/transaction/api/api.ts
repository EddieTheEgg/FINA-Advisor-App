import api from '../../../api/axios';
import { BackendCategoryResponse, CategoryListResponse, BackendTransactionCreateRequest, TransactionResponse } from '../types';

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
            accountName: data.account_name,
            toAccountName: data.to_account_name,
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
            subscriptionStartDate: data.subscription_start_date,
            subscriptionEndDate: data.subscription_end_date,
            accountName: data.account_name,
            toAccountName: data.to_account_name,
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
        console.error('Error fetching transaction:', error);
        throw error;
    }
};

