import { StyleSheet } from 'react-native';
import { spacing } from '../../../../styles/spacing';
import { colors } from '../../../../styles/colors';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    recurringTransactionContainer: {
        backgroundColor: colors.white,
        padding: spacing.md,
        borderRadius: 20,
        gap: spacing.sm,
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    },
    recurringTransactionToggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    recurringTransactionDetailsContainer: {
        marginTop: spacing.md,
        gap: spacing.sm,
    },
    recurringTransactionDetailsTitle: {
        includeFontPadding: false,
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        color: colors.black,
    },
    recurringTransactionError: {
        color: colors.red,
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-Regular',
    },
});
