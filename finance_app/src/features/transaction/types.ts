//Frontend Types
export type CategoryResponse = {
    categoryId: string,
    categoryName: string,
    icon: string,
    color: string,
    transactionType : 'INCOME' | 'EXPENSE' | 'TRANSFER',
    isCustom: boolean,
    categoryDescription: string | null,
    createdAt: string,
    updatedAt: string | null,
}

export type CategoryListResponse = {
    categories: CategoryResponse[],
    totalCategories: number,
    hasNext: boolean,
    currentPage: number,
    pageSize: number,
};

//Backend Types
export type BackendCategoryResponse = {
    category_id: string,
    category_name: string,
    icon: string,
    color: string,
    transaction_type: 'INCOME' | 'EXPENSE' | 'TRANSFER',
    is_custom: boolean,
    category_description: string | null,
    user_id: string | null,
    created_at: string,
    updated_at: string | null,
}

export type BackendCategoryListResponse = {
    categories: BackendCategoryResponse[],
    total: number,
    has_next: boolean,
    current_page: number,
    page_size: number,
}
