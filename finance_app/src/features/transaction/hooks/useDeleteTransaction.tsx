import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTransaction } from '../api/api';
import { TransactionResponse } from '../types';

type UseDeleteTransactionProps = {
    transactionId: string;
    transactionDetails?: TransactionResponse;
}

export const useDeleteTransaction = ({transactionId, transactionDetails}: UseDeleteTransactionProps) => {
    const queryClient = useQueryClient();

    const {mutate, isPending, isSuccess, error} = useMutation({
        mutationFn: () => deleteTransaction(transactionId),
        onSuccess: () => {
            if (transactionDetails) {
                // Immediately remove the transaction from cache to prevent further queries
                queryClient.removeQueries({queryKey: ['transaction', transactionId]});

                // Invalidate and remove related queries after successful deletion
                Promise.all([
                    queryClient.invalidateQueries({queryKey: ['grouped-accounts']}),
                    queryClient.invalidateQueries({queryKey: ['account-transactions', transactionDetails.accountId]}),
                    queryClient.invalidateQueries({queryKey: ['account-details', transactionDetails.accountId]}),
                    queryClient.invalidateQueries({queryKey: ['transactionList']}),
                    // For transfers, also invalidate the destination account queries
                    ...(transactionDetails.toAccount ? [
                        queryClient.invalidateQueries({queryKey: ['account-transactions', transactionDetails.toAccount.accountId]}),
                        queryClient.invalidateQueries({queryKey: ['account-details', transactionDetails.toAccount.accountId]}),
                    ] : []),
                    // Invalidate dashboard queries for both the transaction's month and current month
                    queryClient.invalidateQueries({queryKey: ['dashboard', new Date(transactionDetails.transactionDate).getMonth() + 1, new Date(transactionDetails.transactionDate).getFullYear()]}),
                    queryClient.invalidateQueries({queryKey: ['dashboard', new Date().getMonth() + 1, new Date().getFullYear()]}),
                    // Also invalidate any dashboard queries that might be cached
                    queryClient.invalidateQueries({queryKey: ['dashboard']}),
                    // Invalidate budgets for the transaction's month
                    queryClient.invalidateQueries({queryKey: ['getBudgets', new Date(new Date(transactionDetails.transactionDate).getFullYear(), new Date(transactionDetails.transactionDate).getMonth(), 1)]}),
                    // Invalidate budget transactions queries for the transaction's month
                    queryClient.invalidateQueries({queryKey: ['getBudgetTransactions']}),
                    queryClient.invalidateQueries({queryKey: ['budget-details', transactionDetails.budgetIdAffected]}),
                ]).then(() => {
                    // Force refetch the current dashboard data and budgets for that transaction month after invalidation
                    queryClient.refetchQueries({queryKey: ['dashboard', new Date().getMonth() + 1, new Date().getFullYear()]});
                    queryClient.refetchQueries({queryKey: ['getBudgets', new Date(new Date(transactionDetails.transactionDate).getFullYear(), new Date(transactionDetails.transactionDate).getMonth(), 1)]});
                });
            }
        },
    });

    return {
        mutate,
        isPending,
        isSuccess,
        error,
    };
};
