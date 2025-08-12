import { useInfiniteQuery } from '@tanstack/react-query';
import { getUnBudgetedCategories } from '../api/api';

type UseGetUnBudgetedCategoriesProps = {
    monthDate: Date;
}

const LIMIT = 10;

export const useGetUnBudgetedCategories = ({monthDate} : UseGetUnBudgetedCategoriesProps) => {
    const {data, isPending, error, fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery({
        initialPageParam: 0,
        queryKey: ['unbudgeted-categories', monthDate],
        queryFn: ({pageParam = 0}) => getUnBudgetedCategories({skip: pageParam, limit: LIMIT, monthDate}),
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
        getNextPageParam: (lastPage) => {
            return lastPage?.hasNext ?
            lastPage.currentPage * lastPage.pageSize : undefined;
        },
    });

    return {data, isPending, error, fetchNextPage, hasNextPage, isFetchingNextPage};
};
