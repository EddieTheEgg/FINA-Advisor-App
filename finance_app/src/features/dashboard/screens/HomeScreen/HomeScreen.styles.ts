import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { fontSize } from '../../../../styles/fontSizes';
import { spacing } from '../../../../styles/spacing';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: spacing.md,
        marginTop: spacing.md,
    },
    settingsButton : {
        backgroundColor: colors.white,
        padding: spacing.md,
        borderRadius: 20,
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.3)',
    },
    greetingContainer : {
        alignContent: 'flex-start',
    },
    greetingText: {
        fontSize: fontSize.base,
        color: colors.gray[500],
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
        marginVertical: spacing.sm,
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
