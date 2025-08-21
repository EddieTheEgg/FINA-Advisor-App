import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCreateCategoryStore } from '../store/useCreateCategoryStore';
import { createCategory } from '../api/api';
import { CreateCategoryRequest } from '../types';

export const useCreateCategory = () => {

    const {
        categoryName,
        categoryType,
        categoryIcon,
        categoryColor,
        categoryDescription,
    } = useCreateCategoryStore();

    const createCategoryInfo: CreateCategoryRequest = {
        category_name: categoryName,
        category_type: categoryType,
        category_icon: categoryIcon,
        category_color: categoryColor,
        category_description: categoryDescription,
    };

    const queryClient = useQueryClient();

    const {mutate, isPending, error, isSuccess} = useMutation({
        mutationFn: () => createCategory(createCategoryInfo),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['get-settings-categories', categoryType]});
            await queryClient.invalidateQueries({queryKey: ['get-all-user-categories', categoryType]});
            await queryClient.invalidateQueries({queryKey: ['user-categories', categoryType]});
        },
        onError: (err: any) => {
            console.error('Error creating category:', err);
        },
    });

    return {mutate, isPending, error, isSuccess};
};
