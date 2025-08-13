import { useQuery } from '@tanstack/react-query';
import { getTransaction } from '../api/api';

export const useGetTransaction = (transactionId: string, enabled: boolean = true) => {
    const {data, isPending, error} = useQuery({
        queryKey: ['transaction', transactionId],
        queryFn: () => getTransaction(transactionId),
        enabled: enabled,
        staleTime: 1000 * 30 * 5,
    });

    return {data, isPending, error};
};
