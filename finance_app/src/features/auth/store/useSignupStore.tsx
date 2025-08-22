import { create } from 'zustand';

type PersonalInfo = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;

    setFirstName: (firstName: string) => void;
    setLastName: (lastName: string) => void;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;

    initializePersonalInfo: () => void;
};

const initialPersonalInfo = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
};


export const useSignupStore = create<PersonalInfo>((set) => ({
    ...initialPersonalInfo,
    setFirstName: (firstName: string) => set({ firstName }),
    setLastName: (lastName: string) => set({ lastName }),
    setEmail: (email: string) => set({ email }),
    setPassword: (password: string) => set({ password }),

    initializePersonalInfo: () => set(initialPersonalInfo),
}));
