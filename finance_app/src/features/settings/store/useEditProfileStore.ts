import { create } from 'zustand';
import { UserProfile } from '../types';
import { EmailAvailabilityResponse } from '../../auth/types';
import { checkEmailAvailability } from '../../auth/api/api';

type EditProfileState = {

    originalFirstName: string;
    originalLastName: string;
    originalEmail: string;

    firstName: string;
    lastName: string;
    email: string;

    setFirstName: (firstName: string) => void;
    setLastName: (lastName: string) => void;
    setEmail: (email: string) => void;

    initializeEditProfile: (profileData: UserProfile) => void;

    validateFirstName: () => boolean;
    validateLastName: () => boolean;
    validateEmail: () => boolean;
    validateProfileInfo: () => Promise<boolean>;
    checkEmailAvailability: (email: string) => Promise<boolean>;

    resetAllFields: () => void;

    firstNameError: string | null;
    lastNameError: string | null;
    emailError: string | null;
};

const initialState = {
    originalFirstName: '',
    originalLastName: '',
    originalEmail: '',

    firstName: '',
    lastName: '',
    email: '',

    firstNameError: null,
    lastNameError: null,
    emailError: null,
};

export const useEditProfileStore = create<EditProfileState>((set, get) => ({
    ...initialState,

    setFirstName: (firstName: string) => set({firstName}),
    setLastName: (lastName: string) => set({lastName}),
    setEmail: (email: string) => set({email}),

    initializeEditProfile: (profileData: UserProfile) => set({
        originalFirstName: profileData.firstName,
        originalLastName: profileData.lastName,
        originalEmail: profileData.email,

        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
    }),

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

    validateProfileInfo: async () => {
        const firstName = get().validateFirstName();
        const lastName = get().validateLastName();
        const email = get().validateEmail();

        if (!firstName || !lastName || !email) {
            return false;
        }

        //If user inputs the same email as the original email, we can just ignore the check step as nothing has changed
        if (get().email === get().originalEmail) {
            return true;
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

    resetAllFields: () => set(initialState),
}));
