import { create } from 'zustand';

type PersonalInfo = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;

    setFirstName: (firstName: string) => void;
    setLastName: (lastName: string) => void;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setConfirmPassword: (confirmPassword: string) => void;

    initializePersonalInfo: () => void;

    validateFirstName: () => boolean;
    validateLastName: () => boolean;
    validateEmailType: (email: string) => boolean;
    validatePassword: () => boolean;
    validateConfirmPassword: () => boolean;

    firstNameError: string | null;
    lastNameError: string | null;
    passwordError: string | null;
    confirmPasswordError: string | null;
};

const initialPersonalInfo = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',

    firstNameError: null,
    lastNameError: null,
    passwordError: null,
    confirmPasswordError: null,
};


export const useSignupStore = create<PersonalInfo>((set, get) => ({
    ...initialPersonalInfo,
    setFirstName: (firstName: string) => set({ firstName }),
    setLastName: (lastName: string) => set({ lastName }),
    setEmail: (email: string) => set({ email }),
    setPassword: (password: string) => set({ password }),
    setConfirmPassword: (confirmPassword: string) => set({ confirmPassword }),

    initializePersonalInfo: () => set(initialPersonalInfo),

    validateFirstName: () => {
        const firstName = get().firstName;

        if(firstName.length <= 0) {
            set({firstNameError: 'First name is required'});
            return false;
        } else {
            set({firstNameError: null});
            return true;
        }
    },

    validateLastName: () => {
        const lastName = get().lastName;

        if(lastName.length <= 0) {
            set({lastNameError: 'Last name is required'});
            return false;
        } else {
            set({lastNameError: null});
            return true;
        }
    },


    validateEmailType: (email: string) => {
        const expression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return expression.test(String(email).toLowerCase());
    },

    validatePassword: () => {
        const password = get().password;

        if (password.length < 8) {
            set({passwordError: 'Password must be at least 8 characters.'});
            return false;
        }

        const expression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (expression.test(String(password))) {
            set({passwordError: null});
            return true;
        } else {
            set({passwordError: 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.'});
            return false;
        }
    },

    validateConfirmPassword: () => {
        const password = get().password;
        const confirmPassword = get().confirmPassword;

        if (password !== confirmPassword) {
            set({confirmPasswordError: 'Passwords do not match.'});
            return false;
        } else {
            set({confirmPasswordError: null});
            return true;
        }
    },
}));
