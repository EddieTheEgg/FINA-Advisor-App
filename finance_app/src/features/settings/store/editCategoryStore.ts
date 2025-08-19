import { create } from 'zustand';
import { CategoryManageSummary } from '../types';


type EditCategoryStoreState = {
    categoryIdDraft: string;
    categoryNameDraft: string;
    categoryDescriptionDraft: string | null;
    categoryTypeDraft: 'INCOME' | 'EXPENSE' | 'TRANSFER';
    categoryIconDraft: string;
    categoryColorDraft: string;
    usedInTransactionsDraft: number;

    setCategoryIdDraft: (categoryId: string) => void;
    setCategoryNameDraft: (categoryName: string) => void;
    setCategoryDescriptionDraft: (categoryDescription: string | null) => void;
    setCategoryTypeDraft: (categoryType: 'INCOME' | 'EXPENSE' | 'TRANSFER') => void;
    setCategoryIconDraft: (categoryIcon: string) => void;
    setCategoryColorDraft: (categoryColor: string) => void;
    setUsedInTransactionsDraft: (usedInTransactions: number) => void;

    initializeDrafts: (categoryData: CategoryManageSummary) => void;
};

const initialState = {
    categoryIdDraft: '',
    categoryNameDraft: '',
    categoryDescriptionDraft: null,
    categoryTypeDraft: 'INCOME' as const,
    categoryIconDraft: '',
    categoryColorDraft: '',
    usedInTransactionsDraft: 0,
};

export const useEditCategoryStore = create<EditCategoryStoreState>((set) => ({
    ...initialState,
    setCategoryIdDraft: (categoryId: string) => set({categoryIdDraft: categoryId}),
    setCategoryNameDraft: (categoryName: string) => set({categoryNameDraft: categoryName}),
    setCategoryDescriptionDraft: (categoryDescription: string | null) => set({categoryDescriptionDraft: categoryDescription}),
    setCategoryTypeDraft: (categoryType: 'INCOME' | 'EXPENSE' | 'TRANSFER') => set({categoryTypeDraft: categoryType}),
    setCategoryIconDraft: (categoryIcon: string) => set({categoryIconDraft: categoryIcon}),
    setCategoryColorDraft: (categoryColor: string) => set({categoryColorDraft: categoryColor}),
    setUsedInTransactionsDraft: (usedInTransactions: number) => set({usedInTransactionsDraft: usedInTransactions}),

    initializeDrafts: (categoryData: CategoryManageSummary) => set({
        categoryIdDraft: categoryData.categoryId,
        categoryNameDraft: categoryData.categoryName,
        categoryDescriptionDraft: categoryData.categoryDescription ?? null,
        categoryTypeDraft: categoryData.categoryType,
        categoryIconDraft: categoryData.categoryIcon,
        categoryColorDraft: categoryData.categoryColor,
        usedInTransactionsDraft: categoryData.usedInTransactions,
    }),
}));


