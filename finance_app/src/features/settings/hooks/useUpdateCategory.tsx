import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEditCategoryStore } from '../store/editCategoryStore';
import { updateCategory } from '../api/api';

export const useUpdateCategory = () => {

    const {
        categoryIdDraft,
        categoryNameDraft,
        categoryDescriptionDraft,
        categoryTypeDraft,
        categoryIconDraft,
        categoryColorDraft,
    } = useEditCategoryStore();

    const updateCategoryInfo = {
        category_id: categoryIdDraft,
        category_name: categoryNameDraft,
        category_description: categoryDescriptionDraft,
        category_type: categoryTypeDraft,
        category_icon: categoryIconDraft,
        category_color: categoryColorDraft,
    };

    const queryClient = useQueryClient();

    const {mutate, isPending, error, isSuccess} = useMutation({
        mutationFn: () => updateCategory(updateCategoryInfo),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['user-categories', categoryTypeDraft]});
            await queryClient.invalidateQueries({queryKey: ['get-all-user-categories', categoryTypeDraft]});
        },
        onError: (err: any) => {
            console.error('Error updating transaction:', err);
        },
    });

    return {mutate, isPending, error, isSuccess};
};
