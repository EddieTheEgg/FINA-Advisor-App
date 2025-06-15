import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { fontSize } from '../../../../styles/fontSizes';
import { spacing } from '../../../../styles/spacing';

export const styles = StyleSheet.create({
    recentTransactionsContainer: {
        backgroundColor: colors.white,
        borderRadius: 20,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        marginHorizontal: spacing.sm,
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.3)',
    },
    recentTransactionsTitle: {
        fontSize: fontSize.lg,
        color: colors.black,
        fontFamily: 'Poppins-SemiBold',
    },
    recentTransactionsTitleContainer : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.sm,
    },
    viewAllTransactionsButton : {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    recentTransactionsButtonText : {
        fontFamily: 'Poppins-Regular',
        fontSize: fontSize.sm,
        color: colors.gray[600],
        includeFontPadding: false,
    },
    separator : {
      backgroundColor: colors.gray[200],
      height: 1,
      borderRadius: 12,
      marginVertical: spacing.sm,
    },
});
