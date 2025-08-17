import { create } from 'zustand';

type CategoryStoreState = {
    categoryType: 'INCOME' | 'EXPENSE' | 'TRANSFER';

    setCategoryType: (categoryType: 'INCOME' | 'EXPENSE' | 'TRANSFER') => void;
};


const initialState = {
    categoryType: 'EXPENSE' as const,
};


export const useCategoryStore = create<CategoryStoreState>((set) => ({
    ...initialState,
    setCategoryType: (categoryType: 'INCOME' | 'EXPENSE' | 'TRANSFER') =>
        set({ categoryType: categoryType }),
}));

