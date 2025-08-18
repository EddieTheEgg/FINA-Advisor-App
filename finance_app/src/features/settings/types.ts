export type CategoryManageSummary = {
    categoryId: string;
    categoryName: string;
    categoryDescription: string;
    categoryType: 'INCOME' | 'EXPENSE' | 'TRANSFER';
    categoryIcon: string;
    categoryColor: string;
    usedInTransactions: number;
};

export type CategoryManageResponse = {
    categories: CategoryManageSummary[]
    totalCategories: number;
    hasNext: boolean;
    currentPage: number;
    pageSize: number;
};

//Backend types

export type BackendCategoryManageSummary = {
    category_id: string;
    category_name: string;
    category_color: string;
    category_description: string;
    category_type: 'INCOME' | 'EXPENSE' | 'TRANSFER'
    category_icon: string;
    used_in_transactions: number;
}

