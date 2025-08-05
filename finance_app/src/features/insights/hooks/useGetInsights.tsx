import { useQuery } from '@tanstack/react-query';
import { getInsightsData } from '../api/api';

export const useGetInsights = () => {
    const {data, isPending, error} = useQuery({
        queryKey: ['getInsights'],
        queryFn: getInsightsData,
    });

    return {data, isPending, error};
};



