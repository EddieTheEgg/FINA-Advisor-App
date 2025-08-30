import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DashboardStackParamList } from './types/DashboardNavigatorTypes.ts';
import { DashboardScreen } from '../features/dashboard/screens/HomeScreen/HomeScreen.tsx';
import { TransactionListScreen } from '../features/dashboard/screens/TransactionListScreen/TransactionListScreen.tsx';
import { SettingsScreen } from '../features/settings/screens/SettingsScreen/SettingsScreen.tsx';
import { ManageCategoriesScreen } from '../features/settings/screens/ManageCategoriesScreen/ManageCategoriesScreen.tsx';
import { EditCategoryScreen } from '../features/settings/screens/EditCategoryScreen/EditCategoryScreen.tsx';
import { CreateCategoryScreen } from '../features/settings/screens/CreateCategoryScreen/CreateCategoryScreen.tsx';
import { EditProfileScreen } from '../features/settings/screens/EditProfileScreen/EditProfileScreen.tsx';

const Stack = createNativeStackNavigator<DashboardStackParamList>();

export const DashboardNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
            }}
        >
            <Stack.Screen name="DashboardMenu" component={DashboardScreen} />
            <Stack.Screen name="TransactionList" component = {TransactionListScreen} />
            <Stack.Screen name="Settings" component = {SettingsScreen} />
            <Stack.Screen name="ManageCategories" component = {ManageCategoriesScreen} />
            <Stack.Screen name="EditCategory" component = {EditCategoryScreen} />
            <Stack.Screen name="CreateCategory" component = {CreateCategoryScreen} />
            <Stack.Screen name="EditProfile" component = {EditProfileScreen} />
        </Stack.Navigator>
    );
};
