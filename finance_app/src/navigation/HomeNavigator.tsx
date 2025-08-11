import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { InsightsScreen } from '../features/insights/screens/InsightsScreen';
import { AccountsNavigator } from './AccountsNavigator';
import { TransactionNavigator } from './TransactionNavigator';
import { CustomTabBar } from '../components/CustomTabBar/CustomTabBar';
import { HomeStackParamList } from './types/HomeNavigatorTypes';
import { DashboardNavigator } from './DashboardNavigator';
import { BudgetsNavigator } from './BudgetsNavigator';

const Tab = createBottomTabNavigator<HomeStackParamList>();

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
            <Tab.Screen name="Dashboard" component={DashboardNavigator} />
            <Tab.Screen name="Accounts" component={AccountsNavigator}/>
            <Tab.Screen name="Transactions" component={TransactionNavigator} />
            <Tab.Screen name="Insights" component={InsightsScreen} />
            <Tab.Screen name="Budgets" component={BudgetsNavigator} />
        </Tab.Navigator>
    );
};
