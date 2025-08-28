import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AccountsListScreen } from '../features/accounts/screens/AccountsListScreen/AccountsListScreen';
import { AccountDetailsScreen } from '../features/accounts/screens/AccountDetailsScreen/AccountDetailsScreen';
import { AccountNavigatorParamList } from './types/AccountNavigatorTypes';
import { TransferScreen } from '../features/accounts/screens/TransferScreen/TransferScreen';
import { TransferAccountSelectionScreen } from '../features/accounts/screens/TransferAccountSelectionScreen/TransferAccountSelectionScreen';
import { AddAccountScreen } from '../features/accounts/screens/AddAccountScreen/AddAccountScreen';

const Stack = createNativeStackNavigator<AccountNavigatorParamList>();

export const AccountsNavigator = () => {
    return (
      <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      >
            <Stack.Screen name="AccountsList" component={AccountsListScreen} />
            <Stack.Screen name="AccountDetails" component={AccountDetailsScreen} />
            <Stack.Screen name="Transfer" component={TransferScreen} />
            <Stack.Screen name= "TransferAccountSelection" component={TransferAccountSelectionScreen} />
            <Stack.Screen name= "AddAccount" component={AddAccountScreen} />
      </Stack.Navigator>
    );
  };
