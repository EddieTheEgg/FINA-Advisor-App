import { useMutation } from '@tanstack/react-query';
import { deleteTransaction } from '../api/api';


type UseDeleteTransactionProps = {
    transactionId: string;
}

export const useDeleteTransaction = ({transactionId}: UseDeleteTransactionProps) => {
    const {mutate, isPending, isSuccess, error} = useMutation({
        mutationFn: () => deleteTransaction(transactionId),
    });

    return {
        mutate,
        isPending,
        isSuccess,
        error,
    };
};
