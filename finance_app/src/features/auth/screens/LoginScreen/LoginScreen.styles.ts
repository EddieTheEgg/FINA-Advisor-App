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
    title: {
        marginTop: spacing.xxl,
        paddingHorizontal: spacing.md,
        fontSize: fontSize.xxxxl,
        fontFamily: 'Poppins-SemiBold',
        color: colors.black,
    },
    inputsContainer: {
        marginTop: spacing.xxl,
        paddingHorizontal: spacing.md,
        gap: spacing.md,
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
        marginTop: spacing.lg,
        paddingHorizontal: spacing.md,
        width: '100%',
        alignItems: 'center',
        gap: spacing.lg,
    },
    forgotPasswordText: {
        fontSize: fontSize.base,
        fontFamily: 'Poppins-SemiBold',
        color: colors.black,
    },
    loadingText: {
        fontSize: fontSize.base,
        fontFamily: 'Poppins-SemiBold',
        color: colors.black,
    },
    errorText: {
        alignSelf: 'center',
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-Regular',
        color: colors.tertiary,
    },
});

