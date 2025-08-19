import { useQuery } from '@tanstack/react-query';
import { getUserCategories } from '../../transaction/api/api';

export const useGetAllUserCategories = (transactionType: 'INCOME' | 'EXPENSE' | 'TRANSFER' | null) => {
    const {data, isPending, error} = useQuery({
        queryKey: ['get-all-user-categories', transactionType],
        queryFn: () => getUserCategories({skip: 0, limit: 1000, transactionType: transactionType}),
        staleTime: 1000 * 60 * 10, // 10 minutes, can be longer if needed since we invalidate the query when the user edits a category
    });

    return {data, isPending, error};
};
