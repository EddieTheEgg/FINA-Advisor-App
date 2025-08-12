import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type BudgetsNavigatorParamList = {
    BudgetsHome: undefined;
    CreateBudget: undefined;
    BudgetDetails: { budgetId: string };
    BudgetCategoryList: undefined;
};

export type BudgetsNavigatorProps = NativeStackNavigationProp<BudgetsNavigatorParamList>;
