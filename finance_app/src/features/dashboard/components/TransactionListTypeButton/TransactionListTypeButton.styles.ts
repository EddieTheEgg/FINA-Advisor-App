import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    activeTransactionListType: {
        backgroundColor: colors.darkerBackground,
        padding: spacing.md,
        paddingHorizontal: spacing.sm + 2,
        borderRadius: 10,
        fontSize: fontSize.xs,
    },
    activeTransactionListTypeText : {
        fontSize: fontSize.sm,
        color: colors.white,
        fontFamily: 'Poppins-SemiBold',
    },
    inactiveTransactionListType: {
        backgroundColor: colors.gray[100],
        padding: spacing.md,
        paddingHorizontal: spacing.sm + 2,
        borderRadius: 10,
        fontSize: fontSize.xs,
    },
     inactiveTransactionListTypeText : {
        fontSize: fontSize.sm,
        color: colors.gray[500],
        fontFamily: 'Poppins-SemiBold',
    },
    allTransactionListType: {
        paddingHorizontal: spacing.lg,
    },
});
