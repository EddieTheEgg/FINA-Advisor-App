import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: colors.background,
        flex: 1,
    },
    scrollContainer: {
        marginHorizontal: spacing.md,
        marginTop: spacing.xxl * 2.5,
    },
    partyEmoji: {
        fontSize: fontSize.xxxxl * 2,
        alignSelf: 'center',
        marginBottom: spacing.md,
    },
    nextDetailsContainer: {
        backgroundColor: colors.white,
        padding: spacing.md,
        borderRadius: 20,
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.2)',
    },
    nextDetailsTitle: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        color: colors.black,
        textAlign: 'center',
        includeFontPadding: false,
    },
    nextDetailsSubDescription: {
        fontSize: fontSize.base,
        fontFamily: 'Poppins-Regular',
        color: colors.gray[500],
        marginVertical: spacing.xs - 1,
        includeFontPadding: false,
    },
    goToDashboardButton: {
        backgroundColor: colors.darkerBackground,
        alignItems: 'center',
        borderRadius: 20,
        padding: spacing.md,
        marginVertical: spacing.xxl,
    },
    goToDashboardButtonText: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        color: colors.white,
    },
    welcomeText: {
        fontSize: fontSize.xxxl,
        textAlign: 'center',
        marginHorizontal: spacing.md,
        fontFamily: 'Poppins-SemiBold',
    },
    welcomeTextSubDescription: {
        fontSize: fontSize.base,
        textAlign: 'center',
        marginHorizontal: spacing.md,
        fontFamily: 'Poppins-Medium',
        color: colors.gray[500],
        marginVertical: spacing.md,

    },
});
