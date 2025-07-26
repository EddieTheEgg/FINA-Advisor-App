import { create } from 'zustand';
import { CategoryResponse } from '../types';
import { AccountType } from '../../accounts/types';

// Simplified account type for transaction editing
type SimpleAccountInfo = {
    accountId: string;
    accountName: string;
    accountIcon: string;
    accountColor: string;
    accountBalance: number;
    accountType: AccountType;
};

type EditTransactionState = {
    // Original transaction data
    transactionId: string | null;
    transactionType: 'INCOME' | 'EXPENSE' | 'TRANSFER';
    sourceAccount: SimpleAccountInfo | null;
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
    toAccount: SimpleAccountInfo | null; // For transfers
};

type EditTransactionStoreDraft = {
    // Draft state for editing
    transactionTypeDraft: 'INCOME' | 'EXPENSE' | 'TRANSFER';
    sourceAccountDraft: SimpleAccountInfo | null;
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
    toAccountDraft: SimpleAccountInfo | null;

    // Setters for draft state
    setTransactionTypeDraft: (transactionType: 'INCOME' | 'EXPENSE' | 'TRANSFER') => void;
    setSourceAccountDraft: (sourceAccount: SimpleAccountInfo | null) => void;
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
    setToAccountDraft: (account: SimpleAccountInfo | null) => void;

    // Initialize draft with transaction data
    initializeDraftFromTransaction: (transaction: any) => void;

    // Reset draft to original values
    resetDraft: () => void;
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

    initializeDraftFromTransaction: (transaction) => {
        set({
            // Store original data
            transactionId: transaction.transactionId,
            transactionType: transaction.transactionType,
            sourceAccount: {
                accountId: transaction.accountId,
                accountName: transaction.accountName,
                accountIcon: transaction.accountIcon,
                accountColor: transaction.accountColor,
                accountBalance: transaction.accountBalance,
                accountType: transaction.accountType,
            },
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
            toAccount: transaction.toAccountName ? {
                accountId: '', // We don't have the ID from the transaction response
                accountName: transaction.toAccountName,
                accountIcon: transaction.toAccountIcon,
                accountColor: transaction.toAccountColor,
                accountBalance: transaction.toAccountBalance,
                accountType: transaction.toAccountType,
            } : null,

            // Initialize draft with same values
            transactionTypeDraft: transaction.transactionType,
            sourceAccountDraft: {
                accountId: transaction.accountId,
                accountName: transaction.accountName,
                accountIcon: transaction.accountIcon,
                accountColor: transaction.accountColor,
                accountBalance: transaction.accountBalance,
                accountType: transaction.accountType,
            },
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
            toAccountDraft: transaction.toAccountName ? {
                accountId: '',
                accountName: transaction.toAccountName,
                accountIcon: transaction.toAccountIcon,
                accountColor: transaction.toAccountColor,
                accountBalance: transaction.toAccountBalance,
                accountType: transaction.toAccountType,
            } : null,
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
}));
