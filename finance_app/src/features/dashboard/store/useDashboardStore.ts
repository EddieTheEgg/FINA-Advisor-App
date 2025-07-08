import { create } from 'zustand';

type DashboardState = {
    month: number;
    year: number;
    setMonth: (month: number) => void;
    setYear: (year: number) => void;
}

const initialState = {
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
};


export const useDashboardStore = create<DashboardState>((set) => ({
    ...initialState,
    setMonth: (month) => set({ month }),
    setYear: (year) => set({ year }),
}));
