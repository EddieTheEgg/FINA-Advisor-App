import { View, Text, SafeAreaView, ScrollView } from 'react-native';
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

export const HomeScreen = () => {
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

    if (isPending){
        return(
            <LoadingScreen />
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.mainContainer}>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Failed to load dashboard data</Text>
                    <Text style={styles.errorSubText}>Please try again later</Text>
                    <Text style={styles.errorSubText}>Error: {error.message}</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView>
            <View style={styles.headerContainer}>
                <View>
                    <Greeting styles={styles.greetingText} />
                    <Text style={styles.nameText}> {dashboard?.user.firstName}</Text>
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
                }} />
            </View>
            {isPending ? (
                <LoadingScreen />
            ) : (
                <View>
                    <View style = {styles.monthlyBalanceContainer}>
                    <View >
                            <View>
                                <BalanceDisplay
                                    selectedMonth={convertMonthToNumber(selectedMonth)}
                                    selectedYear={selectedYear}
                                />
                            </View>
                            <View>
                                <BalanceBadge
                                    selectedMonth={convertMonthToNumber(selectedMonth)}
                                    selectedYear={selectedYear}
                                />
                            </View>
                        </View>
                        <View>
                            <AccountCircle accounts={dashboard?.accounts} />
                        </View>
                    </View>
                    <View style = {styles.monthlyIncomeExpenseContainer}>
                        <IncomeExpense
                            selectedMonth={convertMonthToNumber(selectedMonth)}
                            selectedYear={selectedYear}
                        />
                    </View>
                </View>
            )}
            </ScrollView>
        </SafeAreaView>
    );
};
