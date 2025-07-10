import { create } from 'zustand';

type CreateTransactionState = {
    transactionType: 'INCOME' | 'EXPENSE' | 'TRANSFER';

    setTransactionType : (transactionType : 'INCOME' | 'EXPENSE' | 'TRANSFER') => void;
};

const initialState = {
    transactionType: 'EXPENSE' as const,
};



export const useCreateTransactionStore = create<CreateTransactionState>((set) => ({
    ...initialState,

    setTransactionType: (transactionType) => set({transactionType: transactionType }),

}));
