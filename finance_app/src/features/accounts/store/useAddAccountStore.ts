import { create } from "zustand";
import { AccountType } from "../types";

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
};



export const useAddAccountStore = create<AddAccountState>((set) => ({
    ...initialAddAccountState,

    setAccountName: (accountName: string) => set({ accountName }),
    setAccountType: (accountType: AccountType) => set({ accountType }),
    setAccountBank: (accountBank: string) => set({ accountBank }),
    setAccountBalance: (accountBalance: number) => set({ accountBalance }),
    setCreditLimit: (creditLimit: number | null) => set({ creditLimit }),
    setAccountNumber: (accountNumber: string | null) => set({ accountNumber }),
    setRoutingNumber: (routingNumber: string | null) => set({ routingNumber }),

    resetAccountDetailsExceptType: () => set((state) => ({
        ...initialAddAccountState,
        accountType: state.accountType,
    })),
}));
