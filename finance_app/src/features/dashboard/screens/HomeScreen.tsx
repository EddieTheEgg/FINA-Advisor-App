import { View, Text, ScrollView, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SignOutButton } from '../../auth/components/SignOutButton/SignOutButton';
import { styles } from './HomeScreen.styles';
import Greeting from '../components/Greeting/Greeting';
import MonthSelector from '../components/MonthSelector/MonthSelector';
import BalanceDisplay from '../components/BalanceDisplay/BalanceDisplay';
import { useDashboardQuery } from '../hooks/useDashboard';
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen';
import { useState } from 'react';
import BalanceBadge from '../components/BalanceBadge/BalanceBadge';
import AccountCircle from '../components/AccountCircle/AccountCircle';
import { IncomeExpense } from '../components/IncomeExpense/IncomeExpense';
import { RecentTransactions } from '../components/RecentTransactions/RecentTransactions';

const { height } = Dimensions.get('window');
const responsivePadding = height * 0.2;

export const DashboardScreen = () => {
    const insets = useSafeAreaInsets();
    const todayDate = new Date();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    //Convert month (string) to numeric version for backend to process
    const convertMonthToNumber = (month: string) => {
        const monthMap = {
            'January': 1,
            'February': 2,
            'March': 3,
            'April': 4,
            'May': 5,
            'June': 6,
            'July': 7,
            'August': 8,
            'September': 9,
            'October': 10,
            'November': 11,
            'December': 12,
        };
        return monthMap[month as keyof typeof monthMap];
    };

    const [selectedMonth, setSelectedMonth] = useState(monthNames[todayDate.getMonth()]);
    const [selectedYear, setSelectedYear] = useState(todayDate.getFullYear());

    const {data: dashboard, isPending, error} = useDashboardQuery(convertMonthToNumber(selectedMonth), selectedYear);

    if (error) {
        return (
            <View style={[styles.container, { paddingTop: insets.top }]}>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Failed to load dashboard data</Text>
                    <Text style={styles.errorSubText}>Please try again later</Text>
                    <Text style={styles.errorSubText}>Error: {error.message}</Text>
                </View>
            </View>
        );
    }

    if (isPending || !dashboard) {
        return <LoadingScreen />;
    }

    console.log(dashboard);

    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <ScrollView
                contentContainerStyle={{ paddingBottom: insets.bottom + responsivePadding }}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.headerContainer}>
                    <View>
                        <Greeting styles={styles.greetingText} />
                        <Text style={styles.nameText}>{dashboard.user.firstName}</Text>
                    </View>
                    <View>
                        <SignOutButton />
                    </View>
                </View>
                <View style={styles.monthSelectorContainer}>
                    <MonthSelector
                        month={selectedMonth}
                        year={selectedYear}
                        onPeriodChange={(month : string, year : number) => {
                            setSelectedMonth(month);
                            setSelectedYear(year);
                        }}
                    />
                </View>
                <View>
                    <View style={styles.monthlyBalanceContainer}>
                        <View>
                            <View>
                                <BalanceDisplay dashboard={dashboard} />
                            </View>
                            <View>
                                <BalanceBadge dashboard={dashboard} />
                            </View>
                        </View>
                        <View>
                            <AccountCircle accounts={dashboard.accounts} />
                        </View>
                    </View>
                    <View style={styles.monthlyIncomeExpenseContainer}>
                        <IncomeExpense dashboard={dashboard} />
                    </View>
                </View>
                <View style = {styles.recentTransactionsContainer}>
                    <RecentTransactions recentTransactions={dashboard.recentTransactions} />
                </View>
            </ScrollView>
        </View>
    );
};

