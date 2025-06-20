//Types for the accounts list screen
export enum AccountType {
    CHECKING = 'checking',
    SAVINGS = 'savings',
    CREDIT_CARD = 'credit_card',
    INVESTMENT = 'investment',
    LOAN = 'loan',
    CASH = 'cash',
    OTHER = 'other'
}

export type AccountResponse = {
    accountId: string;
    name: string;
    accountType: AccountType;
    balance: number;
    color: string;
    icon: string | null;
    isDefault: boolean;
    includeInTotals: boolean;
    isActive: boolean;
    bankName: string | null;
    accountNumber: string | null;
    routingNumber: string | null;
}


export type AccountGroup = {
    accountGroupsData: Record<string, AccountResponse[]>;
}

