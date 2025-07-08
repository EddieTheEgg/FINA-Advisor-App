import {useInfiniteQuery} from '@tanstack/react-query';
import { getUserAccountTransactionHistory } from '../api/api';
import { AccountTransactionsResponse } from '../types';

const LIMIT = 10;

export const useAccountTransactionHistory = (accountId: string) => {
    const {data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, error} = useInfiniteQuery({
        queryKey: ['account-transactions', accountId],
        initialPageParam: 0,
        queryFn: ({pageParam}) => getUserAccountTransactionHistory({accountId, pageParam, limit: LIMIT}),
        getNextPageParam: (lastPage : AccountTransactionsResponse) => lastPage.next_page,
        staleTime: 1000 * 60 * 5, //5 minutes
    });

    return {data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, error};
};
