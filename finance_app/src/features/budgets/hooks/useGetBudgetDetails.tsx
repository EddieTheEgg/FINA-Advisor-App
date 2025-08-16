import { useQuery } from '@tanstack/react-query';
import { getBudgetDetails } from '../api/api';

export const useGetBudgetDetails = (budgetId: string, monthDate: Date) => {
    const {data, isPending, error} = useQuery({
        queryKey: ['budget-details', budgetId, monthDate],
        queryFn: () => getBudgetDetails(budgetId, monthDate),
        staleTime: 1000 * 60 * 5, //5 minutes, but might need to update when transacitons are manipulated and connected to this budget
    });

    return {data, isPending, error};
};
