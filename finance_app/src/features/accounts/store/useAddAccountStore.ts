import { create } from 'zustand';
import { AccountType, AccountResponse } from '../types';

type AddAccountState = {
    accountType: AccountType;
    accountName: string;
    accountBank: string | null;
    accountBalance: number;
    creditLimit: number | null;
    accountNumber: string | null;
    routingNumber: string | null;
    allAccounts: AccountResponse[]; // List of all user accounts for validation

    setAccountName: (accountName: string) => void;
    setAccountType: (accountType: AccountType) => void;
    setAccountBank: (accountBank: string) => void;
    setAccountBalance: (accountBalance: number) => void;
    setCreditLimit: (creditLimit: number | null) => void;
    setAccountNumber: (accountNumber: string | null) => void;
    setRoutingNumber: (routingNumber: string | null) => void;
    initializeAllAccounts: (accounts: AccountResponse[]) => void;

    //Validations
    validateAccountName: () => boolean;
    accountNameError: string | null;

    //When switching between account types, we need to reset the input fields
    resetAccountDetailsExceptType: () => void;

}

const initialAddAccountState = {
    accountName: '',
    accountType: AccountType.CHECKING,
    accountBank: null,
    accountBalance: 0,
    creditLimit: null,
    accountNumber: null,
    routingNumber: null,
    allAccounts: [],
    accountNameError: null,
};



export const useAddAccountStore = create<AddAccountState>((set, get) => ({
    ...initialAddAccountState,

    setAccountName: (accountName: string) => set({ accountName }),
    setAccountType: (accountType: AccountType) => set({ accountType }),
    setAccountBank: (accountBank: string) => set({ accountBank }),
    setAccountBalance: (accountBalance: number) => set({ accountBalance }),
    setCreditLimit: (creditLimit: number | null) => set({ creditLimit }),
    setAccountNumber: (accountNumber: string | null) => set({ accountNumber }),
    setRoutingNumber: (routingNumber: string | null) => set({ routingNumber }),
    initializeAllAccounts: (accounts: AccountResponse[]) => set({ allAccounts: accounts }),

    validateAccountName: () => {
        const { accountName, allAccounts } = get();

        if (accountName.trim() === '') {
            set({accountNameError: 'Account name is required'});
            return false;
        }

        // Check for minimum length
        if (accountName.trim().length < 2) {
            set({accountNameError: 'Account name must be at least 2 characters long'});
            return false;
        }

        // Check for maximum length 
        if (accountName.trim().length > 20) {
            set({accountNameError: 'Account name cannot exceed 20 characters'});
            return false;
        }

        // Check for duplicate names within the same account type (case-insensitive)
        const existingAccount = allAccounts.find(account =>
            account.name.toLowerCase() === accountName.trim().toLowerCase() &&
            account.accountType === get().accountType
        );

        if (existingAccount) {
            set({accountNameError: 'An account with this name already exists for this account type'});
            return false;
        }

        set({accountNameError: null});
        return true;
    },

    resetAccountDetailsExceptType: () => set((state) => ({
        ...initialAddAccountState,
        accountType: state.accountType,
    })),
}));
