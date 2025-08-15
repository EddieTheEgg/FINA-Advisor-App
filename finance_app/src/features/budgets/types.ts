export enum BudgetSpendingStatus {
    NO_DATA = 'NO_DATA',
    ON_TRACK = 'ON_TRACK',
    WARNING = 'WARNING',
    OVER_BUDGET = 'OVER_BUDGET',
}



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


export type BudgetData = {
    budgetId: string,
    categoryData: BudgetCategoryData
    budgetSpent: number,
    budgetAmount: number,
    budgetMonth: Date,
}

export type BudgetListData = {
    budgets: BudgetData[],
    hasNext: boolean,
    currentPage: number,
    pageSize: number,
}




export type CoreBudgetData = {
    budgetTitle: string,
    budgetColor: string,
    budgetIcon: string,
    budgetPeriod: Date,
    dailyAverage: number,
    budgetAmount: number,
    spentAmount: number,
    daysRemaining: number,
    projectedTotal: number,
}

export type BudgetInsightData = {
    statusType: BudgetSpendingStatus,
    dailyAllowanceLimit: number,
}

export type BudgetTransactionSummary = {
    categoryColor: string,
    categoryIcon: string,
    transactionTitle: string,
    transactionDate: Date,
    transactionAmount: number,
    transactionId: string,
}

export type BudgetDetailData = {
    coreBudgetData : CoreBudgetData,
    budgetInsight: BudgetInsightData,
    recentBudgetTransactions: BudgetTransactionSummary[]
}




//Backend
export type BackendBudgetCategoryDataResponse = {
    category_id: string,
    category_icon: string,
    category_color: string,
    category_name: string,
    category_description: string | null,
};

export type BackendBudgetDataResponse = {
    budget_id: string,
    category_data: BackendBudgetCategoryDataResponse,
    budget_spent: number,
    budget_amount: number,
    budget_month: Date,
}

export type BackendBudgetTransactionSummary = {
    category_color: string,
    category_icon: string,
    transaction_title: string,
    transaction_date: Date,
    transaction_amount: number,
    transaction_id: string,
}
