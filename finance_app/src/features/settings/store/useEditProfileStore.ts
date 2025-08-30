import { create } from 'zustand';

type EditProfileState = {
    firstName: string;
    lastName: string;

    setFirstName: (firstName: string) => void;
    setLastName: (lastName: string) => void;

    initializeEditProfile: () => void;

    validateFirstName: () => boolean;
    validateLastName: () => boolean;

    resetAllFields: () => void;

    firstNameError: string | null;
    lastNameError: string | null;
};

const initialState = {
    firstName: '',
    lastName: '',

    firstNameError: null,
    lastNameError: null,
};

export const useEditProfileStore = create<EditProfileState>((set, get) => ({
    ...initialState,

    setFirstName: (firstName: string) => set({firstName}),
    setLastName: (lastName: string) => set({lastName}),

    initializeEditProfile: () => set(initialState),

    validateFirstName: () => {
        const { firstName } = get();
        if (!firstName) {
            set({firstNameError: 'First name is required'});
            return false;
        }
        set({firstNameError: null});
        return true;
    },

    validateLastName: () => {
        const { lastName } = get();
        if (!lastName) {
            set({lastNameError: 'Last name is required'});
            return false;
        }
        set({lastNameError: null});
        return true;
    },

    resetAllFields: () => set(initialState),
}));
