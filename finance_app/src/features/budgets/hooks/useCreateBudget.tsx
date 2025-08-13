import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBudget } from '../api/api';
import { CreateBudgetPayload } from '../types';
import { useCreateBudgetStore } from '../store/useCreateBudgetStore';

export const useCreateBudget = () => {
    const queryClient = useQueryClient();
    const {setCreateSuccessModal, resetCreateBudgetStore} = useCreateBudgetStore();
    const {mutate, isPending, error} = useMutation({
        mutationFn: (budgetData: CreateBudgetPayload) : Promise<void> => createBudget(budgetData),
        onSuccess : (_, variables) => {
            // Convert the string date back to Date object for query invalidation
            const budgetMonthDate = new Date(variables.budget_month);
            queryClient.invalidateQueries({queryKey: ['unbudgeted-categories', budgetMonthDate]});
            queryClient.invalidateQueries({queryKey: ['getBudgets', budgetMonthDate]});
            setCreateSuccessModal(true);
        },
        onError: () => {
            resetCreateBudgetStore();
        },
    });

    return {mutate, isPending, error};
};
