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


export type GroupedAccountsResponse = {
    totalNet : number;
    accountGroupsData: Record<string, AccountResponse[]>;
}


//Types for the backend
export type BackendAccountResponse = {
    account_id: string;
    name: string;
    account_type: AccountType;
    balance: number;
    color: string;
    icon: string | null;
    is_default: boolean;
    include_in_totals: boolean;
    is_active: boolean;
    bank_name: string | null;
    account_number: string | null;
    routing_number: string | null;
}
