import { create } from 'zustand';
import { CategoryManageSummary } from '../types';
import { CategoryResponse } from '../../transaction/types';

type EditCategoryStoreState = {
    originalCategoryName: string;

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
    initializeAllCategories: (categories: CategoryResponse[]) => void;

    // Category fetching
    allCategories: any[];
    isLoadingCategories: boolean;
    categoriesError: string | null;

    //Errors
    categoryNameError: string | null;

    //validations
    validateCategoryName: () => boolean;
};

const initialState = {
    originalCategoryName: '',
    categoryIdDraft: '',
    categoryNameDraft: '',
    categoryDescriptionDraft: null,
    categoryTypeDraft: 'INCOME' as const,
    categoryIconDraft: '',
    categoryColorDraft: '',
    usedInTransactionsDraft: 0,
    categoryNameError: null,
    allCategories: [],
    isLoadingCategories: false,
    categoriesError: null,
};

export const useEditCategoryStore = create<EditCategoryStoreState>((set, get) => ({
    ...initialState,
    setCategoryIdDraft: (categoryId: string) => set({categoryIdDraft: categoryId}),
    setCategoryNameDraft: (categoryName: string) => set({categoryNameDraft: categoryName}),
    setCategoryDescriptionDraft: (categoryDescription: string | null) => set({categoryDescriptionDraft: categoryDescription}),
    setCategoryTypeDraft: (categoryType: 'INCOME' | 'EXPENSE' | 'TRANSFER') => set({categoryTypeDraft: categoryType}),
    setCategoryIconDraft: (categoryIcon: string) => set({categoryIconDraft: categoryIcon}),
    setCategoryColorDraft: (categoryColor: string) => set({categoryColorDraft: categoryColor}),
    setUsedInTransactionsDraft: (usedInTransactions: number) => set({usedInTransactionsDraft: usedInTransactions}),

    initializeAllCategories: (categories: CategoryResponse[]) => set({allCategories: categories}),

    initializeDrafts: (categoryData: CategoryManageSummary) =>  set({
        originalCategoryName: categoryData.categoryName,
        categoryIdDraft: categoryData.categoryId,
        categoryNameDraft: categoryData.categoryName,
        categoryDescriptionDraft: categoryData.categoryDescription ?? null,
        categoryTypeDraft: categoryData.categoryType,
        categoryIconDraft: categoryData.categoryIcon,
        categoryColorDraft: categoryData.categoryColor,
        usedInTransactionsDraft: categoryData.usedInTransactions,
    }),


    // Validates category name uniquness (only for the same category type)
    validateCategoryName: () => {
        const { allCategories, categoryNameDraft, categoryTypeDraft, originalCategoryName } = get();

        // Clear error if input is empty (don't show error for empty field)
        if (categoryNameDraft.trim() === '') {
            set({categoryNameError: 'Category name is required'});
            return false;
        }

        // Only show length error if user has typed something but it's too short
        if (categoryNameDraft.trim().length < 3) {
            set({categoryNameError: 'Category name must be at least 3 characters long'});
            return false;
        }

        // Check for maximum length (already limited in front but double check here)
        if (categoryNameDraft.trim().length > 30) {
            set({categoryNameError: 'Category name cannot exceed 30 characters'});
            return false;
        }

        // Check for invalid characters (only allow letters, numbers, spaces, and common punctuation)
        const validNameRegex = /^[a-zA-Z0-9\s\-_&()]+$/;
        if (!validNameRegex.test(categoryNameDraft.trim())) {
            set({categoryNameError: 'Category name can only contain letters, numbers, spaces, and common punctuation (-_&())'});
            return false;
        }

        // Check for reserved words or inappropriate content
        const reservedWords = ['all', 'none', 'other', 'misc', 'miscellaneous', 'uncategorized'];
        if (reservedWords.includes(categoryNameDraft.trim().toLowerCase())) {
            set({categoryNameError: 'This name is reserved and cannot be used'});
            return false;
        }

        // Check for duplicate names within the same transaction type
        const existingCategory = allCategories.find(category =>
            category.categoryName.toLowerCase() === categoryNameDraft.trim().toLowerCase() &&
            category.transactionType === categoryTypeDraft
        );

        if (existingCategory && categoryNameDraft !== originalCategoryName) {
            set({categoryNameError: 'This category name already exists for this category type'});
            return false;
        }

        set({categoryNameError: null});
        return true;
    },
}));


