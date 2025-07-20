import { create } from 'zustand';


type CreateTransactionListState = {
    transactionListType : 'ALL' | 'INCOME' | 'EXPENSE' | 'TRANSFER';
    setTransactionListType : (transactionListType : 'ALL' | 'INCOME' | 'EXPENSE' | 'TRANSFER') => void;
};


const initialState = {
    transactionListType: 'ALL' as const,
};



export const useCreateTransactionListStore = create<CreateTransactionListState>((set) => ({
    ...initialState,
    setTransactionListType: (transactionListType: 'ALL' | 'INCOME' | 'EXPENSE' | 'TRANSFER') =>
        set({ transactionListType: transactionListType }),
}));

