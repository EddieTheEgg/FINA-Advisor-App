export type CategoryManageSummary = {
    categoryId: string;
    categoryName: string;
    categoryDescription: string | null;
    categoryType: 'INCOME' | 'EXPENSE' | 'TRANSFER';
    categoryIcon: string;
    categoryColor: string;
    usedInTransactions: number;
    usedInBudgets: number;
};

export type CategoryManageResponse = {
    categories: CategoryManageSummary[]
    totalCategories: number;
    hasNext: boolean;
    currentPage: number;
    pageSize: number;
};


export type UserProfile = {
    firstName: string;
    lastName: string;
    email: string;
}

//Backend types

export type BackendCategoryManageSummary = {
    category_id: string;
    category_name: string;
    category_color: string;
    category_description: string;
    category_type: 'INCOME' | 'EXPENSE' | 'TRANSFER'
    category_icon: string;
    used_in_transactions: number;
    used_in_budgets: number;
}

export type UpdateCategoryRequest = {
    category_id: string;
    category_name: string;
    category_description: string | null;
    category_type: 'INCOME' | 'EXPENSE' | 'TRANSFER';
    category_icon: string;
    category_color: string;
}

export type CreateCategoryRequest = {
    category_name: string;
    category_description: string | null;
    category_type: 'INCOME' | 'EXPENSE' | 'TRANSFER';
    category_icon: string;
    category_color: string;
}

export type UpdateProfileRequest = {
    first_name: string;
    last_name: string;
    email: string;
}

export type UpdatePasswordRequest = {
    current_password: string;
    new_password: string;
    new_password_confirm: string;
}
