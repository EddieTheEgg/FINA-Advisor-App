import { StyleSheet } from 'react-native';
import { colors } from '../../../../../styles/colors';
import { spacing } from '../../../../../styles/spacing';
import { fontSize } from '../../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    container: {
        gap: spacing.md,
    },
    passwordInput: {
        backgroundColor: colors.gray[50],
        borderRadius: 10,
        padding: spacing.sm,
        fontSize: fontSize.base,
        fontFamily: 'Poppins-Regular',
        color: colors.black,
        borderWidth: 2,
        borderColor: colors.gray[200],
        paddingRight: spacing.xxl,
    },
    label: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
    },
    errorText: {
        color: colors.red,
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-Regular',
    },
    eyeIcon: {
        position: 'absolute',
        right: spacing.sm,
        bottom: spacing.sm + 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: spacing.sm,
        fontSize: fontSize.xl,
    },
});
