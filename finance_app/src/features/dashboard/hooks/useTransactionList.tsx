import { useInfiniteQuery } from '@tanstack/react-query';
import { BackendTransactionListRequest } from '../types';
import { getTransactionList } from '../api/api';

const LIMIT = 10;

export const useTransactionList = (request: BackendTransactionListRequest) => {
    const {data, isPending, error, fetchNextPage, hasNextPage} = useInfiniteQuery({
        queryKey: ['transactionList', request],
        queryFn: ({ pageParam = 0 }) => getTransactionList(pageParam, LIMIT, request),
        getNextPageParam: (lastPage) => {
            return lastPage?.pagination.hasNext
                ? lastPage.pagination.currentPage * lastPage.pagination.pageSize
                : undefined;
            },
        initialPageParam: 0,
        select: (queryData) => {
            const allTransactions = queryData.pages.flatMap((page) => page.transactions);
            const lastPage = queryData.pages[queryData.pages.length - 1];

            return {
                transactions: allTransactions,
                pagination: lastPage?.pagination,
                summary: lastPage?.summary,
                possibleCategories: lastPage?.possibleCategories,
            };
        },
    });

    return {data, isPending, error, fetchNextPage, hasNextPage};
};
