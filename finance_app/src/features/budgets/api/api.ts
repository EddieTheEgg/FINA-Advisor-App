import { AxiosError } from 'axios';
import api from '../../../api/axios';
import { BackendBudgetCategoryDataResponse, BudgetCategoryListData } from '../types';

type GetUnBudgetedCategoriesProps = {
    monthDate: Date;
    skip: number;
    limit: number;
}


export const getUnBudgetedCategories = async ({monthDate, skip, limit}: GetUnBudgetedCategoriesProps): Promise<BudgetCategoryListData> => {
    try {
        const response = await api.get('/budgets/getUnBudgetedCategories', {
            params: {
                month_date: monthDate.toISOString().split('T')[0],
                skip,
                limit,
            },
        });
        const data = response.data;

        // Transform snake_case to camelCase and convert UUIDs to strings
        return {
            categories: data.map((category: BackendBudgetCategoryDataResponse) => ({
                categoryId: category.category_id.toString(),
                categoryIcon: category.category_icon,
                categoryColor: category.category_color,
                categoryName: category.category_name,
                categoryDescription: category.category_description,
            })),
            hasNext: data.has_next,
            currentPage: data.current_page,
            pageSize: data.page_size,
        };
    } catch (error : unknown) {
        if (error instanceof AxiosError && error.response?.status === 401) {
            throw new Error('Unauthorized: Please login to continue');
        } else if (error instanceof AxiosError && error.response?.status === 400) {
            throw new Error('Bad Request: Please check your request and try again');
        } else {
            throw new Error('Error fetching unbudgeted categories: Please try again later' + error);
        }
    }
};
