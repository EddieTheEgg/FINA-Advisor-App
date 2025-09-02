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
    buttonContainer: {
        alignItems: 'center',
        gap: spacing.lg,
    },
    sendButton: {
        backgroundColor: colors.darkerBackground,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.md,
        borderRadius: 20,
        alignItems: 'center',
        width: '100%',
    },
    sendButtonDisabled: {
        backgroundColor: colors.gray[400],
    },
    sendButtonText: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        color: colors.white,
    },
    sendButtonTextDisabled: {
        color: colors.gray[600],
    },
    errorText: {
        alignSelf: 'center',
        fontSize: fontSize.base,
        fontFamily: 'Poppins-Regular',
        color: colors.red,
        marginTop: spacing.sm,
    },
    successContainer: {
        backgroundColor: colors.veryLightGreen,
        borderColor: colors.green,
        borderWidth: 1,
        borderRadius: 10,
        padding: spacing.md,
        marginTop: spacing.md,
    },
    successText: {
        fontSize: fontSize.base,
        fontFamily: 'Poppins-Regular',
        color: colors.darkerGreen,
        textAlign: 'center',
    },
});
