import { useMutation } from '@tanstack/react-query';
import { deleteBudget } from '../api/api';
import { useQueryClient } from '@tanstack/react-query';

type useDeleteBudgetProps = {
    budgetId: string;
    monthDate: Date;
}

export const useDeleteBudget = ({budgetId, monthDate}: useDeleteBudgetProps) => {
    const queryClient = useQueryClient();
    const {mutate, isPending, error, isSuccess} = useMutation({
        mutationFn: () => deleteBudget(budgetId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['getBudgets', monthDate]});
            queryClient.invalidateQueries({queryKey: ['unbudgeted-categories', monthDate]});
        },
    });
    return {mutate, isPending, error, isSuccess};
};
