import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BackendTransactionUpdateRequest, TransactionResponse } from '../types';
import { updateTransaction } from '../api/api';

export const useUpdateTransaction = () => {
    const queryClient = useQueryClient();

    const {mutate, isPending, error, isSuccess} = useMutation({
        mutationFn: (transaction: BackendTransactionUpdateRequest): Promise<TransactionResponse> => updateTransaction(transaction),
        onSuccess: async (data: TransactionResponse) => {
            const currentDate = new Date(data.transactionDate);
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();

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
                queryClient.invalidateQueries({queryKey: ['dashboard', month, year]}),
            ]);
        },
        onError: (err: any) => {
            console.error('Error updating transaction:', err);
        },
    });

    return {mutate, isPending, error, isSuccess};
};
