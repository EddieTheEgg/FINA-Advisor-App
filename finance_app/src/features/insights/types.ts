import { CategoryResponse } from '../transaction/types';

// Types for insight screen
export enum KeyInsightsStatus {
    POSITIVE = 'POSITIVE',
    NEGATIVE = 'NEGATIVE',
    WARNING = 'WARNING',
    NEUTRAL = 'NEUTRAL',
}

export type MonthlyFinancialHealthResponse = {
    analysisDetail: string;
    icon: string;
    status: KeyInsightsStatus;
    income: number;
    expense: number;
    netSaved: number;
};

export type MonthlySavingsRateResponse = {
    status: KeyInsightsStatus;
    savingsAnalysis: string;
    icon: string;
    percentageSavings: number;
}


export type MonthlyTopSpendingCategoryResponse = {
    status: KeyInsightsStatus;
    category: CategoryResponse;
    totalSpent: number;
    percentageSpent: number;
}

export type MonthlySpendingTrend = {
    status: KeyInsightsStatus;
    currentMonthSpending: number;
    previousMonthSpending: number;
    spendingTrendPercentage: number;
    icon: string;
}



export type KeyInsightsResponse = {
    monthlyFinancialHealth: MonthlyFinancialHealthResponse;
    monthlySavingsRate: MonthlySavingsRateResponse;
    monthlyTopSpendingCategory: MonthlyTopSpendingCategoryResponse | null;
    monthlySpendingTrend: MonthlySpendingTrend;
}


