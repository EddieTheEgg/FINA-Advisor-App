import { create } from 'zustand';
import { CategoryResponse, TransactionAccountResponse, TransactionResponse } from '../types';
import { AccountType } from '../../accounts/types';


type EditTransactionState = {
    // Original transaction data
    transactionId: string | null;
    transactionType: 'INCOME' | 'EXPENSE' | 'TRANSFER';
    sourceAccount: TransactionAccountResponse | null;
    amount: number;
    title: string;
    date: Date;
    selectedCategory: CategoryResponse | null;
    notes: string | null;
    location: string | null;
    merchant: string | null;
    isSubscription: boolean;
    subscriptionFrequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY' | null;
    subscriptionStartDate: Date | null;
    subscriptionEndDate: Date | null;
    toAccount: TransactionAccountResponse | null; // For transfers
};

type EditTransactionStoreDraft = {
    // Draft state for editing
    transactionTypeDraft: 'INCOME' | 'EXPENSE' | 'TRANSFER';
    sourceAccountDraft: TransactionAccountResponse | null;
    amountDraft: number;
    titleDraft: string;
    dateDraft: Date;
    selectedCategoryDraft: CategoryResponse | null;
    notesDraft: string | null;
    locationDraft: string | null;
    merchantDraft: string | null;
    isSubscriptionDraft: boolean;
    subscriptionFrequencyDraft: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY' | null;
    subscriptionStartDateDraft: Date | null;
    subscriptionEndDateDraft: Date | null;
    toAccountDraft: TransactionAccountResponse | null;

    amountError: string | null;
    accountError: string | null;
    categoryError: string | null;
    titleError : string | null;

    // Setters for draft state
    setTransactionTypeDraft: (transactionType: 'INCOME' | 'EXPENSE' | 'TRANSFER') => void;
    setSourceAccountDraft: (sourceAccount: TransactionAccountResponse | null) => void;
    setAmountDraft: (amount: number) => void;
    setTitleDraft: (title: string) => void;
    setDateDraft: (date: Date) => void;
    setSelectedCategoryDraft: (category: CategoryResponse | null) => void;
    setNotesDraft: (notes: string | null) => void;
    setLocationDraft: (location: string | null) => void;
    setMerchantDraft: (merchant: string | null) => void;
    setIsSubscriptionDraft: (isSubscription: boolean) => void;
    setSubscriptionFrequencyDraft: (frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY' | null) => void;
    setSubscriptionStartDateDraft: (date: Date | null) => void;
    setSubscriptionEndDateDraft: (date: Date | null) => void;
    setToAccountDraft: (account: TransactionAccountResponse | null) => void;

    // Initialize draft with transaction data
    initializeDraftFromTransaction: (transaction: any) => void;

    // Reset draft to original values
    resetDraft: () => void;

    //Validations
    validateAmount: () => void;
    validateSelectedCategory: () => void;
    validateTitle: () => void;
};

const initialState: EditTransactionState = {
    transactionId: null,
    transactionType: 'EXPENSE',
    sourceAccount: null,
    amount: 0,
    title: '',
    date: new Date(),
    selectedCategory: null,
    notes: null,
    location: null,
    merchant: null,
    isSubscription: false,
    subscriptionFrequency: null,
    subscriptionStartDate: null,
    subscriptionEndDate: null,
    toAccount: null,
};

const initialDraftState = {
    transactionTypeDraft: 'EXPENSE' as const,
    sourceAccountDraft: null,
    amountDraft: 0,
    titleDraft: '',
    dateDraft: new Date(),
    selectedCategoryDraft: null,
    notesDraft: null,
    locationDraft: null,
    merchantDraft: null,
    isSubscriptionDraft: false,
    subscriptionFrequencyDraft: null,
    subscriptionStartDateDraft: null,
    subscriptionEndDateDraft: null,
    toAccountDraft: null,

    amountError: null,
    accountError: null,
    categoryError: null,
    titleError: null,
};

export const useEditTransactionStore = create<EditTransactionState & EditTransactionStoreDraft>((set, get) => ({
    ...initialState,
    ...initialDraftState,

    setTransactionTypeDraft: (transactionType) => {
        set({ transactionTypeDraft: transactionType });
    },
    setSourceAccountDraft: (sourceAccount) => {
        set({ sourceAccountDraft: sourceAccount });
    },
    setAmountDraft: (amount) => {
        set({ amountDraft: amount });
    },
    setTitleDraft: (title) => {
        set({ titleDraft: title });
    },
    setDateDraft: (date) => {
        set({ dateDraft: date });
    },
    setSelectedCategoryDraft: (category) => {
        set({ selectedCategoryDraft: category });
    },
    setNotesDraft: (notes) => {
        set({ notesDraft: notes });
    },
    setLocationDraft: (location) => {
        set({ locationDraft: location });
    },
    setMerchantDraft: (merchant) => {
        set({ merchantDraft: merchant });
    },
    setIsSubscriptionDraft: (isSubscription) => {
        set({ isSubscriptionDraft: isSubscription });
    },
    setSubscriptionFrequencyDraft: (frequency) => {
        set({ subscriptionFrequencyDraft: frequency });
    },
    setSubscriptionStartDateDraft: (date) => {
        set({ subscriptionStartDateDraft: date });
    },
    setSubscriptionEndDateDraft: (date) => {
        set({ subscriptionEndDateDraft: date });
    },
    setToAccountDraft: (account) => {
        set({ toAccountDraft: account });
    },

    //Set Validation errors
    setAmountError: (error: string | null) => {
        set({ amountError: error });
    },
    setAccountError: (error: string | null) => {
        set({ accountError: error });
    },
    setCategoryError: (error: string | null) => {
        set({ categoryError: error });
    },
    setTitleError : (error: string | null) => {
        set({titleError: error});
    },

    initializeDraftFromTransaction: (transaction : TransactionResponse) => {
        set({
            // Store original data
            transactionId: transaction.transactionId,
            transactionType: transaction.transactionType,
            sourceAccount: transaction.sourceAccount,
            amount: transaction.amount,
            title: transaction.title,
            date: new Date(transaction.transactionDate),
            selectedCategory: transaction.category,
            notes: transaction.notes,
            location: transaction.location,
            merchant: transaction.merchant,
            isSubscription: transaction.isSubscription,
            subscriptionFrequency: transaction.subscriptionFrequency,
            subscriptionStartDate: transaction.subscriptionStartDate ? new Date(transaction.subscriptionStartDate) : null,
            subscriptionEndDate: transaction.subscriptionEndDate ? new Date(transaction.subscriptionEndDate) : null,
            toAccount: transaction.toAccount ? transaction.toAccount : null,

            // Initialize draft with same values
            transactionTypeDraft: transaction.transactionType,
            sourceAccountDraft: transaction.sourceAccount,
            amountDraft: transaction.amount,
            titleDraft: transaction.title,
            dateDraft: new Date(transaction.transactionDate),
            selectedCategoryDraft: transaction.category,
            notesDraft: transaction.notes,
            locationDraft: transaction.location,
            merchantDraft: transaction.merchant,
            isSubscriptionDraft: transaction.isSubscription,
            subscriptionFrequencyDraft: transaction.subscriptionFrequency,
            subscriptionStartDateDraft: transaction.subscriptionStartDate ? new Date(transaction.subscriptionStartDate) : null,
            subscriptionEndDateDraft: transaction.subscriptionEndDate ? new Date(transaction.subscriptionEndDate) : null,
            toAccountDraft: transaction.toAccount ? transaction.toAccount : null,
        });
    },

    resetDraft: () => {
        const state = get();
        set({
            transactionTypeDraft: state.transactionType,
            sourceAccountDraft: state.sourceAccount,
            amountDraft: state.amount,
            titleDraft: state.title,
            dateDraft: state.date,
            selectedCategoryDraft: state.selectedCategory,
            notesDraft: state.notes,
            locationDraft: state.location,
            merchantDraft: state.merchant,
            isSubscriptionDraft: state.isSubscription,
            subscriptionFrequencyDraft: state.subscriptionFrequency,
            subscriptionStartDateDraft: state.subscriptionStartDate,
            subscriptionEndDateDraft: state.subscriptionEndDate,
            toAccountDraft: state.toAccount,
        });
    },

    validateSourceAccount: () => {
        const {sourceAccountDraft} = get();

        if (!sourceAccountDraft) {
            set({accountError: 'Account is required'});
            return false;
        }

        set({accountError: ''});
        return true;
    },

    validateSelectedCategory: () => {
        const {selectedCategoryDraft} = get();
        if (!selectedCategoryDraft) {
            set({categoryError: 'Category is required'});
            return false;
        }

        set({categoryError: ''});
        return true;
    },

    validateAmount: () => {
        const {amountDraft, transactionTypeDraft, sourceAccountDraft} = get();

        if (!sourceAccountDraft) {
            set({amountError: 'Choose an account first to ensure this amount is valid'});
            return false;
        }

        const {accountType, balance, creditLimit = 0} = sourceAccountDraft;

        if (amountDraft <= 0.00) {
            set({ amountError: 'Transaction amount must be greater than 0' });
            return false;
        }

        if (transactionTypeDraft === 'EXPENSE') {
            switch (accountType) {
                case AccountType.CASH:
                    if (amountDraft > balance) {
                        set({amountError: 'Not enough cash to cover this transaction'});
                        return false;
                    }
                    break;

                case AccountType.CHECKING:
                    //Note in future, if we support overdrafts, we need to add logic to handle that
                    if (amountDraft > balance) {
                        set({amountError: 'Insufficient funds'});
                        return false;
                    }
                    break;

                case AccountType.SAVINGS:
                    if (amountDraft > balance) {
                        set({amountError: 'Insufficient funds'});
                        return false;
                    }
                    break;

                case AccountType.CREDIT_CARD:
                    if (creditLimit && Math.abs(amountDraft) > Math.abs(creditLimit - balance)) {
                        set({amountError: `Exceeds the account's credit limit: $${creditLimit.toFixed(2)}`});
                        return false;
                    }
                    break;

                case AccountType.LOAN:
                    if (amountDraft > balance) {
                        set({amountError: 'Loan balance exceeded'});
                        return false;
                    }
                    break;

                case AccountType.INVESTMENT:
                    // Optional: For the future, if we support withdrawing investments
                    break;
            }
        }

        if (transactionTypeDraft === 'INCOME') {
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

    validateTitle: () => {
        const {titleDraft} = get();

        if (!titleDraft) {
            set({titleError: 'Title is required'});
            return false;
        }

        if (titleDraft.length < 3) {
            set({titleError: 'Title must be at least 3 characters long'});
            return false;
        }

        set({titleError: ''});
        return true;
    },
}));
