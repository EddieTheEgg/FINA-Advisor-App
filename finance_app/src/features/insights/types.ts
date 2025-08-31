import { CategoryResponse } from '../transaction/types';

// Types for insight screen
export enum KeyInsightsStatus {
    POSITIVE = 'POSITIVE',
    NEGATIVE = 'NEGATIVE',
    WARNING = 'WARNING',
    NEUTRAL = 'NEUTRAL',
}

export enum TipDifficulty {
    EASY = 'EASY',
    MEDIUM = 'MEDIUM',
    HARD = 'HARD',
    UNKNOWN = 'UNKNOWN',
}

export enum BudgetAnalysisPriority {
    HIGH = 'HIGH',
    MEDIUM = 'MEDIUM',
    LOW = 'LOW',
    UNKNOWN = 'UNKNOWN',
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



export type AISmartSavingTipResponse = {
    tipId: string;
    title: string;
    description: string;
    potentialSavings: number;
    timeframe: string;
    category: string | null;
    difficulty: TipDifficulty;
    confidence: number;
    clientReference: string | null;
};

export type AIBudgetAnalysisResponse = {
    analysisId: string;
    title: string;
    analysis: string;
    timeframe: string;
    budgetCategory: string | null;
    priority: BudgetAnalysisPriority;
    confidence: number;
    recommendations: string[];
};
