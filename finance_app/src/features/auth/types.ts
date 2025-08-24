export type Token = {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
}

export type EmailAvailabilityResponse = {
    available: boolean;
    message: string;
}

// Account types for registration flow
export enum AccountType {
    CHECKING = 'checking',
    SAVINGS = 'savings',
    CREDIT_CARD = 'credit_card',
    INVESTMENT = 'investment',
    LOAN = 'loan',
    CASH = 'cash',
    OTHER = 'other'
}

export const ACCOUNT_TYPE_COLORS = {
    [AccountType.CHECKING]: '#10B981',    // Green (banking)
    [AccountType.SAVINGS]: '#059669',     // Darker green (saving money)
    [AccountType.CREDIT_CARD]: '#DC2626', // Red (debt/credit)
    [AccountType.INVESTMENT]: '#8B5CF6',  // Purple (growth/future)
    [AccountType.LOAN]: '#F59E0B',        // Orange (debt/payments)
    [AccountType.CASH]: '#F59E0B',        // Yellow/Orange (physical money)
    [AccountType.OTHER]: '#6B7280',        // Gray (neutral)
} as const;

export const ACCOUNT_TYPE_ICONS = {
    [AccountType.CHECKING]: '🏦',
    [AccountType.SAVINGS]: '💰',
    [AccountType.CREDIT_CARD]: '💳',
    [AccountType.INVESTMENT]: '📈',
    [AccountType.LOAN]: '🏠',
    [AccountType.CASH]: '💵',
    [AccountType.OTHER]: '📋',
} as const;

// Account setup data for registration
export type AccountSetupData = {
    accountType: AccountType;
    accountName: string;
    balance: number;
    color?: string;
    icon?: string;
}

