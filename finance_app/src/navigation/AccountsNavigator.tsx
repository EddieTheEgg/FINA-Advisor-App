import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AccountsListScreen } from '../features/accounts/screens/AccountsListScreen/AccountsListScreen';
import { AccountDetailsScreen } from '../features/accounts/screens/AccountDetailsScreen/AccountDetailsScreen';
import { AccountTransactionsScreen } from '../features/accounts/screens/AccountTransactionsScreen/AccountTransactionScreen';

const Stack = createNativeStackNavigator();

export const AccountsNavigator = () => {
    return (
      <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      >
            <Stack.Screen name="AccountsList" component={AccountsListScreen} />
            <Stack.Screen name="AccountDetails" component={AccountDetailsScreen} />
            <Stack.Screen name="AccountTransactions" component={AccountTransactionsScreen} />
      </Stack.Navigator>
    );
  };
