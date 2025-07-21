import { StyleSheet } from 'react-native';
import { spacing } from '../../../../styles/spacing';
import { colors } from '../../../../styles/colors';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    transactionItemContainer: {
        flexDirection: 'row',
        padding: spacing.md,
        gap: spacing.md,
        alignItems: 'center',
    },
    transactionItemIcon : {
        fontSize: fontSize.xl,
        padding: spacing.sm + 5,
        borderRadius: 10,
        alignSelf: 'flex-start',
    },
    transactionItemTitle : {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
    },
    transactionItemContent : {
        flex: 2,
    },
    transactionItemSubInfoText: {
        fontSize: fontSize.sm,
        fontWeight: 500,
        fontFamily: 'Poppins-Regular',
        color: colors.gray[500],
    },
    transactionAmount: {
        fontSize: fontSize.lg,
        textAlign: 'right',
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
