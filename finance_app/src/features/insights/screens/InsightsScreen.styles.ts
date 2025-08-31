import { StyleSheet } from 'react-native';
import { colors } from '../../../styles/colors';
import { fontSize } from '../../../styles/fontSizes';
import { spacing } from '../../../styles/spacing';


export const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: colors.background,
    },
    refreshIconContainer : {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: spacing.md,
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
        marginVertical: spacing.sm,
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
    refreshIcon : {
        backgroundColor: colors.white,
        padding: spacing.sm + 2,
        borderRadius: 30,
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 42,
        minHeight: 42,
    },
    refreshIconDisabled: {
        backgroundColor: colors.gray[200],
        opacity: 0.6,
    },
    cooldownText: {
        fontSize: fontSize.xs,
        fontFamily: 'Poppins-Medium',
        color: colors.gray[500],
        marginTop: 2,
        textAlign: 'center',
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    image: {
        width: 200,
        height: 200,
        marginLeft: spacing.lg * 2,
        marginBottom: -spacing.lg,
    },
    text: {
        fontSize: fontSize.xxxl,
        fontWeight: 'bold',
        color: colors.black,
        marginLeft: spacing.lg,
    },
});
