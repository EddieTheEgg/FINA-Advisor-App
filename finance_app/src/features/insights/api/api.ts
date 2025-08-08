import axios from 'axios';
import api from '../../../api/axios';
import { KeyInsightsResponse, AISmartSavingTipResponse } from '../types';

export const getInsightsData = async (): Promise<KeyInsightsResponse> => {
    try {
        const response = await api.get('/insights/monthly-insights');
        const insightsData = response.data;
        return {
            monthlyFinancialHealth: {
                analysisDetail: insightsData.monthly_financial_health.analysis_detail,
                icon: insightsData.monthly_financial_health.icon,
                status: insightsData.monthly_financial_health.status,
                income: insightsData.monthly_financial_health.income,
                expense: insightsData.monthly_financial_health.expense,
                netSaved: insightsData.monthly_financial_health.net_saved,
            },
            monthlySavingsRate: {
                status: insightsData.monthly_savings_rate.status,
                savingsAnalysis: insightsData.monthly_savings_rate.savings_analysis,
                icon: insightsData.monthly_savings_rate.icon,
                percentageSavings: insightsData.monthly_savings_rate.percentage_savings,
            },
            monthlyTopSpendingCategory: insightsData.monthly_top_spending_category ? {
                status: insightsData.monthly_top_spending_category.status,
                category: {
                    categoryId: insightsData.monthly_top_spending_category.category.category_id,
                    categoryName: insightsData.monthly_top_spending_category.category.category_name,
                    icon: insightsData.monthly_top_spending_category.category.icon,
                    color: insightsData.monthly_top_spending_category.category.color,
                    transactionType: insightsData.monthly_top_spending_category.category.transaction_type,
                    isCustom: insightsData.monthly_top_spending_category.category.is_custom,
                    categoryDescription: insightsData.monthly_top_spending_category.category.category_description,
                    createdAt: insightsData.monthly_top_spending_category.category.created_at,
                    updatedAt: insightsData.monthly_top_spending_category.category.updated_at,
                },
                totalSpent: insightsData.monthly_top_spending_category.total_spent,
                percentageSpent: insightsData.monthly_top_spending_category.percentage_spent,
            } : null,
            monthlySpendingTrend: {
                status: insightsData.monthly_spending_trend.status,
                currentMonthSpending: insightsData.monthly_spending_trend.current_month_spending,
                previousMonthSpending: insightsData.monthly_spending_trend.previous_month_spending,
                spendingTrendPercentage: insightsData.monthly_spending_trend.spending_trend_percentage,
                icon: insightsData.monthly_spending_trend.icon,
            },
        };
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            throw new Error('Insights data not found');
        }
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            throw new Error('Unauthorized access to fetch insight data');
        }
        if (axios.isAxiosError(error) && error.response?.status === 500) {
            throw new Error('Server error while fetching insight data');
        }
        throw new Error('Failed to fetch insight data');
    }
};

export const getAIInsightsData = async (clientReference?: string): Promise<AISmartSavingTipResponse> => {
    try {
        const response = await api.get('/ai/smart-saving-tip/auto', {
            params: clientReference ? { client_reference: clientReference } : {},
        });
        const aiData = response.data;
        return {
            tipId: aiData.tip_id,
            title: aiData.title,
            description: aiData.description,
            potentialSavings: aiData.potential_savings,
            timeframe: aiData.timeframe,
            category: aiData.category || null,
            difficulty: aiData.difficulty,
            confidence: aiData.confidence,
            clientReference: aiData.client_reference || null,
        };
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            throw new Error('AI insights data not found');
        }
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            throw new Error('Unauthorized access to fetch AI insight data');
        }
        if (axios.isAxiosError(error) && error.response?.status === 500) {
            throw new Error('Server error while fetching AI insight data');
        }
        throw new Error('Failed to fetch AI insight data');
    }
};
