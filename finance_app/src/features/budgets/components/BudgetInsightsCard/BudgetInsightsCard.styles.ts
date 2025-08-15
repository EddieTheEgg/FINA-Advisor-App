import { StyleSheet } from 'react-native';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';
import { colors } from '../../../../styles/colors';

export const styles = StyleSheet.create({
    container : {
        padding: spacing.md,
    },
    title: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        color: colors.black,
    },





//Alert Budget Insight Styling
    alertContainer: {
        padding: spacing.md,
        backgroundColor: colors.lighterRed,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.red,
    },
    alertTitle: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        color: colors.red,
        marginBottom: spacing.sm,
    },
    alertValue: {
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-SemiBold',
        color: colors.darkerRed,
    },
    alertDescription: {
        color: colors.darkerRed,
        fontFamily: 'Poppins-Regular',
    },
    alertSuggestion: {
        color: colors.darkerRed,
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-Regular',
        backgroundColor: colors.veryLightRed,
        padding: spacing.sm,
        borderRadius: 10,
        marginTop: spacing.sm,
    },


//On Track Budget Insight Styling
    onTrackContainer: {
        padding: spacing.md,
        backgroundColor: colors.lighterGreen,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.darkerGreen,
    },
    onTrackTitle: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        color: colors.darkerGreen,
        marginBottom: spacing.sm,
    },
    onTrackValue: {
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-SemiBold',
        color: colors.darkerGreen,
    },
    onTrackDescription: {
        color: colors.darkerGreen,
        fontFamily: 'Poppins-Regular',
    },
    onTrackSuggestion: {
        color: colors.darkerGreen,
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-Regular',
        backgroundColor: colors.veryLightGreen,
        padding: spacing.sm,
        borderRadius: 10,
        marginTop: spacing.sm,
    },

//Warning Budget Insight Styling
    warningContainer: {
        padding: spacing.md,
        backgroundColor: colors.yellow,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.darkerYellow,
    },
    warningTitle: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        color: colors.darkerYellow,
        marginBottom: spacing.sm,
    },
    warningValue: {
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-SemiBold',
        color: colors.darkerYellow,
    },
    warningDescription: {
        color: colors.darkerYellow,
        fontFamily: 'Poppins-Regular',
    },
    warningSuggestion: {
        color: colors.darkerYellow,
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-Regular',
        backgroundColor: colors.veryLightYellow,
        padding: spacing.sm,
        borderRadius: 10,
        marginTop: spacing.sm,
    },
});
