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




//Backend
export type BackendBudgetCategoryDataResponse = {
    category_id: string,
    category_icon: string,
    category_color: string,
    category_name: string,
    category_description: string | null,
};
