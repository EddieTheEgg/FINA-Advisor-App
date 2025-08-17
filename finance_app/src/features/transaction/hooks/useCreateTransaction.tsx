import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTransaction } from '../api/api';
import { BackendTransactionCreateRequest, TransactionResponse } from '../types';
import { useCreateTransactionStore } from '../store/useTransactionStore';

export const useCreateTransaction = () => {
    const { resetToInitialState, setTransactionSuccess, transactionType } = useCreateTransactionStore();

    const queryClient = useQueryClient();
    const {mutate, isPending, error, isSuccess} = useMutation({
        mutationFn: (transaction: BackendTransactionCreateRequest) : Promise<TransactionResponse> => createTransaction(transaction),
        onSuccess: async (data: TransactionResponse) => {
            const currentDate = new Date(data.transactionDate);
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();

            // Invalidate all queries that could be affected by the new transaction
            await Promise.all([
                queryClient.invalidateQueries({queryKey: ['account-transactions', data.accountId]}),
                queryClient.invalidateQueries({queryKey: ['grouped-accounts']}),
                queryClient.invalidateQueries({queryKey: ['account-details', data.accountId]}),
                queryClient.invalidateQueries({queryKey: ['dashboard', month, year]}),
                queryClient.invalidateQueries({queryKey: ['getBudgets', new Date(year, month, 1)]}),
                queryClient.invalidateQueries({queryKey: ['getBudgetTransactions']}),
                queryClient.invalidateQueries({queryKey: ['budget-details']}),
                queryClient.invalidateQueries({queryKey: ['get-settings-categories', transactionType]}),
            ]);

            // Set success state and reset other fields
            setTransactionSuccess(true);
            resetToInitialState();
        },
        onError: (err : any) => {
            console.error('Error creating transaction:', err);
        },
    });

    return {mutate, isPending, error, isSuccess};
};
