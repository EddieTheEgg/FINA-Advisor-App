import { View, Text } from 'react-native';
import { DashboardData } from '../../types';
import { styles } from './IncomeExpense.styles';

type IncomeExpenseProps = {
    dashboard: DashboardData;
}

export const IncomeExpense = ({ dashboard }: IncomeExpenseProps) => {
    const currencySymbol = '$';
    const financialSummary = dashboard.financialSummary;

    return (
        <View style={styles.expenseIncomeContainer}>
            <View style={styles.expenseIncomeTextContainer}>
                <Text style={styles.expenseIncomeLabel}>Income</Text>
                <Text style={styles.incomeText}>
                    +{currencySymbol}{financialSummary.monthlyIncome.toFixed(2)}
                </Text>
            </View>
            <View style={styles.expenseIncomeTextContainer}>
                <Text style={styles.expenseIncomeLabel}>Expense</Text>
                <Text style={styles.expenseText}>
                    -{currencySymbol}{financialSummary.monthlyExpense.toFixed(2)}
                </Text>
            </View>
            <View style={styles.expenseIncomeTextContainer}>
                <Text style={styles.expenseIncomeLabel}>Transfers</Text>
                <Text style={styles.transferText}>
                    {currencySymbol}{financialSummary.monthlyTransfer.toFixed(2)}
                </Text>
            </View>
        </View>
    );
};
