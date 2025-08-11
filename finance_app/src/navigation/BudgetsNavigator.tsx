import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BudgetsNavigatorParamList } from './types/BudgetsNavigatorTypes';
import { BudgetsHomeScreen } from '../features/budgets/screens/BudgetsHomeScreen/BudgetsHomeScreen';
import { CreateBudgetScreen } from '../features/budgets/screens/CreateBudgetScreen/CreateBudgetScreen';
import { BudgetDetailsScreen } from '../features/budgets/screens/BudgetDetailsScreen/BudgetDetailsScreen';

const Stack = createNativeStackNavigator<BudgetsNavigatorParamList>();

export const BudgetsNavigator = () => {
    return (
        <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
        >
            <Stack.Screen name="BudgetsHome" component={BudgetsHomeScreen} />
            <Stack.Screen name="CreateBudget" component={CreateBudgetScreen} />
            <Stack.Screen name="BudgetDetails" component={BudgetDetailsScreen} />
        </Stack.Navigator>
    );
};
