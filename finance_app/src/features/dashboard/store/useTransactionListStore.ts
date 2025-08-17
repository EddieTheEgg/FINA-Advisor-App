import { create } from 'zustand';


type CreateTransactionListState = {
    transactionListType : 'ALL' | 'INCOME' | 'EXPENSE' | 'TRANSFER';

    date: Date; //In the format #YYYY-MM-01

    monthIncome : number;
    monthExpense : number;
    monthTransfer : number;

    //Filters
    sortBy: 'TRANSACTION_DATE' | 'AMOUNT' | 'CREATED_AT';
    sortOrder: 'ASC' | 'DESC';
    accountsFilter: string[];
    categoriesFilter: string[]


    setTransactionListType : (transactionListType : 'ALL' | 'INCOME' | 'EXPENSE' | 'TRANSFER') => void;
    setDate : (newDate : Date) => void;
    setMonthIncome : (monthIncome : number) => void;
    setMonthExpense : (monthExpense : number) => void;
    setMonthTransfer : (monthTransfer : number) => void;
    setSortBy: (sortBy : 'TRANSACTION_DATE' | 'AMOUNT' | 'CREATED_AT') => void;
    setSortOrder: (sortOrder : 'ASC' | 'DESC') => void;
    setAccountsFilter: (accountsFilter : string[]) => void;
    setCategoriesFilter: (categoriesFilter : string[]) => void;
};


type TransactionListFilterState = {
    sortByDraft: 'TRANSACTION_DATE' | 'AMOUNT' | 'CREATED_AT';
    sortOrderDraft: 'ASC' | 'DESC';
    accountsFilterDraft: string[];
    categoriesFilterDraft: string[];

    // Draft state setters
    setSortByDraft: (sortBy: 'TRANSACTION_DATE' | 'AMOUNT' | 'CREATED_AT') => void;
    setSortOrderDraft: (sortOrder: 'ASC' | 'DESC') => void;
    setAccountsFilterDraft: (accountsFilter: string[]) => void;
    setCategoriesFilterDraft: (categoriesFilter: string[]) => void;

    // Methods to manage draft state
    initializeDraftFromCurrentFilters: () => void; // Copy current filters to draft (when opening filter modal)
    clearAllDraftFilters: () => void;
    applyDraftFilters: () => void; // Apply draft filters to actual state (when user clicks "Apply")
    resetDraftFilters: () => void; // Reset draft to match current state (when user clicks "Cancel")
    clearAllActualFilters: () => void; // Clear all actual filters (when changing transaction type)
}


const initialState = {
    transactionListType: 'ALL' as const,
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 1), //In the format #YYYY-MM-01

    monthIncome: 0,
    monthExpense: 0,
    monthTransfer: 0,

    sortBy: 'TRANSACTION_DATE' as 'TRANSACTION_DATE' | 'AMOUNT' | 'CREATED_AT',
    sortOrder: 'DESC' as 'ASC' | 'DESC',
    accountsFilter: [] as string[],
    categoriesFilter: [] as string[],
};

const draftFilters = {
    sortByDraft: 'TRANSACTION_DATE' as 'TRANSACTION_DATE' | 'AMOUNT' | 'CREATED_AT',
    sortOrderDraft: 'DESC' as 'ASC' | 'DESC',
    accountsFilterDraft: [] as string[],
    categoriesFilterDraft: [] as string[],
};


export const useCreateTransactionListStore = create<CreateTransactionListState & TransactionListFilterState>((set, get) => ({
    ...initialState,
    ...draftFilters,
    setTransactionListType: (transactionListType: 'ALL' | 'INCOME' | 'EXPENSE' | 'TRANSFER') =>
        set({ transactionListType: transactionListType }),
    setDate: (newDate: Date) => set({ date: newDate }),
    setMonthIncome: (monthIncome: number) => set({ monthIncome: monthIncome }),
    setMonthExpense: (monthExpense: number) => set({ monthExpense: monthExpense }),
    setMonthTransfer: (monthTransfer: number) => set({ monthTransfer: monthTransfer }),
    setSortBy: (sortBy: 'TRANSACTION_DATE' | 'AMOUNT' | 'CREATED_AT') => set({ sortBy: sortBy }),
    setSortOrder: (sortOrder: 'ASC' | 'DESC') => set({ sortOrder: sortOrder }),
    setAccountsFilter: (accountsFilter: string[]) => set({ accountsFilter: accountsFilter }),
    setCategoriesFilter: (categoriesFilter: string[]) => set({ categoriesFilter: categoriesFilter }),

    // Draft state setters
    setSortByDraft: (sortBy: 'TRANSACTION_DATE' | 'AMOUNT' | 'CREATED_AT') => set({ sortByDraft: sortBy }),
    setSortOrderDraft: (sortOrder: 'ASC' | 'DESC') => set({ sortOrderDraft: sortOrder }),
    setAccountsFilterDraft: (accountsFilter: string[]) => set({ accountsFilterDraft: accountsFilter }),
    setCategoriesFilterDraft: (categoriesFilter: string[]) => set({ categoriesFilterDraft: categoriesFilter }),

    // Draft management methods
    initializeDraftFromCurrentFilters: () => {
        const state = get();
        set({
            sortByDraft: state.sortBy,
            sortOrderDraft: state.sortOrder,
            accountsFilterDraft: [...state.accountsFilter], //copy the current accounts filter
            categoriesFilterDraft: [...state.categoriesFilter], //copy the current categories filter
        });
    },

    clearAllDraftFilters: () => {
        set({
            sortByDraft: 'TRANSACTION_DATE' as 'TRANSACTION_DATE' | 'AMOUNT' | 'CREATED_AT',
            sortOrderDraft: 'DESC' as 'ASC' | 'DESC',
            accountsFilterDraft: [] as string[],
            categoriesFilterDraft: [] as string[],
        });
    },

    clearAllActualFilters: () => {
        set({
            sortBy: 'TRANSACTION_DATE' as 'TRANSACTION_DATE' | 'AMOUNT' | 'CREATED_AT',
            sortOrder: 'DESC' as 'ASC' | 'DESC',
            accountsFilter: [] as string[],
            categoriesFilter: [] as string[],
        });
    },


    applyDraftFilters: () => {
        const state = get();
        set({
            sortBy: state.sortByDraft,
            sortOrder: state.sortOrderDraft,
            accountsFilter: [...state.accountsFilterDraft],
            categoriesFilter: [...state.categoriesFilterDraft],
        });
    },

    resetDraftFilters: () => {
        const state = get();
        set({
            sortByDraft: state.sortBy,
            sortOrderDraft: state.sortOrder,
            accountsFilterDraft: [...state.accountsFilter],
            categoriesFilterDraft: [...state.categoriesFilter],
        });
    },
}));

