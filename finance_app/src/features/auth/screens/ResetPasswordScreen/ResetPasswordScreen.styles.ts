import { StyleSheet, Platform } from 'react-native';
import { colors } from '../../../../styles/colors.js';
import { fontSize } from '../../../../styles/fontSizes.js';
import { spacing } from '../../../../styles/spacing.js';

export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: Platform.OS === 'android' ? spacing.xxl : 0,
    },
    backButton: {
        marginHorizontal: spacing.md,
        marginTop: spacing.lg,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: spacing.md,
        paddingTop: spacing.xxl,
    },
    title: {
        fontSize: fontSize.xxxxl,
        fontFamily: 'Poppins-SemiBold',
        color: colors.black,
        marginBottom: spacing.md,
    },
    subtitle: {
        fontSize: fontSize.base,
        fontFamily: 'Poppins-Regular',
        color: colors.gray[600],
        lineHeight: 24,
        marginBottom: spacing.xxl,
    },
    inputsContainer: {
        marginBottom: spacing.xxl,
        gap: spacing.md,
    },
    inputContainer: {
        position: 'relative',
    },
    input: {
        borderColor: colors.gray[500],
        borderBottomWidth: 2,
        borderRadius: 10,
        paddingRight: spacing.xxl,
        paddingLeft: spacing.sm,
        paddingBottom: spacing.sm,
        marginBottom: spacing.md,
        fontSize: fontSize.base,
        fontFamily: 'Poppins-Regular',
    },
    eyeIcon: {
        position: 'absolute',
        right: spacing.sm,
        bottom: spacing.lg,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: spacing.sm,
        fontSize: fontSize.xxl,
    },
    buttonContainer: {
        alignItems: 'center',
        gap: spacing.lg,
    },
    resetButton: {
        backgroundColor: colors.primary,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xxl,
        borderRadius: 25,
        minWidth: 200,
        alignItems: 'center',
    },
    resetButtonDisabled: {
        backgroundColor: colors.gray[400],
    },
    resetButtonText: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        color: colors.white,
    },
    resetButtonTextDisabled: {
        color: colors.gray[600],
    },
    errorText: {
        alignSelf: 'center',
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-Regular',
        color: colors.tertiary,
        marginTop: spacing.sm,
    },
    successContainer: {
        backgroundColor: colors.veryLightGreen,
        borderColor: colors.green,
        borderWidth: 1,
        borderRadius: 10,
        padding: spacing.md,
        marginTop: spacing.md,
        alignItems: 'center',
    },
    successText: {
        fontSize: fontSize.base,
        fontFamily: 'Poppins-Regular',
        color: colors.darkerGreen,
        textAlign: 'center',
        marginBottom: spacing.md,
    },
    loginButton: {
        backgroundColor: colors.primary,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
        borderRadius: 20,
    },
    loginButtonText: {
        fontSize: fontSize.base,
        fontFamily: 'Poppins-SemiBold',
        color: colors.white,
    },
});
