import api from '../../../api/axios';
import { BackendCategoryResponse, CategoryListResponse } from '../types';

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

