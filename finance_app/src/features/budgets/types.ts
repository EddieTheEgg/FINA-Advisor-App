export type BudgetCategoryData = {
    categoryId: string,
    categoryIcon: string,
    categoryColor: string,
    categoryName: string,
    categoryDescription: string | null,
};


export type BudgetCategoryListData = {
    categories: BudgetCategoryData[],
    hasNext: boolean,
    currentPage: number,
    pageSize: number,
}

export type CreateBudgetPayload = {
    category_id: string,
    budget_amount: number,
    budget_month: string, // YYYY-MM-DD format for backend
}




//Backend
export type BackendBudgetCategoryDataResponse = {
    category_id: string,
    category_icon: string,
    category_color: string,
    category_name: string,
    category_description: string | null,
};
