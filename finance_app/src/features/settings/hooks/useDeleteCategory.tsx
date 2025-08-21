import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCategory } from '../api/api';

type useDeleteCategoryProps = {
    categoryId: string;
    categoryType: 'INCOME' | 'EXPENSE' | 'TRANSFER';
}

export const useDeleteCategory = ({categoryId, categoryType} : useDeleteCategoryProps) => {
    const queryClient = useQueryClient();
    const {mutate, isPending, error, isSuccess} = useMutation({
        mutationFn: () => deleteCategory(categoryId),
        onSuccess: async () => {
            // Remove the infinite query data instead of invalidating to prevent refetching all pages
            queryClient.removeQueries({queryKey: ['get-settings-categories', categoryType]});
            await queryClient.invalidateQueries({queryKey: ['get-all-user-categories', categoryType]});
            await queryClient.invalidateQueries({queryKey: ['user-categories', categoryType]});
        },
        onError: (err: any) => {
            console.error('Error deleting category:', err);
        },
    });

    return { mutate, isPending, error, isSuccess };
};
