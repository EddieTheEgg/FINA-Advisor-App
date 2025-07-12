import { create } from 'zustand';
import { AccountResponse } from '../../accounts/types';

type CreateTransactionState = {
    transactionType: 'INCOME' | 'EXPENSE' | 'TRANSFER';
    sourceAccount : AccountResponse | null;


    setTransactionType : (transactionType : 'INCOME' | 'EXPENSE' | 'TRANSFER') => void;
    setSourceAccount : (sourceAccount : AccountResponse) => void;
};

const initialState = {
    transactionType: 'EXPENSE' as const,
    sourceAccount: null,
};



export const useCreateTransactionStore = create<CreateTransactionState>((set) => ({
    ...initialState,

    setTransactionType: (transactionType) => set({transactionType: transactionType }),
    setSourceAccount: (sourceAccount) => set({sourceAccount: sourceAccount}),

}));
