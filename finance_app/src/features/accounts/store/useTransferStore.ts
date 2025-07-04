import { create } from 'zustand';
import { AccountResponse } from '../types';

type TransferState = {
  // Transfer data
  fromAccount: AccountResponse | null;
  toAccount: AccountResponse | null;
  amount: number;
  title: string;
  note: string;
  location: string;
  amountError: string;

  // Actions
  setFromAccount: (account: AccountResponse | null) => void;
  setToAccount: (account: AccountResponse | null) => void;
  setAmount: (amount: number) => void;
  setTitle: (title: string) => void;
  setNote: (note: string) => void;
  setLocation: (location: string) => void;
  setAmountError: (error: string) => void;

  // Utility actions
  resetTransfer: () => void;
  validateAmount: () => boolean;
}

const initialState = {
  fromAccount: null,
  toAccount: null,
  amount: 0.00,
  title: '',
  note: '',
  location: '',
  amountError: '',
  allAccounts: [],
  availableAccounts: [],
};

//Zustand store for client state management on transfer screen
export const useTransferStore = create<TransferState>((set, get) => ({
  ...initialState,

  setFromAccount: (account) => set({ fromAccount: account }),
  setToAccount: (account) => set({ toAccount: account }),
  setAmount: (amount) => set({ amount : amount }),
  setTitle: (title) => set({ title : title }),
  setNote: (note) => set({ note : note }),
  setLocation: (location) => set({ location : location }),
  setAmountError: (error) => set({ amountError: error }),

  resetTransfer: () => set(initialState),

  validateAmount: () => {
    const { amount, fromAccount, toAccount } = get();

    if (!fromAccount || !toAccount) {
      set({ amountError: 'You need to choose a source and destination account for the transfer!' });
      return false;
    }

    if (fromAccount.accountId === toAccount.accountId) {
      set({ amountError: 'Can\'t transfer money from and to the same account!' });
      return false;
    }

    if (amount <= 0) {
      set({ amountError: 'Transfer amount must be greater than 0' });
      return false;
    }

    if (amount > fromAccount.balance) {
      set({ amountError: 'Insufficient funds from source account!' });
      return false;
    }

    set({ amountError: '' });
    return true;
  },
}));
