import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    container : {
        backgroundColor: colors.white,
        padding: spacing.md,
        borderRadius: 20,
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.3)',
    },
    title: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        marginBottom: spacing.md,
    },
    transactionItem: {
        flexDirection: 'row',
        gap: spacing.sm,
        alignItems: 'center',
    },
    transactionIcon: {
        padding: spacing.sm + 2,
        borderRadius: 10,
        fontSize: fontSize.base,
    },
    transactionDetails: {
        alignItems: 'flex-start',
        flex: 2,
    },
    transactionTitle: {
        fontSize: fontSize.base,
        fontFamily: 'Poppins-SemiBold',
    },
    transactionDate: {
        fontSize: fontSize.sm,
        color: colors.gray[600],
        fontFamily: 'Poppins-Medium',
    },
    transactionAmount: {
        fontSize: fontSize.base,
        textAlign: 'right',
        fontFamily: 'Poppins-SemiBold',
    },
    transactionSeparator : {
        height: 1,
        backgroundColor: colors.gray[200],
        marginVertical: spacing.md,
    },
    viewAllTransactionsButton: {
        alignSelf: 'center',
        marginTop: spacing.sm,
        alignItems: 'center',
    },
    viewAllTransactionsButtonText : {
        fontSize: fontSize.sm + 2,
        color: colors.darkerBackground,
        fontFamily: 'Poppins-SemiBold',
        includeFontPadding: false,
    },
     noTransactionsContainer: {
        alignItems: 'center',
        backgroundColor: colors.white,
        padding: spacing.md,
        borderRadius: 20,
    },
    noTransactionsIcon: {
        color: colors.gray[600],
    },
    noTransactionsText: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        color: colors.gray[600],
    },
});
