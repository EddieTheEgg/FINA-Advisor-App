import { useQuery } from '@tanstack/react-query';
import { getAIInsightsData } from '../api/api';

export const useGetAIInsights = (clientReference?: string) => {
    const { data, isPending, error } = useQuery({
        queryKey: ['ai-insights', clientReference],
        queryFn: () => getAIInsightsData(clientReference),
        staleTime: 1000 * 60 * 10, // 10 minute, ai insights can be cached longer
    });

    return { data, isPending, error };
};
