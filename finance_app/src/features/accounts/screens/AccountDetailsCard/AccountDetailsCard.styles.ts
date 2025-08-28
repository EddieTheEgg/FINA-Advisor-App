import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        padding: spacing.md,
        marginHorizontal: spacing.md,
        borderRadius: 20,
        marginTop: spacing.md,
        gap: spacing.md,
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.2)',
    },
    title: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        marginBottom: spacing.sm,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    headerText: {
        fontSize: fontSize.base,
        fontFamily: 'Poppins-Medium',
        color: colors.black,
    },
    charCounter: {
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-Regular',
        color: colors.gray[500],
    },
    charCounterWarning: {
        color: colors.red[500],
    },
    input: {
        borderWidth: 1,
        borderColor: colors.gray[300],
        borderRadius: 10,
        padding: spacing.md,
        fontSize: fontSize.base,
        fontFamily: 'Poppins-Regular',
        backgroundColor: colors.white,
        marginBottom: spacing.sm,
    },
    inputAmount: {
        borderWidth: 1,
        borderColor: colors.gray[300],
        borderRadius: 10,
        padding: spacing.md,
        fontSize: fontSize.xl,
        fontFamily: 'Poppins-SemiBold',
        backgroundColor: colors.white,
        textAlign: 'center',
    },
    accountBalanceText: {
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-Regular',
        color: colors.gray[600],
        textAlign: 'center',
        marginTop: spacing.xs,
    },
    errorText: {
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-Regular',
        color: colors.red[500],
        marginTop: spacing.xs,
    },
});
