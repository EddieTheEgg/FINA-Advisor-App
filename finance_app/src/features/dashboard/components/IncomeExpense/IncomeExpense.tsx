import { View, Text } from 'react-native';
import { DashboardPeriodProps } from '../../types';
import { useDashboardQuery } from '../../hooks/useDashboard';
import { styles } from './IncomeExpense.styles';

export const IncomeExpense = ({selectedMonth, selectedYear} : DashboardPeriodProps) => {
    const {data: dashboard} = useDashboardQuery(selectedMonth, selectedYear);
    const currencySymbol = '$';

    return (
        <View style = {styles.expenseIncomeContainer}>
            <View style = {styles.expenseIncomeTextContainer}>
                <Text style= {styles.expenseIncomeLabel}>Income</Text>
                <Text style = {styles.incomeText}>
                    +{currencySymbol}{dashboard?.financialSummary.monthlyIncome.toFixed(2)}
                </Text>
            </View>
            <View style = {styles.expenseIncomeTextContainer}>
                <Text style= {styles.expenseIncomeLabel}>Expense</Text>
                <Text style = {styles.expenseText}>
                    -{currencySymbol}{dashboard?.financialSummary.monthlyExpense.toFixed(2)}
                </Text>
            </View>
            <View style={styles.expenseIncomeTextContainer}>
                <Text style={styles.expenseIncomeLabel}>Transfers</Text>
                <Text style={styles.transferText}>
                    {currencySymbol}{dashboard?.financialSummary.monthlyTransfer.toFixed(2)}
                </Text>
            </View>
        </View>
    );
};
