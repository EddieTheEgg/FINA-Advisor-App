import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashboardScreen } from '../features/dashboard/screens/HomeScreen';
import { InsightsScreen } from '../features/insights/screens/InsightsScreen';
import { ProfileScreen } from '../features/user/screens/ProfileScreen';
import { AccountsNavigator } from './AccountsNavigator';
import { spacing } from '../styles/spacing';
import { TransactionNavigator } from './TransactionNavigatgor';


const Tab = createBottomTabNavigator();

export const HomeNavigator = () => {
    return (
        <Tab.Navigator
        screenOptions={{
            tabBarStyle : {
                 backgroundColor: '#1e1e1e',
                 position: 'absolute',
                 borderRadius: 20,
            },
        }}
        >
            <Tab.Screen name="Dashboard" component={DashboardScreen} options={{headerShown: false}} />
            <Tab.Screen name="Accounts" component={AccountsNavigator}/>
            <Tab.Screen name="Add Transaction" component={TransactionNavigator} />
            <Tab.Screen name="Insights" component={InsightsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    );
};
