import { create } from 'zustand';
import { CategoryResponse } from '../../transaction/types';




type CreateCategoryState = {
    categoryName: string,
    categoryDescription: string | null,
    categoryType: 'INCOME' | 'EXPENSE' | 'TRANSFER',
    allCategories: CategoryResponse[],
    categoryIcon: string,
    categoryColor: string,

    setCategoryName: (categoryName: string) => void,
    setCategoryDescription: (categoryDescription: string | null) => void,
    setCategoryType: (categoryType: 'INCOME' | 'EXPENSE' | 'TRANSFER') => void,
    setCategoryIcon: (categoryIcon: string) => void,
    setCategoryColor: (categoryColor: string) => void,

    initializeAllCategories: (categories: CategoryResponse[]) => void,
    validateCategoryName: () => boolean,
    categoryNameError: string | null,
};

const initialState = {
    categoryName: '',
    categoryDescription: null,
    categoryType: 'EXPENSE' as const,
    categoryIcon: '',
    categoryColor: '#616161',
    allCategories: [],
    categoryNameError: null,
};

export const useCreateCategoryStore = create<CreateCategoryState>((set, get) => ({
    ...initialState,
    setCategoryName: (categoryName: string) => set({categoryName}),
    setCategoryDescription: (categoryDescription: string | null) => set({categoryDescription}),
    setCategoryType: (categoryType: 'INCOME' | 'EXPENSE' | 'TRANSFER') => set({categoryType}),
    setCategoryIcon: (categoryIcon: string) => set({categoryIcon}),
    setCategoryColor: (categoryColor: string) => set({categoryColor}),
    initializeAllCategories: (categories: CategoryResponse[]) => set({allCategories: categories}),

     // Validates category name uniquness (only for the same category type)
    validateCategoryName: () => {
        const { allCategories, categoryName, categoryType } = get();

        // Clear error if input is empty (don't show error for empty field)
        if (categoryName.trim() === '') {
            set({categoryNameError: 'Category name is required'});
            return false;
        }

        // Only show length error if user has typed something but it's too short
        if (categoryName.trim().length < 3) {
            set({categoryNameError: 'Category name must be at least 3 characters long'});
            return false;
        }

        // Check for maximum length (already limited in front but double check here)
        if (categoryName.trim().length > 30) {
            set({categoryNameError: 'Category name cannot exceed 30 characters'});
            return false;
        }

        // Check for invalid characters (only allow letters, numbers, spaces, and common punctuation)
        const validNameRegex = /^[a-zA-Z0-9\s\-_&()]+$/;
        if (!validNameRegex.test(categoryName.trim())) {
            set({categoryNameError: 'Category name can only contain letters, numbers, spaces, and common punctuation (-_&())'});
            return false;
        }

        // Check for reserved words or inappropriate content
        const reservedWords = ['all', 'none', 'other', 'misc', 'miscellaneous', 'uncategorized'];
        if (reservedWords.includes(categoryName.trim().toLowerCase())) {
            set({categoryNameError: 'This name is reserved and cannot be used'});
            return false;
        }

        // Check for duplicate names within the same transaction type
        const existingCategory = allCategories.find(category =>
            category.categoryName.toLowerCase() === categoryName.trim().toLowerCase() &&
            category.transactionType === categoryType
        );

        if (existingCategory) {
            set({categoryNameError: 'This category name already exists for this category type'});
            return false;
        }

        set({categoryNameError: null});
        return true;
    },
}));

