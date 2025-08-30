import { StyleSheet } from 'react-native';
import { spacing } from '../../../../styles/spacing';
import { colors } from '../../../../styles/colors';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    container: {
        marginHorizontal: spacing.md,
        borderRadius: 20,
        backgroundColor: colors.red,
        marginTop: spacing.md,
    },
    mainContentContainer: {
        marginLeft: spacing.xs,
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: spacing.md,
    },
    title: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        color: colors.red,
    },
    description: {
        color: colors.gray[500],
        fontFamily: 'Poppins-Medium',
    },
    deleteAccountButton: {
        backgroundColor: colors.lighterRed,
        alignItems: 'center',
        padding: spacing.md,
        borderRadius: 20,
        marginVertical: spacing.sm,
    },
    deleteAccountButtonText: {
        fontFamily: 'Poppins-SemiBold',
        color: colors.red,
        fontSize: fontSize.base,
    },
});
