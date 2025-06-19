import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashboardScreen } from '../features/dashboard/screens/HomeScreen';
import { InsightsScreen } from '../features/insights/screens/InsightsScreen';
import { ProfileScreen } from '../features/user/screens/ProfileScreen';
import { AccountsNavigator } from './AccountsNavigator';
import { TransactionNavigator } from './TransactionNavigatgor';
import { CustomTabBar } from '../components/CustomTabBar/CustomTabBar';

const Tab = createBottomTabNavigator();

const renderCustomTabBar = (props: BottomTabBarProps) => <CustomTabBar {...props} />;

export const HomeNavigator = () => {
    return (
        <Tab.Navigator
            tabBar={renderCustomTabBar}
            screenOptions={{
                headerShown: false,
                animation: 'shift',
            }}
        >
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="Accounts" component={AccountsNavigator}/>
            <Tab.Screen name="Transactions" component={TransactionNavigator} />
            <Tab.Screen name="Insights" component={InsightsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};
