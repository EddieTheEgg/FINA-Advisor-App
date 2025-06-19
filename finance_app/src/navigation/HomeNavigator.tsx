import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashboardScreen } from '../features/dashboard/screens/HomeScreen';
import { InsightsScreen } from '../features/insights/screens/InsightsScreen';
import { ProfileScreen } from '../features/user/screens/ProfileScreen';
import { AccountsNavigator } from './AccountsNavigator';
import { TransactionNavigator } from './TransactionNavigatgor';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { View } from 'react-native';
import { styles } from './HomeNavigator.styles';
import { colors } from '../styles/colors';

const Tab = createBottomTabNavigator();

const getTabBarIcon = ({ route, size, focused }: any) => {
    let iconName: string = 'help-outline';

    if (route.name === 'Dashboard') {
      iconName = 'house';
    } else if (route.name === 'Accounts') {
      iconName = 'wallet';
    } else if (route.name === 'Transactions') {
      iconName = 'plus';
    } else if (route.name === 'Insights') {
      iconName = 'chart-line';
    } else if (route.name === 'Profile') {
      iconName = 'user';
    }

    const isTransactionsTab = route.name === 'Transactions';

    return (
      <View style={isTransactionsTab ? styles.transactionTabContainer : null}>
        {focused ? (
            <View style={isTransactionsTab ? styles.activeTransactionIconContainer : styles.activeIconContainer}>
                <View style={isTransactionsTab ? styles.transactionIconBarLine : styles.iconBarLine} />
                <FontAwesome6
                name={iconName}
                size={isTransactionsTab ? size + 5 : size}
                color={isTransactionsTab ? colors.white : colors.darkerBackground}
                style={isTransactionsTab ? { transform: [{ rotate: '45deg' }] } : null}
                />
            </View>
        ) : (
            <View style={isTransactionsTab ? styles.transactionIconContainer : null}>
                <FontAwesome6
                name={iconName}
                size={isTransactionsTab ? size + 5 : size}
                color={isTransactionsTab ? colors.white : colors.gray[600]}
                style={isTransactionsTab ? { transform: [{ rotate: '45deg' }] } : null}
                />
            </View>
        )}
      </View>
    );
  };

export const HomeNavigator = () => {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarStyle : styles.tabBar,
            tabBarShowLabel: false,
            tabBarIcon: (props) => getTabBarIcon({ route, ...props }),
        })}
        >
            <Tab.Screen name="Dashboard" component={DashboardScreen} options={{headerShown: false}} />
            <Tab.Screen name="Accounts" component={AccountsNavigator}/>
            <Tab.Screen name="Transactions" component={TransactionNavigator} />
            <Tab.Screen name="Insights" component={InsightsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    );
};
