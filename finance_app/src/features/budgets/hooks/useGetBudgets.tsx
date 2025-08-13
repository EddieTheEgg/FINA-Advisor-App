import { useInfiniteQuery } from '@tanstack/react-query'
import { getBudgets } from '../api/api'

export const useGetBudgets = (monthDate : Date) => {
    const {data, isPending, error, fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery({
        initialPageParam: 0,
        queryFn: ({pageParam = 0}) => getBudgets({monthDate, skip: pageParam, limit: 10}),
        queryKey: ['getBudgets', monthDate],
        getNextPageParam: (lastPage, pages) => {
            return lastPage.hasNext ? pages.length : undefined;
        },
        staleTime: 1000 * 60 * 5,
    });

    return { data, isPending, error, fetchNextPage, hasNextPage, isFetchingNextPage };
};
