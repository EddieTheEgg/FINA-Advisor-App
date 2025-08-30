import { create } from 'zustand';
import { AccountResponse, AccountType } from '../types';

type EditAccountState = {
    originalAccountName: string;
    originalAccountType: AccountType;

    accountId: string;
    accountNameDraft: string;
    accountBankNameDraft: string;
    accountBalanceDraft: number;
    creditLimitDraft: number | null;
    accountNumberDraft: string | null;
    routingNumberDraft: string | null;
    allAccounts: AccountResponse[]; //List of all existing accounts for the user

    setAccountNameDraft: (name: string) => void;
    setAccountBankNameDraft: (bankName: string) => void;
    setAccountBalanceDraft: (balance: number) => void;
    setCreditLimitDraft: (creditLimit: number) => void;
    setAccountNumberDraft: (accountNumber: string) => void;
    setRoutingNumberDraft: (routingNumber: string) => void;

    initializeAllAccounts: (accounts: AccountResponse[]) => void;
    initializeEditAccount: (accountDetails: AccountResponse) => void;

    validateAccountName: () => boolean;
    accountNameError: string | null;

    validateCreditLimit: () => boolean;
    creditLimitError: string | null;

    resetToInitialState: () => void;
};


const initialEditAccountState = {
    originalAccountName: '',
    originalAccountType: AccountType.CHECKING,

    accountId: '',
    accountNameDraft: '',
    accountBankNameDraft: '',
    accountBalanceDraft: 0,
    creditLimitDraft: 0,
    accountNumberDraft: '',
    routingNumberDraft: '',
    allAccounts: [],
    accountNameError: null,
    creditLimitError: null,
};


export const useEditAccountStore = create<EditAccountState>((set, get) => ({
    ...initialEditAccountState,

    setOriginalAccountName: (name: string) => set({ originalAccountName: name }),
    setOriginalAccountType: (type: AccountType) => set({ originalAccountType: type }),

    setAccountNameDraft: (name: string) => set({ accountNameDraft: name }),
    setAccountBankNameDraft: (bankName: string) => set({ accountBankNameDraft: bankName }),
    setAccountBalanceDraft: (balance: number) => set({ accountBalanceDraft: balance }),
    setCreditLimitDraft: (creditLimit: number) => set({ creditLimitDraft: creditLimit }),
    setAccountNumberDraft: (accountNumber: string) => set({ accountNumberDraft: accountNumber }),
    setRoutingNumberDraft: (routingNumber: string) => set({ routingNumberDraft: routingNumber }),

    initializeAllAccounts: (accounts: AccountResponse[]) => set({ allAccounts: accounts }),


    initializeEditAccount: (accountDetails: AccountResponse) => set({
        originalAccountName: accountDetails.name,
        originalAccountType: accountDetails.accountType,

        accountId: accountDetails.accountId,
        accountNameDraft: accountDetails.name,
        accountBankNameDraft: accountDetails.bankName || '',
        accountBalanceDraft: accountDetails.balance,
        creditLimitDraft: accountDetails.creditLimit || null,
        accountNumberDraft: accountDetails.accountNumber || null,
        routingNumberDraft: accountDetails.routingNumber || null,
    }),

    validateAccountName: () => {
        const { accountNameDraft, allAccounts, originalAccountType, originalAccountName } = get();

        if (accountNameDraft.trim() === '') {
            set({accountNameError: 'Account name is required'});
            return false;
        }

        // Check for minimum length
        if (accountNameDraft.trim().length < 2) {
            set({accountNameError: 'Account name must be at least 2 characters long'});
            return false;
        }

        // Check for maximum length
        if (accountNameDraft.trim().length > 20) {
            set({accountNameError: 'Account name cannot exceed 20 characters'});
            return false;
        }

        // Check for duplicate names within the same account type (case-insensitive)
        const existingAccount = allAccounts.find(account =>
            account.name.toLowerCase() === accountNameDraft.trim().toLowerCase() &&
            account.accountType === originalAccountType
        );

        if (existingAccount && existingAccount.name.toLowerCase() !== originalAccountName.toLowerCase()) {
            set({accountNameError: 'An account with this name already exists for this account type'});
            return false;
        }

        set({accountNameError: null});
        return true;
    },

    validateCreditLimit: () => {
        const { creditLimitDraft, accountBalanceDraft } = get();

        // Only validate if credit limit is set
        if (creditLimitDraft && creditLimitDraft > 0) {
            // Check if debt (negative balance) exceeds credit limit
            if (accountBalanceDraft < 0 && Math.abs(accountBalanceDraft) > creditLimitDraft) {
                set({creditLimitError: 'Your credit balance spending is greater than your credit limit'});
                return false;
            }
        }

        set({creditLimitError: null});
        return true;
    },

    resetToInitialState: () => set(initialEditAccountState),
}));

