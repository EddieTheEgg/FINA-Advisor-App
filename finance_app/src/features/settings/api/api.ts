import { AxiosError } from 'axios';
import api from '../../../api/axios';
import { CategoryManageResponse } from '../types';


type getSettingsCategoriesProps = {
    transactionType: 'INCOME' | 'EXPENSE' | 'TRANSFER';
    skip: number;
    limit: number;
}


export const getSettingsCategories = async ({transactionType, skip, limit}: getSettingsCategoriesProps) : Promise<CategoryManageResponse> => {
    try {
        const response = await api.get('/categories/getSettingsCategories', {
            params: {
                transactionType,
                skip,
                limit,
            },
        });
        return response.data; //Need to format the response to frontend CategoryManageResponse from the backend
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
