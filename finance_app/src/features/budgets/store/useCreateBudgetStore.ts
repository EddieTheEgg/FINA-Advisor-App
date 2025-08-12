import { create } from "zustand";


type CreateBudgetState = {
    categoryId: string;
    budgetName: string | null;
    budgetAmount: number;
    budgetMonth: Date;

    setCategoryId: (categoryId: string) => void;
    setBudgetName: (budgetName: string | null) => void;
    setBudgetAmount: (budgetAmount: number) => void;
    setBudgetMonth: (budgetMonth: Date) => void;
};

const initialCreateBudgetState = {
    categoryId: '',
    budgetName: null,
    budgetAmount: 0,
    budgetMonth: new Date(),
};

export const useCreateBudgetStore = create<CreateBudgetState>((set) => ({
    ...initialCreateBudgetState,
    setCategoryId: (categoryId: string) => set({ categoryId }),
    setBudgetName: (budgetName: string | null) => set({ budgetName }),
    setBudgetAmount: (budgetAmount: number) => set({ budgetAmount }),
    setBudgetMonth: (budgetMonth: Date) => set({ budgetMonth }),
}));



