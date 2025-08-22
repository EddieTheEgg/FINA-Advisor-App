import { create } from 'zustand';




type CreateCategoryState = {
    categoryName: string,
    categoryDescription: string | null,
    categoryType: 'INCOME' | 'EXPENSE' | 'TRANSFER'
    categoryIcon: string,
    categoryColor: string,

    setCategoryName: (categoryName: string) => void,
    setCategoryDescription: (categoryDescription: string | null) => void,
    setCategoryType: (categoryType: 'INCOME' | 'EXPENSE' | 'TRANSFER') => void,
    setCategoryIcon: (categoryIcon: string) => void,
    setCategoryColor: (categoryColor: string) => void,
};

const initialState = {
    categoryName: '',
    categoryDescription: null,
    categoryType: 'EXPENSE' as const,
    categoryIcon: '',
    categoryColor: '',
};

export const useCreateCategoryStore = create<CreateCategoryState>((set) => ({
    ...initialState,
    setCategoryName: (categoryName: string) => set({categoryName}),
    setCategoryDescription: (categoryDescription: string | null) => set({categoryDescription}),
    setCategoryType: (categoryType: 'INCOME' | 'EXPENSE' | 'TRANSFER') => set({categoryType}),
    setCategoryIcon: (categoryIcon: string) => set({categoryIcon}),
    setCategoryColor: (categoryColor: string) => set({categoryColor}),
}));

