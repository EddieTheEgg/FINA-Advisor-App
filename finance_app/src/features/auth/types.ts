export type Token = {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
}

export type EmailAvailabilityResponse = {
    available: boolean;
    message: string;
}

export type PasswordValidationRequest = {
    password: string;
}

export type PasswordValidationResponse = {
    is_valid: boolean;
}

export type UpdatePasswordRequest = {
    current_password: string;
    new_password: string;
    new_password_confirm: string;
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



//Request to the backend when creating an account
export type UserInformation = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    username: string | null;
}

export type AccountInformation = {
    account_name: string;
    account_type: AccountType;
    balance: number;
    credit_limit: number | null;
    bank_name: string | null;
    account_number: string | null;
    routing_number: string | null;
}


//Create account request
export type CreateAccountRequest = {
    user_information: UserInformation;
    account_information: AccountInformation;
};


