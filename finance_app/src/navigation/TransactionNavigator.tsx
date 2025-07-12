import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CreateTransactionScreen } from '../features/transaction/screens/CreateTransactionScreen/CreateTransactionScreen';
import { SelectCategoryScreen } from '../features/transaction/screens/SelectCategoryScreen/SelectCategoryScreen';
import { SelectAccountScreen } from '../features/transaction/screens/SelectAccountScreen/SelectAccountScreen';
import { TransactionNavigatorParamList } from './types/TransactionNavigatorTypes';

const Stack = createNativeStackNavigator<TransactionNavigatorParamList>();

export const TransactionNavigator = () => {
    return (
      <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      >
            <Stack.Screen name = "CreateTransaction" component={CreateTransactionScreen} />
            <Stack.Screen name = "SelectAccount" component = {SelectAccountScreen} />
            <Stack.Screen name = "SelectCategory" component = {SelectCategoryScreen} />
        </Stack.Navigator>
    );
  };
