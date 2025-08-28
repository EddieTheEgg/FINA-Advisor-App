import { create } from 'zustand';
import { AccountType } from '../types';

type AddAccountState = {
    accountType: AccountType;
    accountName: string;
    accountBank: string | null;
    accountBalance: number;
    creditLimit: number | null;
    accountNumber: string | null;
    routingNumber: string | null;

    setAccountName: (accountName: string) => void;
    setAccountType: (accountType: AccountType) => void;
    setAccountBank: (accountBank: string) => void;
    setAccountBalance: (accountBalance: number) => void;
    setCreditLimit: (creditLimit: number | null) => void;
    setAccountNumber: (accountNumber: string | null) => void;
    setRoutingNumber: (routingNumber: string | null) => void;

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

    validateAccountName: () => {
        const accountName = get().accountName;
        if (accountName.length <= 0) {
            set({accountNameError: 'Account name is required'});
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
