import { useQuery } from '@tanstack/react-query';
import { getUserGroupedAccounts } from '../api/api';

export const useGroupAccounts = () => {
    const {data, isPending, error} = useQuery({
        queryKey: ['grouped-accounts'],
        queryFn: () => getUserGroupedAccounts(),
        staleTime: 1000 * 60 * 5, //5 minutes
    });

    return {data, isPending, error};
};
