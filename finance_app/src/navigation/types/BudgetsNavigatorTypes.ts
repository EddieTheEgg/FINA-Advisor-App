import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type BudgetsNavigatorParamList = {
    BudgetsHome: undefined;
    CreateBudget: undefined;
    BudgetDetails: { budgetId: string, monthDate: string };
    BudgetCategoryList: undefined;
    BudgetTransactions: { budgetId: string, monthDate: string };
    EditBudget: { budgetId: string };
};

export type BudgetsNavigatorProps = NativeStackNavigationProp<BudgetsNavigatorParamList>;
