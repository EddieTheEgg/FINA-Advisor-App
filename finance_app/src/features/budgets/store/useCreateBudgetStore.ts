import { create } from 'zustand';
import { BudgetCategoryData } from '../types';



type CreateBudgetState = {
    categoryId: string;
    budgetName: string | null;
    budgetAmount: number;
    budgetMonth: Date;

    selectedCategoryInfo: BudgetCategoryData | null;

    setCategoryId: (categoryId: string) => void;
    setBudgetName: (budgetName: string | null) => void;
    setBudgetAmount: (budgetAmount: number) => void;
    setBudgetMonth: (budgetMonth: Date) => void;
    setSelectedCategoryInfo: (selectedCategoryInfo: BudgetCategoryData) => void;
};

const initialCreateBudgetState = {
    categoryId: '',
    budgetName: null,
    budgetAmount: 0,
    budgetMonth: new Date(new Date().getFullYear(), new Date().getMonth(), 1), //Always the first day of the month to keep consistency since only month digit matters

    selectedCategoryInfo: null,
};

export const useCreateBudgetStore = create<CreateBudgetState>((set) => ({
    ...initialCreateBudgetState,
    setCategoryId: (categoryId: string) => set({ categoryId }),
    setBudgetName: (budgetName: string | null) => set({ budgetName }),
    setBudgetAmount: (budgetAmount: number) => set({ budgetAmount }),
    setBudgetMonth: (budgetMonth: Date) => set({ budgetMonth }),
    setSelectedCategoryInfo: (newSelectedCategoryInfo: BudgetCategoryData) => set({selectedCategoryInfo : newSelectedCategoryInfo}),
}));



