import { create } from 'zustand';
import { BudgetCategoryData, BudgetDetailData } from '../types';

type EditBudgetState = {
    budgetId: string;
    budgetMonth: Date;
    budgetAmount: number;
    categoryId: string;
    selectedCategoryInfo: BudgetCategoryData | null;

    setBudgetId: (budgetId: string) => void;
    setBudgetMonth: (budgetMonth: Date) => void;
    setBudgetAmount: (budgetAmount: number) => void;
    setCategoryId: (categoryId: string) => void;
    setSelectedCategoryInfo: (selectedCategoryInfo: BudgetCategoryData | null) => void;
}

type EditBudgetDraftState = {
    budgetIdDraft: string;
    budgetMonthDraft: Date;
    budgetAmountDraft: number;
    categoryIdDraft: string;
    selectedCategoryInfoDraft: BudgetCategoryData | null;

    setBudgetIdDraft: (budgetIdDraft: string) => void;
    setBudgetMonthDraft: (budgetMonthDraft: Date) => void;
    setBudgetAmountDraft: (budgetAmountDraft: number) => void;
    setCategoryIdDraft: (categoryIdDraft: string) => void;
    setSelectedCategoryInfoDraft: (selectedCategoryInfoDraft: BudgetCategoryData | null) => void;

    initializeDraftFromBudget: (budget: BudgetDetailData) => void;

}

const initialEditBudgetState = {
    budgetId: '',
    budgetMonth: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    budgetAmount: 0,
    categoryId: '',
    selectedCategoryInfo: null,
};

const initialEditBudgetDraftState = {
    budgetIdDraft: '',
    budgetMonthDraft: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    budgetAmountDraft: 0,
    categoryIdDraft: '',
    selectedCategoryInfoDraft: null,
};

export const useEditBudgetStore = create<EditBudgetState & EditBudgetDraftState>((set) => ({
    ...initialEditBudgetState,
    ...initialEditBudgetDraftState,
    setBudgetId: (budgetId: string) => set({budgetId}),
    setBudgetMonth: (budgetMonth: Date) => set({budgetMonth}),
    setBudgetAmount: (budgetAmount: number) => set({budgetAmount}),
    setCategoryId: (categoryId: string) => set({categoryId}),
    setSelectedCategoryInfo: (selectedCategoryInfo: BudgetCategoryData | null) => set({selectedCategoryInfo}),
    setBudgetIdDraft: (budgetIdDraft: string) => set({budgetIdDraft}),
    setBudgetMonthDraft: (budgetMonthDraft: Date) => set({budgetMonthDraft}),
    setBudgetAmountDraft: (budgetAmountDraft: number) => set({budgetAmountDraft}),
    setCategoryIdDraft: (categoryIdDraft: string) => set({categoryIdDraft}),
    setSelectedCategoryInfoDraft: (selectedCategoryInfoDraft: BudgetCategoryData | null) => set({selectedCategoryInfoDraft}),
    initializeDraftFromBudget: (budget: BudgetDetailData) => {
        set({
            budgetIdDraft: budget.coreBudgetData.budgetId,
            budgetMonthDraft: new Date(budget.coreBudgetData.budgetPeriod),
            budgetAmountDraft: budget.coreBudgetData.budgetAmount,
            categoryIdDraft: budget.categoryData.categoryId,
            selectedCategoryInfoDraft: budget.categoryData,

            budgetId: budget.coreBudgetData.budgetId,
            budgetMonth: new Date(budget.coreBudgetData.budgetPeriod),
            budgetAmount: budget.coreBudgetData.budgetAmount, 
            categoryId: budget.categoryData.categoryId,
            selectedCategoryInfo: budget.categoryData,
        });
    },
}));
