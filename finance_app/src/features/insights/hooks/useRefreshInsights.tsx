import { useState, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export const useRefreshInsights = () => {
    const queryClient = useQueryClient();
    const [isOnCooldown, setIsOnCooldown] = useState(false);
    const [cooldownTimeLeft, setCooldownTimeLeft] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const refreshInsights = useCallback(async () => {
        if (isOnCooldown) {
            return;
        }

        try {
            if (__DEV__) {
            console.log('🔄 Starting insights refresh...');
            }
            setIsRefreshing(true);

            // Force complete refresh of all insights-related queries
            // First invalidate everything
            await queryClient.invalidateQueries({ queryKey: ['insights'] });
            await queryClient.invalidateQueries({ queryKey: ['ai-insights'] });
            await queryClient.invalidateQueries({ queryKey: ['ai-budget-analysis'] });

            // Then remove from cache to force fresh fetch
            queryClient.removeQueries({ queryKey: ['insights', 'monthly'] });
            queryClient.removeQueries({ queryKey: ['ai-insights'] });
            queryClient.removeQueries({ queryKey: ['ai-budget-analysis'] });

            // Force immediate refetch
            await Promise.all([
                queryClient.prefetchQuery({
                    queryKey: ['insights', 'monthly'],
                    queryFn: () => import('../api/api').then(api => api.getInsightsData()),
                }),
                queryClient.prefetchQuery({
                    queryKey: ['ai-insights', undefined],
                    queryFn: () => import('../api/api').then(api => api.getAIInsightsData()),
                }),
                queryClient.prefetchQuery({
                    queryKey: ['ai-budget-analysis'],
                    queryFn: () => import('../api/api').then(api => api.getAIBudgetAnalysisData()),
                }),
            ]);

            if (__DEV__) {
            console.log('✅ All insights queries refreshed successfully');
            }

            // Start cooldown
            setIsOnCooldown(true);
            setCooldownTimeLeft(60);
            setIsRefreshing(false);

            // Countdown timer
            const interval = setInterval(() => {
                setCooldownTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        setIsOnCooldown(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

        } catch (error) {
            if (__DEV__) {
            console.error('Error refreshing insights:', error);
            }
            // Reset states on error
            setIsOnCooldown(false);
            setCooldownTimeLeft(0);
            setIsRefreshing(false);
        }
    }, [isOnCooldown, queryClient]);

    return {
        refreshInsights,
        isOnCooldown,
        cooldownTimeLeft,
        isRefreshing,
    };
};
