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
