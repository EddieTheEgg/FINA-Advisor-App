import { StyleSheet } from 'react-native';
import { spacing } from '../../../../styles/spacing';
import { colors } from '../../../../styles/colors';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    transactionCardContainer : {
        flexDirection: 'row',
        padding: spacing.md,
        alignItems: 'center',
        gap: spacing.md,
        borderRadius: 20,
    },
    transactionCardIcon: {
        borderRadius: 10,
        fontSize: fontSize.xxl,
        padding: spacing.sm,
    },
    transactionTitle : {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
    },
    transactionDetailContainer : {
        flex: 2,
    },
    accountNameText : {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
    },
    transactionSubInfoText: {
        fontSize: fontSize.sm,
        fontWeight: 500,
        fontFamily: 'Poppins-Regular',
        color: colors.gray[500],
    },
    transactionBalanceText : {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
    },
    transactionAmount: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
    },
    incomeAmount: {
        color: colors.darkerGreen,
    },
    expenseAmount: {
        color: colors.red,
    },
    transferAmount: {
        color: colors.gray[600],
    },
});
