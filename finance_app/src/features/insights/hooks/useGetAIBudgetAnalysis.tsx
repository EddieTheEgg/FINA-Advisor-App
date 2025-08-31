import { useQuery } from '@tanstack/react-query';
import { getAIBudgetAnalysisData } from '../api/api';

export const useGetAIBudgetAnalysis = () => {
    const { data, isPending, error } = useQuery({
        queryKey: ['ai-budget-analysis'],
        queryFn: () => getAIBudgetAnalysisData(),
        staleTime: 1000 * 60 * 10, // 10 minutes, ai budget analysis can be cached longer
    });

    return { data, isPending, error };
};
