import { useQuery } from '@tanstack/react-query';
import { getTransaction } from '../api/api';

export const useGetTransaction = (transactionId: string) => {
    const {data, isPending, error} = useQuery({
        queryKey: ['transaction', transactionId],
        queryFn: () => getTransaction(transactionId),
        staleTime: 0,
    });

    return {data, isPending, error};
};
