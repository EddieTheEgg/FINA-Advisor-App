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
        alignSelf: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: fontSize.xxl,
        fontFamily: 'Poppins-SemiBold',
    },
    subHeaderText: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-Medium',
        color: colors.gray[500],
    },
    dotProgressContainer: {
        flexDirection: 'row',
        marginTop: spacing.lg,
        marginBottom: spacing.md,
        gap: spacing.sm,
    },
    dotProgress: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: colors.gray[300],
    },
    activeDot: {
        backgroundColor: colors.darkerBackground,
    },
    formContainer: {
        backgroundColor: colors.white,
        marginHorizontal: spacing.md,
        padding: spacing.md,
        borderRadius: 20,
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        gap: spacing.md,
    },
    continueButton: {
        backgroundColor: colors.darkerBackground,
        marginHorizontal: spacing.md,
        padding: spacing.md,
        borderRadius: 15,
        alignItems: 'center',
        marginVertical: spacing.md,
        marginTop: spacing.lg,
    },
    disabledButton: {
        marginTop: spacing.md,
        backgroundColor: colors.gray[400],
        opacity: 0.6,
    },
    continueButtonText: {
        color: colors.white,
        fontFamily: 'Poppins-SemiBold',
        fontSize: fontSize.lg
    },
    validatingText: {
        fontFamily: 'Poppins-SemiBold',
        alignSelf: 'center',
        marginVertical: spacing.md,
    },
    goToSignInButton: {
        padding: spacing.md,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: colors.darkerBackground,
        marginHorizontal: spacing.md,
        backgroundColor: colors.background,
        alignItems: 'center',
    },
    goToSignInButtonText: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        color: colors.darkerBackground,
    },
});
