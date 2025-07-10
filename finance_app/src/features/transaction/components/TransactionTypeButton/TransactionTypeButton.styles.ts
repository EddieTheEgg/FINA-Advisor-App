import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    activeTransactionType: {
        backgroundColor: colors.darkerBackground,
        padding: spacing.md,
        paddingHorizontal: spacing.lg,
        borderRadius: 10,
        fontSize: fontSize.lg,
    },
    activeTransactionTypeText : {
        color: colors.white,
        fontFamily: 'Poppins-SemiBold',
    },
    inactiveTransactionType: {
        backgroundColor: colors.gray[100],
        padding: spacing.md,
        paddingHorizontal: spacing.lg,
        borderRadius: 10,
    },
     inactiveTransactionTypeText : {
        color: colors.gray[500],
        fontFamily: 'Poppins-SemiBold',
    },
});
