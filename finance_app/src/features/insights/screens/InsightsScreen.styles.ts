import { StyleSheet } from 'react-native';
import { colors } from '../../../styles/colors';
import { fontSize } from '../../../styles/fontSizes';
import { spacing } from '../../../styles/spacing';


export const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollViewContent : {
        paddingBottom: spacing.lg,
    },
    title : {
        fontSize: fontSize.xl,
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center',
    },
    keyInsightsSection : {
        marginHorizontal: spacing.md,
        marginVertical: spacing.lg,
    },
    aiInsightsSection: {
        marginHorizontal: spacing.md,
    },
    insightsTitleContainer : {
        flexDirection: 'row',
        gap: spacing.sm,
        alignItems: 'baseline',
        marginBottom: spacing.md,
    },
    keyInsightsTitleText: {
        fontSize: fontSize.base,
        fontFamily: 'Poppins-SemiBold',
    },
    liveAnalysisText : {
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-SemiBold',
        color: colors.white,
        backgroundColor: colors.darkerGreen,
        letterSpacing: -0.5,
        paddingHorizontal: spacing.md,
        borderRadius: 20,
        includeFontPadding: false,
    },
    keyInsightsCardsContainer : {
        gap: spacing.md,
    },
    aiInsightsTitle : {
        fontSize: fontSize.base,
        fontFamily: 'Poppins-SemiBold',
    },
    aiAnalysisText : {
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-SemiBold',
        color: colors.white,
        backgroundColor: colors.purple,
        letterSpacing: -0.5,
        paddingHorizontal: spacing.md,
        borderRadius: 20,
        includeFontPadding: false,
    },
    aiInsightsCardContainer : {
        gap: spacing.md,
    },
});
