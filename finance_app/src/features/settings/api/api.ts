import { AxiosError } from 'axios';
import api from '../../../api/axios';
import { BackendCategoryManageSummary, CategoryManageResponse } from '../types';


type getSettingsCategoriesProps = {
    transactionType: 'INCOME' | 'EXPENSE' | 'TRANSFER';
    skip: number;
    limit: number;
}


export const getSettingsCategories = async ({transactionType, skip, limit}: getSettingsCategoriesProps) : Promise<CategoryManageResponse> => {
    try {
        const response = await api.get('/categories/get-settings-categories', {
            params: {
                transaction_type: transactionType,
                skip,
                limit,
            },
        });

        const formattedResponse = {
            categories: response.data.categories.map((category: BackendCategoryManageSummary) => ({
                categoryId: category.category_id,
                categoryName: category.category_name,
                categoryColor: category.category_color,
                categoryDescription: category.category_description,
                categoryType: category.category_type,
                categoryIcon: category.category_icon,
                usedInTransactions: category.used_in_transactions,
            })),
            totalCategories: response.data.total_categories,
            hasNext: response.data.has_next,
            currentPage: response.data.current_page,
            pageSize: response.data.page_size,
        };

        return formattedResponse;
    } catch (error : unknown) {
        if (error instanceof AxiosError && error.response?.status === 400) {
            throw new Error(error.response?.data.message);
        } else if (error instanceof AxiosError && error.response?.status === 401) {
            throw new Error('Unauthorized access to categories');
        } else if (error instanceof AxiosError && error.response?.status === 403) {
            throw new Error('Forbidden access to categories');
        } else if (error instanceof AxiosError && error.response?.status === 404) {
            throw new Error('Categories not found');
        }
        throw new Error('Failed to fetch categories. Please try again later.');
    }
};
