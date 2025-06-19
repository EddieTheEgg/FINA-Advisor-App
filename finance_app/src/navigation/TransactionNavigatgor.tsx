import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CreateTransactionScreen } from '../features/transaction/screens/CreateTransactionScreen';

const Stack = createNativeStackNavigator();

export const TransactionNavigator = () => {
    return (
      <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      >
            <Stack.Screen name = "Create Transaction" component={CreateTransactionScreen} />
        </Stack.Navigator>
    );
  };
