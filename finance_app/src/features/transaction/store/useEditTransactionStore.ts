import { create } from 'zustand';
import { BackendTransactionUpdateRequest, CategoryResponse, TransactionAccountResponse, TransactionResponse } from '../types';
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
    subscriptionError: string | null;

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
    validateSourceAccount: () => boolean;
    validateAmount: () => boolean;
    validateSelectedCategory: () => boolean;
    validateTitle: () => boolean;
    validateSubscription: () => boolean;
    validateEditTransaction: () => boolean;

    //Formatting
    formatEditTransactionForBackend: () => BackendTransactionUpdateRequest;
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
    subscriptionError: null,
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

            // Clear validation errors
            amountError: null,
            accountError: null,
            categoryError: null,
            titleError: null,
            subscriptionError: null,
        });
    },

    resetDraft: () => {
        set({
            ...initialState,
            ...initialDraftState,
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

    validateSubscription: () => {
        const {isSubscriptionDraft, subscriptionStartDateDraft, subscriptionEndDateDraft} = get();

        // If this is a subscription, start date is required
        if (isSubscriptionDraft && !subscriptionStartDateDraft) {
            set({subscriptionError: 'Start date is required for recurring transactions'});
            return false;
        }

        // If both dates are provided, validate that start is before end
        if (subscriptionStartDateDraft && subscriptionEndDateDraft && subscriptionStartDateDraft.getTime() >= subscriptionEndDateDraft.getTime()) {
            set({subscriptionError: 'Start date must be before end date'});
            return false;
        }

        set({subscriptionError: ''});
        return true;
    },

    // Make sure all fields (that have validation) are valid before creating a transaction
    validateEditTransaction: () => {
        const {validateTitle, validateAmount, validateSelectedCategory, validateSourceAccount, validateSubscription} = get();

        const titleValid = validateTitle();
        const amountValid = validateAmount();
        const subscriptionValid = validateSubscription();
        const selectedCategoryValid = validateSelectedCategory();
        const sourceAccountValid = validateSourceAccount();

        return titleValid && amountValid && subscriptionValid && selectedCategoryValid && sourceAccountValid;
    },

    formatEditTransactionForBackend: (): BackendTransactionUpdateRequest => {
        const {
            transactionId,
            transactionTypeDraft,
            sourceAccountDraft,
            amountDraft,
            titleDraft,
            dateDraft,
            selectedCategoryDraft,
            notesDraft,
            locationDraft,
            merchantDraft,
            isSubscriptionDraft,
            subscriptionFrequencyDraft,
            subscriptionStartDateDraft,
            subscriptionEndDateDraft,
            toAccountDraft
        } = get();

        return {
            transaction_id: transactionId!,
            transaction_type: transactionTypeDraft as 'INCOME' | 'EXPENSE',
            sourceAccount: {
                account_id: sourceAccountDraft!.accountId,
                name: sourceAccountDraft!.name,
                account_type: sourceAccountDraft!.accountType,
                balance: sourceAccountDraft!.balance,
                color: sourceAccountDraft!.color,
                icon: sourceAccountDraft!.icon,
                credit_limit: sourceAccountDraft!.creditLimit
            },
            amount: amountDraft,
            title: titleDraft,
            date: dateDraft.toISOString().split('T')[0], // Convert to YYYY-MM-DD format
            categoryId: selectedCategoryDraft!.categoryId,
            notes: notesDraft,
            location: locationDraft,
            merchant: merchantDraft,
            is_subscription: isSubscriptionDraft,
            subscription_frequency: subscriptionFrequencyDraft,
            subscription_start_date: subscriptionStartDateDraft ? subscriptionStartDateDraft.toISOString().split('T')[0] : null,
            subscription_end_date: subscriptionEndDateDraft ? subscriptionEndDateDraft.toISOString().split('T')[0] : null,
            to_account: toAccountDraft ? {
                account_id: toAccountDraft.accountId,
                name: toAccountDraft.name,
                account_type: toAccountDraft.accountType,
                balance: toAccountDraft.balance,
                color: toAccountDraft.color,
                icon: toAccountDraft.icon,
                credit_limit: toAccountDraft.creditLimit
            } : null
        };
    },
}));
