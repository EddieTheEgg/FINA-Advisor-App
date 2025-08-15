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
    budgetMonth: string, // ISO date string from backend
}

export type BudgetListData = {
    budgets: BudgetData[],
    hasNext: boolean,
    currentPage: number,
    pageSize: number,
}




export type CoreBudgetData = {
    budgetId: string,
    budgetTitle: string,
    budgetColor: string,
    budgetIcon: string,
    budgetPeriod: Date, // ISO date string from backend
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
    transactionDate: string, // ISO date string from backend
    transactionAmount: number,
    transactionId: string,
}

export type BudgetDetailData = {
    categoryData : BudgetCategoryData
    coreBudgetData : CoreBudgetData,
    budgetInsight: BudgetInsightData,
    recentBudgetTransactions: BudgetTransactionSummary[]
}

export type BudgetTransactionsData = {
    transactions: BudgetTransactionSummary[],
    transactionCount: number,
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


