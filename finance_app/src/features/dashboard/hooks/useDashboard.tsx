import { getDashboard } from '../api/api';
import { useQuery } from '@tanstack/react-query';

export const useDashboardQuery = (month: number, year: number) => {
    const {data, isPending, error} = useQuery({
        queryKey: ['dashboard', month, year],
        queryFn: () => getDashboard({month, year}),
    });

    return {data, isPending, error};
};
