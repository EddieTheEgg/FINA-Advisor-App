import { useQuery } from '@tanstack/react-query';
import { getInsightsData } from '../api/api';

export const useGetInsights = () => {
    const { data, isPending, error } = useQuery({
        queryKey: ['insights', 'monthly'],
        queryFn: () => getInsightsData(),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    return { data, isPending, error };
};
