import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    headerSection : {
        flexDirection: 'row',
        gap: spacing.md,
        alignItems: 'flex-start',
    },
    container : {
        backgroundColor: colors.purple,
        borderRadius: 20,
    },
    mainContentContainer: {
        backgroundColor: colors.white,
        marginLeft: spacing.xs,
        padding: spacing.md,
        borderRadius: 20,
    },
    icon : {
        padding: spacing.sm,
        paddingHorizontal: spacing.sm + 2,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.lighterPurple,
        fontSize: fontSize.xxl,
    },
    textContainer: {
        flex: 1,
    },
    insightsTitle : {
        fontSize: fontSize.base,
        fontFamily: 'Poppins-SemiBold',
        flexShrink: 1,
    },
    insightsSubTitle : {
        fontSize: fontSize.xs,
        fontFamily: 'Poppins-Regular',
        color: colors.gray[700],
        flexShrink: 1,
    },
    descriptionContainer: {
        marginTop: spacing.sm,
    },
    aiAnalysisDescription : {
        fontFamily: 'Poppins-Regular',
        fontSize: fontSize.base,
        textAlign: 'left',
        flexShrink: 1,
        lineHeight: 20,
    },
    seeMoreButton: {
        marginTop: spacing.xs,
        alignSelf: 'flex-end',
    },
    seeMoreText: {
        color: colors.purple,
        fontFamily: 'Poppins-SemiBold',
        fontSize: fontSize.sm,
    },
    aiFooterContainer : {
        backgroundColor: colors.gray[100],
        padding: spacing.sm,
        borderRadius: 10,
        marginTop: spacing.sm,
        gap: spacing.sm,
    },
    rowSection : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    aiLabelText : {
        color: colors.gray[600],
        fontFamily: 'Poppins-Regular',
        fontSize: fontSize.sm,
        includeFontPadding: false,
    },
    statText : {
        fontFamily: 'Poppins-SemiBold',
        fontSize: fontSize.sm,
        includeFontPadding: false,
    },

    difficultyTextBox : {
        paddingHorizontal: spacing.sm,
        borderRadius: 10,
        fontFamily: 'Poppins-SemiBold',
        fontSize: fontSize.sm,
        includeFontPadding: false,
    },
    easyColorTheme: {
        backgroundColor: colors.lighterGreen,
        color: colors.darkerGreen,
    },
    mediumColorTheme: {
        backgroundColor: colors.yellowBackground,
        color: colors.darkerBackground,
    },
    hardColorTheme: {
        backgroundColor: colors.lighterRed,
        color: colors.darkerRed,
    },
    unknownColorTheme: {
        backgroundColor: colors.gray[200],
        color: colors.gray[600],
    },
    confidenceBar : {
        backgroundColor: colors.purple,
        borderRadius: 10,
        height: 5,
    },
    confidenceBarContainer : {
        backgroundColor: colors.gray[200],
        borderRadius: 5,
        height: 5,
    },
});
