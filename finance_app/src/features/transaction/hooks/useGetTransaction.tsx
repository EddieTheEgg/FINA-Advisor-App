import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getTransaction } from '../api/api';
import { TransactionResponse } from '../types';

export const useGetTransaction = (transactionId: string) => {
    const {data, isPending, error} = useQuery({
        queryKey: ['transaction', transactionId],
        queryFn: () => getTransaction(transactionId),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    return {data, isPending, error};
};
