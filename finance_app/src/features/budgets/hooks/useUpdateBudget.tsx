import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBudget } from '../api/api';

type UpdateBudgetProps = {
    budgetId: string;
    budgetAmount: number;
    monthDate: Date;
}

export const useUpdateBudget = ({budgetId, budgetAmount, monthDate}: UpdateBudgetProps) => {
    const queryClient = useQueryClient();
    const {mutate, isPending, error, isSuccess} = useMutation({
        mutationFn: () => updateBudget({
            budget_id: budgetId,
            budget_amount: budgetAmount,
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['budget-details', budgetId]});
            queryClient.invalidateQueries({queryKey: ['getBudgets', monthDate]});
            queryClient.invalidateQueries({queryKey: ['unbudgeted-categories', monthDate]});
            queryClient.invalidateQueries({queryKey: ['getBudgetTransactions', budgetId]});
        },
    });
    return { mutate, isPending, error, isSuccess };
};
