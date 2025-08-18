import { useInfiniteQuery } from '@tanstack/react-query';
import { getSettingsCategories } from '../api/api';


type useGetSettingsCategoriesProps = {
    transactionType : 'INCOME' | 'EXPENSE' | 'TRANSFER';
}

const LIMIT = 10;

export const useGetSettingsCategories = ({transactionType} : useGetSettingsCategoriesProps) => {
    const {data, isPending, hasNextPage, fetchNextPage, isFetchingNextPage, error} = useInfiniteQuery({
        queryKey: ['get-settings-categories', transactionType],
        initialPageParam: 0,
        queryFn: ({pageParam = 0}) =>
            getSettingsCategories({skip: pageParam, limit: LIMIT, transactionType: transactionType}),
        getNextPageParam: (lastPage) => {
            // Return the next skip value to offset the backend query by, not the page number (though name is pageParam)
            return lastPage?.hasNext
                ? lastPage.currentPage * lastPage.pageSize
                : undefined;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    return {data, isPending, hasNextPage, fetchNextPage, isFetchingNextPage, error};
};
