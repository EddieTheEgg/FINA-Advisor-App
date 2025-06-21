import { StyleSheet } from 'react-native';
import { colors } from '../../../styles/colors';
import { fontSize } from '../../../styles/fontSizes';
import { spacing } from '../../../styles/spacing';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: spacing.lg,
        marginTop: spacing.md,
    },
    greetingText: {
        fontSize: fontSize.base,
        color: colors.gray[500],
        marginLeft: 5, // Poppins font has a built in spacing, so need this minor adjustment
    },
    nameText: {
        fontSize: fontSize.xxl,
        fontWeight: 'bold',
        color: colors.black,
    },

    monthSelectorContainer: {
        marginTop: spacing.md,
    },

    monthlyBalanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing.md,
        marginHorizontal: spacing.sm,
        gap: spacing.md,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: spacing.md,
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.3)',
    },

    monthlyIncomeExpenseContainer: {
        marginTop: spacing.sm,
    },

    recentTransactionsContainer: {
        marginTop: spacing.sm,
    },
});
