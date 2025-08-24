import { create } from 'zustand';
import { checkEmailAvailability } from '../api/api';
import { AccountType, EmailAvailabilityResponse } from '../types';

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
    validateEmail: () => boolean;
    validateEmailType: (email: string) => boolean;
    validatePassword: () => boolean;
    validateConfirmPassword: () => boolean;
    validateCreateAccount: () => Promise<boolean>;
    checkEmailAvailability: (email: string) => Promise<boolean>;

    firstNameError: string | null;
    lastNameError: string | null;
    emailError: string | null;
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
    emailError: null,
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


    validateEmail: () => {
        const email = get().email;

        if(email.length <= 0) {
            set({emailError: 'Email is required'});
            return false;
        }

        const expression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (expression.test(String(email).toLowerCase())) {
            set({emailError: null});
            return true;
        } else {
            set({emailError: 'Please enter a valid email'});
            return false;
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

    validateCreateAccount: async () => {
        const firstName = get().validateFirstName();
        const lastName = get().validateLastName();
        const email = get().validateEmail();
        const password = get().validatePassword();
        const confirmPassword = get().validateConfirmPassword();

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return false;
        }

        // Check email avaliablity as final before creating/proceeding to next step
        const emailAvailable = await get().checkEmailAvailability(get().email);

        return emailAvailable;
    },

    checkEmailAvailability: async (email: string): Promise<boolean> => {
        try {
            const response: EmailAvailabilityResponse = await checkEmailAvailability(email);
            if (!response.available) {
                set({emailError: response.message});
                return false;
            }
            return true;
        } catch (error) {
            set({emailError: 'Failed to check email availability'});
            return false;
        }
    },
}));


type AccountInfo = {
    accountType: AccountType;
    accountName: string;
    accountBank: string | null;
    accountBalance: number;

    setAccountName: (accountName: string) => void;
    setAccountType: (accountType: AccountType) => void;
    setAccountBank: (accountBank: string | null) => void;
    setAccountBalance: (accountBalance: number) => void;

    resetAccountDetailsExceptType: () => void;

    validateAccountName: () => boolean;
    accountNameError: string | null;
}

const initialAccountInfo = {
    accountType: AccountType.CHECKING,
    accountName: '',
    accountBank: null,
    accountBalance: 0,
    accountNameError: null,
};

export const useAccountInfoStore = create<AccountInfo>((set, get) => ({
    ...initialAccountInfo,
    setAccountType: (accountType: AccountType) => set({ accountType }),
    setAccountName: (accountName: string) => set({ accountName }),
    setAccountBank: (accountBank: string | null) => set({accountBank}),
    setAccountBalance: (accountBalance: number) => set({accountBalance}),

    validateAccountName: () => {
        const accountName = get().accountName;
        if (accountName.length <= 0) {
            set({accountNameError: 'Account name is required'});
            return false;
        }
        set({accountNameError: null});
        return true;
    },

    resetAccountDetailsExceptType: () => set({
        accountName: initialAccountInfo.accountName,
        accountBank: initialAccountInfo.accountBank,
        accountBalance: initialAccountInfo.accountBalance,
    }),
}));


