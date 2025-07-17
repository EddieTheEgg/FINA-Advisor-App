import { create } from 'zustand';
import { AccountResponse, AccountType } from '../../accounts/types';
import { CategoryResponse } from '../types';

type CreateTransactionState = {
    transactionType: 'INCOME' | 'EXPENSE' | 'TRANSFER';
    sourceAccount : AccountResponse | null;
    amount : number;
    amountError: string,
    selectedCategory: CategoryResponse | null,
    title : string,
    date: Date;
    merchant: string | null;
    location: string | null;
    notes: string | null;
    recurringTransaction: boolean;
    recurringTransactionFrequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY' | null;
    recurringTransactionStartDate: Date | null;
    recurringTransactionEndDate: Date | null;

    setTransactionType : (transactionType : 'INCOME' | 'EXPENSE' | 'TRANSFER') => void;
    setSourceAccount : (sourceAccount : AccountResponse) => void;
    setAmount : (amount : number) => void;
    setAmountError: (error: string) => void;
    setSelectedCategory : (selectedCategory : CategoryResponse | null) => void;
    setTitle: (title: string) => void;
    setDate: (date: Date) => void;
    setMerchant: (merchant: string | null) => void;
    setLocation: (location: string | null) => void;
    setNotes: (notes: string | null) => void;
    setRecurringTransaction: (recurringTransaction: boolean) => void;
    setRecurringTransactionFrequency: (recurringTransactionFrequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY' | null) => void;
    setRecurringTransactionStartDate: (recurringTransactionStartDate: Date | null) => void;
    setRecurringTransactionEndDate: (recurringTransactionEndDate: Date | null) => void;

    // Validation errors
    sourceAccountError: string;
    selectedCategoryError: string;
    recurringTransactionError: string;
    titleError: string;

    // Validation
    validateSourceAccount : () => boolean;
    validateSelectedCategory : () => boolean;
    validateTitle : () => boolean;
    validateAmount : () => boolean;
    validateRecurringTransaction : () => boolean;
    validateCreateTransaction : () => boolean;
    resetToInitialState : () => void;
};

const initialState = {
    transactionType: 'EXPENSE' as const,
    sourceAccount: null,
    amount: 0.00,
    amountError: '',
    selectedCategory: null,
    title: '',
    date: new Date(),
    merchant: null,
    location: null,
    notes: null,
    recurringTransaction: false,
    recurringTransactionFrequency: null,
    recurringTransactionStartDate: null,
    recurringTransactionEndDate: null,

    // Validation errors
    sourceAccountError: '',
    recurringTransactionError: '',
    titleError: '',
    selectedCategoryError: '',
};

export const useCreateTransactionStore = create<CreateTransactionState>((set, get) => ({
    ...initialState,

    setTransactionType: (transactionType) => set({transactionType: transactionType }),
    setSourceAccount: (sourceAccount) => set({sourceAccount: sourceAccount}),
    setAmount: (amount) => set({amount: amount}),
    setAmountError: (error) => set({ amountError: error }),
    setSelectedCategory: (selectedCategory) => set({selectedCategory: selectedCategory}),
    setTitle: (title) => set({title: title}),
    setDate: (date) => set({date: date}),
    setMerchant: (merchant) => set({merchant: merchant}),
    setLocation: (location) => set({location: location}),
    setNotes: (notes) => set({notes: notes}),
    setRecurringTransaction: (recurringTransaction) => set({recurringTransaction: recurringTransaction}),
    setRecurringTransactionFrequency: (recurringTransactionFrequency) => set({recurringTransactionFrequency: recurringTransactionFrequency}),
    setRecurringTransactionStartDate: (recurringTransactionStartDate) => set({recurringTransactionStartDate: recurringTransactionStartDate}),
    setRecurringTransactionEndDate: (recurringTransactionEndDate) => set({recurringTransactionEndDate: recurringTransactionEndDate}),

    resetToInitialState: () => set(initialState),

    validateSourceAccount: () => {
        const {sourceAccount} = get();

        if (!sourceAccount) {
            set({sourceAccountError: 'Account is required'});
            return false;
        }

        set({sourceAccountError: ''});
        return true;
    },

    validateSelectedCategory: () => {
        const {selectedCategory} = get();

        if (!selectedCategory) {
            set({selectedCategoryError: 'Category is required'});
            return false;
        }

        set({selectedCategoryError: ''});
        return true;
    },

    validateTitle: () => {
        const {title} = get();

        if (!title) {
            set({titleError: 'Title is required'});
            return false;
        }

        if (title.length < 3) {
            set({titleError: 'Title must be at least 3 characters long'});
            return false;
        }

        set({titleError: ''});
        return true;
    },

    validateAmount: () => {
        const {amount, transactionType, sourceAccount} = get();

        if (!sourceAccount) {
            set({amountError: 'Choose an account first to ensure this amount is valid'});
            return false;
        }

        const {accountType, balance, creditLimit = 0} = sourceAccount;

        if (amount <= 0.00) {
            set({ amountError: 'Transaction amount must be greater than 0' });
            return false;
        }

        if (transactionType === 'EXPENSE') {
            switch (accountType) {
                case AccountType.CASH:
                    if (amount > balance) {
                        set({amountError: 'Not enough cash to cover this transaction'});
                        return false;
                    }
                    break;

                case AccountType.CHECKING:
                    //Note in future, if we support overdrafts, we need to add logic to handle that
                    if (amount > balance) {
                        set({amountError: 'Insufficient funds'});
                        return false;
                    }
                    break;

                case AccountType.SAVINGS:
                    if (amount > balance) {
                        set({amountError: 'Insufficient funds'});
                        return false;
                    }
                    break;

                case AccountType.CREDIT_CARD:
                    if (creditLimit && Math.abs(amount) > Math.abs(creditLimit - balance)) {
                        set({amountError: `Exceeds the account's credit limit: $${creditLimit.toFixed(2)}`});
                        return false;
                    }
                    break;

                case AccountType.LOAN:
                    if (amount > balance) {
                        set({amountError: 'Loan balance exceeded'});
                        return false;
                    }
                    break;

                case AccountType.INVESTMENT:
                    // Optional: For the future, if we support withdrawing investments
                    break;
            }
        }

        if (transactionType === 'INCOME') {
            switch (accountType) {
                case AccountType.LOAN:
                    set({amountError: 'Cannot deposit income into a loan account'});
                    return false;
                case AccountType.CREDIT_CARD:
                    // Putting income into a credit card is allowed (to pay down the credit, or if account
                    // becomes positive, someone owes you credit)
                    break;
            }
        }

        set({amountError: ''});
        return true;
    },

    validateRecurringTransaction: () => {
        const {recurringTransactionStartDate, recurringTransactionEndDate} = get();

        if (recurringTransactionStartDate && recurringTransactionEndDate && recurringTransactionStartDate.getTime() >= recurringTransactionEndDate.getTime()) {
            set({recurringTransactionError: 'Start date must be before end date'});
            console.log('Start date must be before end date');
            return false;
        }

        set({recurringTransactionError: ''});
        return true;
    },

    // Make sure all fields (that have validation) are valid before creating a transaction
    validateCreateTransaction: () => {
        const {validateTitle, validateAmount, validateRecurringTransaction, validateSelectedCategory, validateSourceAccount} = get();

        const titleValid = validateTitle();
        const amountValid = validateAmount();
        const recurringTransactionValid = validateRecurringTransaction();
        const selectedCategoryValid = validateSelectedCategory();
        const sourceAccountValid = validateSourceAccount();

        return titleValid && amountValid && recurringTransactionValid && selectedCategoryValid && sourceAccountValid;
    },
}));
