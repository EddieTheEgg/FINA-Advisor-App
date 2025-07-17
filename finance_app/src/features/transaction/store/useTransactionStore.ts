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
    date: Date;
    merchant: string | null;
    location: string | null;
    notes: string | null;
    recurringTransaction: boolean;
    recurringTransactionFrequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY' | null;
    recurringTransactionStartDate: Date | null;
    recurringTransactionEndDate: Date | null;

    setTransactionType : (transactionType : 'INCOME' | 'EXPENSE' | 'TRANSFER') => void;
    setSourceAccount : (sourceAccount : AccountResponse) => void;
    setAmount : (amount : number) => void;
    setAmountError: (error: string) => void;
    setSelectedCategory : (selectedCategory : CategoryResponse | null) => void;
    setTitle: (title: string) => void;
    setDate: (date: Date) => void;
    setMerchant: (merchant: string | null) => void;
    setLocation: (location: string | null) => void;
    setNotes: (notes: string | null) => void;
    setRecurringTransaction: (recurringTransaction: boolean) => void;
    setRecurringTransactionFrequency: (recurringTransactionFrequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY' | null) => void;
    setRecurringTransactionStartDate: (recurringTransactionStartDate: Date | null) => void;
    setRecurringTransactionEndDate: (recurringTransactionEndDate: Date | null) => void;

    // Validation errors
    recurringTransactionError: string;

    // Validation functions
    validateAmount : (amount : number) => boolean;
    validateRecurringTransaction : () => boolean;
};

const initialState = {
    transactionType: 'EXPENSE' as const,
    sourceAccount: null,
    amount: 0.00,
    amountError: '',
    selectedCategory: null,
    title: '',
    date: new Date(),
    merchant: null,
    location: null,
    notes: null,
    recurringTransaction: false,
    recurringTransactionFrequency: null,
    recurringTransactionStartDate: null,
    recurringTransactionEndDate: null,

    // Validation errors
    recurringTransactionError: '',
};

export const useCreateTransactionStore = create<CreateTransactionState>((set, get) => ({
    ...initialState,

    setTransactionType: (transactionType) => set({transactionType: transactionType }),
    setSourceAccount: (sourceAccount) => set({sourceAccount: sourceAccount}),
    setAmount: (amount) => set({amount: amount}),
    setAmountError: (error) => set({ amountError: error }),
    setSelectedCategory: (selectedCategory) => set({selectedCategory: selectedCategory}),
    setTitle: (title) => set({title: title}),
    setDate: (date) => set({date: date}),
    setMerchant: (merchant) => set({merchant: merchant}),
    setLocation: (location) => set({location: location}),
    setNotes: (notes) => set({notes: notes}),
    setRecurringTransaction: (recurringTransaction) => set({recurringTransaction: recurringTransaction}),
    setRecurringTransactionFrequency: (recurringTransactionFrequency) => set({recurringTransactionFrequency: recurringTransactionFrequency}),
    setRecurringTransactionStartDate: (recurringTransactionStartDate) => set({recurringTransactionStartDate: recurringTransactionStartDate}),
    setRecurringTransactionEndDate: (recurringTransactionEndDate) => set({recurringTransactionEndDate: recurringTransactionEndDate}),

    validateAmount: () => {
        const {amount} = get();

        if (amount <= 0.00) {
            set({ amountError: 'Transaction amount must be greater than 0' });
            return false;
        }

        set({amountError: ''});
        return true;
    },

    validateRecurringTransaction: () => {
        const {recurringTransactionStartDate, recurringTransactionEndDate} = get();

        if (recurringTransactionStartDate && recurringTransactionEndDate && recurringTransactionStartDate > recurringTransactionEndDate) {
            set({recurringTransactionError: 'Start date must be before end date'});
            return false;
        }

        set({recurringTransactionError: ''});
        return true;
    },
}));
