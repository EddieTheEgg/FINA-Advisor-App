import { useInfiniteQuery } from '@tanstack/react-query';
import { getBudgetTransactions } from '../api/api';

type UseGetBudgetTransactionsProps = {
    budgetId: string;
    monthDate: Date;
}

const LIMIT = 10;

export const useGetBudgetTransactions = ({budgetId, monthDate} : UseGetBudgetTransactionsProps) => {
    const {data, isPending, error, fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery({
        initialPageParam: 0,
        queryFn: ({pageParam = 0}) => getBudgetTransactions({budgetId, monthDate, skip: pageParam, limit: LIMIT}),
        queryKey: ['getBudgetTransactions', budgetId],
        getNextPageParam: (lastPage, pages) => {
            return lastPage.hasNext ? pages.length : undefined;
        },
        staleTime: 1000 * 60 * 5,
    });

    return { data, isPending, error, fetchNextPage, hasNextPage, isFetchingNextPage };
};
