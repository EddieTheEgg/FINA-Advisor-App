import { useQuery } from '@tanstack/react-query';
import { getTransaction } from '../api/api';

export const useGetTransaction = (transactionId: string, enabled: boolean = true) => {
    const {data, isPending, error} = useQuery({
        queryKey: ['transaction', transactionId],
        queryFn: () => getTransaction(transactionId),
        staleTime: 1000 * 60 * 5,
        enabled: enabled,
    });

    return {data, isPending, error};
};
