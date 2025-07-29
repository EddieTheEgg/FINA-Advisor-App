import { useMutation } from '@tanstack/react-query';
import { BackendTransactionUpdateRequest } from '../types';
import { updateTransaction } from '../api/api';

export const useUpdateTransaction = () => {
    const {mutate, isPending, error} = useMutation({
        mutationFn: (transaction: BackendTransactionUpdateRequest) => updateTransaction(transaction),
    });

    return {mutate, isPending, error};
};
