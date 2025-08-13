import { AxiosError } from 'axios';
import api from '../../../api/axios';
import { BackendBudgetCategoryDataResponse, BackendBudgetDataResponse, BudgetCategoryListData, BudgetListData, CreateBudgetPayload } from '../types';

type GetUnBudgetedCategoriesProps = {
    monthDate: Date;
    skip: number;
    limit: number;
}
type GetBudgetProps = {
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
                categoryDescription: category.category_description ? category.category_description : null,
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





//Fetches budgets for the given month date
export const getBudgets = async ({monthDate, skip, limit} : GetBudgetProps) : Promise<BudgetListData> => {
    try {
        const response = await api.get('/budgets/getBudgets', {
            params : {
                month_date: monthDate.toISOString().split('T')[0],
                skip,
                limit,
            },
        });
        const data = response.data;
        return {
            budgets: data.budgets.map((budget: BackendBudgetDataResponse) => ({
                budgetId: budget.budget_id.toString(),
                categoryData: {
                    categoryId: budget.category_data.category_id.toString(),
                    categoryIcon: budget.category_data.category_icon,
                    categoryColor: budget.category_data.category_color,
                    categoryName: budget.category_data.category_name,
                    categoryDescription: budget.category_data.category_description ? budget.category_data.category_description : null,
                },
                budgetSpent: budget.budget_spent,
                budgetAmount: budget.budget_amount,
                budgetMonth: budget.budget_month,
            })),
            hasNext: data.has_next,
            currentPage: data.current_page,
            pageSize: data.page_size,
        };
    } catch ( error : unknown ) {
        if (error instanceof AxiosError && error.response?.status === 401) {
            throw new Error('Unauthorized: Please login to continue');
        } else if (error instanceof AxiosError && error.response?.status === 400) {
            throw new Error('Bad Request: Please check your request and try again');
        } else {
            throw new Error('Error fetching budgets: Please try again later' + error);
        }
    }
};

