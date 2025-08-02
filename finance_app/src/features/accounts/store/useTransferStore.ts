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
  titleError: string;
  transferError: string;
  isTransferProcessing: boolean;
  openTransferSuccessModal: boolean;

  // Actions
  setFromAccount: (account: AccountResponse | null) => void;
  setToAccount: (account: AccountResponse | null) => void;
  setAmount: (amount: number) => void;
  setTitle: (title: string) => void;
  setNote: (note: string) => void;
  setLocation: (location: string) => void;
  setAmountError: (error: string) => void;
  setTitleError: (error: string) => void;
  setTransferError: (error: string) => void;
  setIsTransferProcessing: (isProcessing: boolean) => void;

  // Utility actions
  resetTransfer: () => void;
  validateTransfer: () => boolean;
  setOpenTransferSuccessModal: (open: boolean) => void;
}

const initialState = {
  fromAccount: null,
  toAccount: null,
  amount: 0.00,
  title: '',
  note: '',
  location: '',
  amountError: '',
  titleError: '',
  transferError: '',
  isTransferProcessing: false,
  allAccounts: [],
  availableAccounts: [],
  openTransferSuccessModal: false,
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
  setTitleError: (error) => set({titleError: error}),
  setTransferError: (error) => set({ transferError: error }),
  setIsTransferProcessing: (isProcessing) => set({ isTransferProcessing: isProcessing }),
  setOpenTransferSuccessModal: (open) => set({ openTransferSuccessModal: open }),
  resetTransfer: () => set(initialState),

  validateTransfer: () => {
    const { amount, title, fromAccount, toAccount } = get();

    if (!fromAccount || !toAccount) {
      set({ amountError: 'You need to choose a source and destination account for the transfer' });
      return false;
    }

    if (fromAccount.accountId === toAccount.accountId) {
      set({ amountError: 'Can\'t transfer money from and to the same account' });
      return false;
    }

    if (amount <= 0) {
      set({ amountError: 'Transfer amount must be greater than 0' });
      return false;
    }

    if (amount > fromAccount.balance) {
      set({ amountError: 'Insufficient funds from source account' });
      return false;
    }

    if (title === '') {
      set({amountError: 'Transfer title is required'});
      return false;
    }

    set({ amountError: '' });
    return true;
  },
}));
