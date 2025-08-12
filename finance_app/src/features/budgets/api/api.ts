import { AxiosError } from 'axios';
import api from '../../../api/axios';
import { BackendBudgetCategoryDataResponse, BudgetCategoryListData, CreateBudgetPayload } from '../types';

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
            categories: data.categories.map((category: BackendBudgetCategoryDataResponse) => ({
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

// Creates a new budget for a category, with response only being server status code 201 if successful, no actual data
export const createBudget = async (budgetData: CreateBudgetPayload) : Promise<void> => {
    try {
        const response = await api.post('/budgets/createBudget', budgetData);
        if (response.status === 201) {
            return;
        }
    } catch (error : unknown) {
        if (error instanceof AxiosError && error.response?.status === 401) {
            throw new Error('Unauthorized: Please login to continue');
        } else if (error instanceof AxiosError && error.response?.status === 400) {
            const errorDetail = error.response?.data?.detail;
            if (errorDetail && errorDetail.includes('Budget already exists')) {
                throw new Error(errorDetail);
            } else {
                throw new Error('Bad Request: Please check your request and try again');
            }
        } else {
            throw new Error('Error creating budget: Please try again later' + error);
        }
    }
};

