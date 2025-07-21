import { create } from 'zustand';


type CreateTransactionListState = {
    transactionListType : 'ALL' | 'INCOME' | 'EXPENSE' | 'TRANSFER';

    date: Date; //In the format #YYYY-MM-01

    monthIncome : number;
    monthExpense : number;
    monthTransfer : number;


    setTransactionListType : (transactionListType : 'ALL' | 'INCOME' | 'EXPENSE' | 'TRANSFER') => void;
    setDate : (newDate : Date) => void;
    setMonthIncome : (monthIncome : number) => void;
    setMonthExpense : (monthExpense : number) => void;
    setMonthTransfer : (monthTransfer : number) => void;
};


const initialState = {
    transactionListType: 'ALL' as const,
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 1), //In the format #YYYY-MM-01

    monthIncome: 0,
    monthExpense: 0,
    monthTransfer: 0,
};



export const useCreateTransactionListStore = create<CreateTransactionListState>((set) => ({
    ...initialState,
    setTransactionListType: (transactionListType: 'ALL' | 'INCOME' | 'EXPENSE' | 'TRANSFER') =>
        set({ transactionListType: transactionListType }),
    setDate: (newDate: Date) => set({ date: newDate }),
    setMonthIncome: (monthIncome: number) => set({ monthIncome: monthIncome }),
    setMonthExpense: (monthExpense: number) => set({ monthExpense: monthExpense }),
    setMonthTransfer: (monthTransfer: number) => set({ monthTransfer: monthTransfer }),
}));

