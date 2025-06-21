import { useQuery } from '@tanstack/react-query';
import { getUserGroupedAccounts } from '../api/api';

export const useGroupAccounts = () => {
    const {data, isPending, error} = useQuery({
        queryKey: ['grouped-accounts'],
        queryFn: () => getUserGroupedAccounts(),
    });

    return {data, isPending, error};
};
