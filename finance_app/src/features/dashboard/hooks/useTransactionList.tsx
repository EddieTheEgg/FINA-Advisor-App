import { useInfiniteQuery } from '@tanstack/react-query';
import { BackendTransactionListRequest } from '../types';
import { getTransactionList } from '../api/api';

const LIMIT = 10;

export const useTransactionList = (request: BackendTransactionListRequest) => {
    return useInfiniteQuery({
        queryKey: ['transactionList', request],
        queryFn: ({ pageParam = 0 }) => getTransactionList(pageParam, LIMIT, request),
        getNextPageParam: (lastPage) => {
            return lastPage?.pagination.hasNext
                ? lastPage.pagination.currentPage * lastPage.pagination.pageSize
                : undefined;
            },
        initialPageParam: 0,
        select: (data) => data.pages.flatMap((page) => page.transactions),
    });
};
