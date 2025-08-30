import { AxiosError } from 'axios';
import api from '../../../api/axios';
import { BackendCategoryManageSummary, CategoryManageResponse, CreateCategoryRequest, UpdateCategoryRequest, UpdatePasswordRequest, UpdateProfileRequest } from '../types';


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
                categoryDescription: category.category_description ? category.category_description : null,
                categoryType: category.category_type,
                categoryIcon: category.category_icon,
                usedInTransactions: category.used_in_transactions,
                usedInBudgets: category.used_in_budgets,
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
export const updateCategory = async (updateCategoryInfo: UpdateCategoryRequest) => {
    try {
        await api.put('/categories/update-category', updateCategoryInfo);
    } catch (error : unknown) {
        if (error instanceof AxiosError && error.response?.status === 400) {
            throw new Error(error.response?.data.message);
        } else if (error instanceof AxiosError && error.response?.status === 401) {
            throw new Error('Unauthorized access to categories');
        } else if (error instanceof AxiosError && error.response?.status === 403) {
            throw new Error('Forbidden access to categories');
        } else if (error instanceof AxiosError && error.response?.status === 404) {
            throw new Error('Category not found');
        }
        throw new Error('Failed to update category. Please try again later.');
    }
};

export const createCategory = async (createCategoryInfo: CreateCategoryRequest) => {
    try {
        await api.post('/categories/create-category', createCategoryInfo);
    } catch (error : unknown) {
        if (error instanceof AxiosError && error.response?.status === 400) {
            throw new Error(error.response?.data.message);
        }
        else if (error instanceof AxiosError && error.response?.status === 401) {
            throw new Error('Unauthorized access to categories');
        }
        else if (error instanceof AxiosError && error.response?.status === 403) {
            throw new Error('Forbidden access to categories');
        }
        throw new Error('Failed to create category. Please try again later.');
    }
};

export const deleteCategory = async (categoryId: string) => {
    try {
        await api.delete('/categories/delete-category', {
            params: {
                category_id: categoryId,
            },
        });
    } catch (error : unknown) {
        if (error instanceof AxiosError && error.response?.status === 400) {
            throw new Error(error.response?.data.message);
        }
        else if (error instanceof AxiosError && error.response?.status === 401) {
            throw new Error('Unauthorized access to categories');
        }
        else if (error instanceof AxiosError && error.response?.status === 403) {
            throw new Error('Forbidden access to categories');
        }
        else if (error instanceof AxiosError && error.response?.status === 404) {
            throw new Error('Category not found');
        }
        throw new Error('Failed to delete category. Please try again later.');
    }
};

export const updateProfile = async (updateProfileRequest: UpdateProfileRequest) => {
    try {
        await api.put('/users/update-profile', updateProfileRequest);
    } catch (error : unknown) {
        if (error instanceof AxiosError && error.response?.status === 400) {
            throw new Error(error.response?.data.message);
        }
        else if (error instanceof AxiosError && error.response?.status === 401) {
            throw new Error('Unauthorized access to profile');
        }
        else if (error instanceof AxiosError && error.response?.status === 403) {
            throw new Error('Forbidden access to profile');
        }
        throw new Error('Failed to update profile. Please try again later.');
    }
};

export const updatePassword = async (updatePasswordRequest: UpdatePasswordRequest) => {
    try {
        await api.put('/users/update-password', updatePasswordRequest);
    } catch (error : unknown) {
        if (error instanceof AxiosError && error.response?.status === 400) {
            throw new Error(error.response?.data.message);
        }
        else if (error instanceof AxiosError && error.response?.status === 401) {
            throw new Error('Unauthorized access to password');
        }
        throw new Error('Failed to update password. Please try again later.');
    }
};

export const deleteAccount = async () => {
    try {
        await api.delete('/users/delete-account');
    } catch (error : unknown) {
        if (error instanceof AxiosError && error.response?.status === 400) {
            throw new Error(error.response?.data.message);
        }
        else if (error instanceof AxiosError && error.response?.status === 401) {
            throw new Error('Unauthorized access to account');
        }
        throw new Error('Failed to delete account. Please try again later.');
    }
};

