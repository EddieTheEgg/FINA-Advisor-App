import { create } from 'zustand';
import { AccountResponse } from '../../accounts/types';
import { CategoryResponse } from '../types';

type CreateTransactionState = {
    transactionType: 'INCOME' | 'EXPENSE' | 'TRANSFER';
    sourceAccount : AccountResponse | null;
    amount : number;
    amountError: string,
    selectedCategory: CategoryResponse | null,
    title : string,


    setTransactionType : (transactionType : 'INCOME' | 'EXPENSE' | 'TRANSFER') => void;
    setSourceAccount : (sourceAccount : AccountResponse) => void;
    setAmount : (amount : number) => void;
    setAmountError: (error: string) => void;
    setSelectedCategory : (selectedCategory : CategoryResponse | null) => void;
    setTitle: (title: string) => void;


    validateAmount : (amount : number) => boolean;
};

const initialState = {
    transactionType: 'EXPENSE' as const,
    sourceAccount: null,
    amount: 0.00,
    amountError: '',
    selectedCategory: null,
    title: '',
};



export const useCreateTransactionStore = create<CreateTransactionState>((set, get) => ({
    ...initialState,

    setTransactionType: (transactionType) => set({transactionType: transactionType }),
    setSourceAccount: (sourceAccount) => set({sourceAccount: sourceAccount}),
    setAmount: (amount) => set({amount: amount}),
    setAmountError: (error) => set({ amountError: error }),
    setSelectedCategory: (selectedCategory) => set({selectedCategory: selectedCategory}),
    setTitle: (title) => set({title: title}),

    validateAmount: () => {
        const {amount} = get();

        if (amount <= 0.00) {
            set({ amountError: 'Transaction amount must be greater than 0' });
            return false;
        }

        set({amountError: ''});
        return true;
    },
}));
