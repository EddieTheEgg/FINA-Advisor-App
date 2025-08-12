import { create } from 'zustand';
import { BudgetCategoryData } from '../types';



type CreateBudgetState = {
    categoryId: string;
    budgetAmount: number;
    budgetMonth: Date;

    selectedCategoryInfo: BudgetCategoryData | null;

    setCategoryId: (categoryId: string) => void;
    setBudgetAmount: (budgetAmount: number) => void;
    setBudgetMonth: (budgetMonth: Date) => void;
    setSelectedCategoryInfo: (selectedCategoryInfo: BudgetCategoryData | null) => void;

    budgetAmountError : string;
    setBudgetAmountError: (budgetAmountError: string) => void;

    budgetMonthError : string;
    categorySelectedError : string;


    createSuccessModal: boolean;
    setCreateSuccessModal: (createSuccessModal: boolean) => void;

    validateBudgetAmount: () => boolean;
    validateBudgetMonth: () => boolean;
    validateSelectedCategory: () => boolean;

    resetCreateBudgetStore: () => void;
};

const initialCreateBudgetState = {
    categoryId: '',
    budgetAmount: 0,
    budgetMonth: new Date(new Date().getFullYear(), new Date().getMonth(), 1), //Always the first day of the month to keep consistency since only month digit matters

    selectedCategoryInfo: null,

    budgetAmountError : '',
    budgetMonthError : '',
    categorySelectedError : '',
    createSuccessModal: false,
};

export const useCreateBudgetStore = create<CreateBudgetState>((set, get) => ({
    ...initialCreateBudgetState,
    setCategoryId: (categoryId: string) => set({ categoryId }),
    setBudgetAmount: (budgetAmount: number) => set({ budgetAmount }),
    setBudgetMonth: (budgetMonth: Date) => set({ budgetMonth }),
    setSelectedCategoryInfo: (newSelectedCategoryInfo: BudgetCategoryData | null) => set({selectedCategoryInfo : newSelectedCategoryInfo}),
    setBudgetAmountError: (budgetAmountError: string) => set({budgetAmountError}),
    validateBudgetMonth: () => {
        const {budgetMonth} = get();
        if (budgetMonth === null) {
            set({budgetMonthError: 'Please select a budget month'});
            return false;
        }
        set({budgetMonthError: ''});
        return true;
    },
    validateSelectedCategory: () => {
        const {categoryId, selectedCategoryInfo} = get();
        if (categoryId === '' || selectedCategoryInfo === null) {
            set({categorySelectedError: 'Please select a category'});
            return false;
        }
        set({categorySelectedError: ''});
        return true;
    },
    validateBudgetAmount: () => {
        const {budgetAmount} = get();

        if (budgetAmount <= 0.00) {
            set({budgetAmountError: 'Budget must be greater than 0'});
            return false;
        }

        set({budgetAmountError: ''});
        return true;
    },
    setCreateSuccessModal: (createSuccessModal: boolean) => set({createSuccessModal}),
    resetCreateBudgetStore: () => set(initialCreateBudgetState),
}));

