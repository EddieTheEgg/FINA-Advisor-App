import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BackendTransactionUpdateRequest, TransactionResponse } from '../types';
import { updateTransaction } from '../api/api';

export const useUpdateTransaction = () => {
    const queryClient = useQueryClient();

    const {mutate, isPending, error, isSuccess} = useMutation({
        mutationFn: (transaction: BackendTransactionUpdateRequest): Promise<TransactionResponse> => updateTransaction(transaction),
        onSuccess: async (data: TransactionResponse) => {
            console.log('Transaction updated successfully:', data);
            console.log('Budget ID affected:', data.budgetIdAffected);

            // Invalidate all queries that could be affected by the updated transaction
            await Promise.all([
                queryClient.invalidateQueries({queryKey: ['transaction', data.transactionId]}),
                queryClient.invalidateQueries({queryKey: ['transactionList']}),
                queryClient.invalidateQueries({queryKey: ['grouped-accounts']}),
                queryClient.invalidateQueries({queryKey: ['account-transactions', data.accountId]}),
                queryClient.invalidateQueries({queryKey: ['account-details', data.accountId]}),
                // For transfers, also invalidate the destination account queries
                ...(data.toAccount ? [
                    queryClient.invalidateQueries({queryKey: ['account-transactions', data.toAccount.accountId]}),
                    queryClient.invalidateQueries({queryKey: ['account-details', data.toAccount.accountId]}),
                ] : []),
                // Invalidate all dashboard queries
                queryClient.invalidateQueries({queryKey: ['dashboard']}),
                queryClient.invalidateQueries({queryKey: ['getBudgets', new Date(new Date(data.transactionDate).getFullYear(), new Date(data.transactionDate).getMonth(), 1)]}),
                queryClient.invalidateQueries({queryKey: ['getBudgetTransactions']}),
                queryClient.invalidateQueries({queryKey: ['budget-details']}),
                queryClient.invalidateQueries({queryKey: ['get-settings-categories', data.transactionType]}),
                queryClient.invalidateQueries({queryKey: ['get-all-user-categories', data.transactionType]}),
                queryClient.invalidateQueries({queryKey: ['user-categories', data.transactionType]}),
            ]);

        },
        onError: (err: any) => {
            console.error('Error updating transaction:', err);
        },
    });

    return {mutate, isPending, error, isSuccess};
};
