import { useInfiniteQuery } from '@tanstack/react-query';
import { getUserCategories } from '../api/api';

const LIMIT = 10;

export const useGetUserCategories = (transactionType: 'INCOME' | 'EXPENSE' | 'TRANSFER' | null) => {
    const {data, hasNextPage, fetchNextPage, isFetchingNextPage, error} = useInfiniteQuery({
        queryKey: ['user-categories', transactionType],
        initialPageParam: 0,
        queryFn: ({pageParam = 0}) =>
            getUserCategories({skip: pageParam, limit: LIMIT, transactionType: transactionType}),
        getNextPageParam: (lastPage) => {
            // Return the next skip value, not the page number (though name is pageParam)
            return lastPage?.hasNext
                ? lastPage.currentPage * lastPage.pageSize
                : undefined;
        },
    });

    return {data, hasNextPage, fetchNextPage, isFetchingNextPage, error};
};
