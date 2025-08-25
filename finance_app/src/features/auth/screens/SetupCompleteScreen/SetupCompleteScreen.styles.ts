import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    dotProgressContainer: {
        flexDirection: 'row',
        marginTop: spacing.lg,
        marginBottom: spacing.md,
        gap: spacing.sm,
    },
    headerContainer: {
        alignSelf: 'center',
        alignItems: 'center',
    },
    headerTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: spacing.xl * 2.5,
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
    dotProgress: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: colors.gray[300],
    },
    activeDot: {
        backgroundColor: colors.darkerBackground,
    },
    completedDot: {
        backgroundColor: colors.green,
    },
    finishButton: {
        backgroundColor: colors.darkerBackground,
        marginHorizontal: spacing.md,
        padding: spacing.md,
        borderRadius: 15,
        alignItems: 'center',
        marginVertical: spacing.sm,
    },
    finishButtonText: {
        color: colors.white,
        fontFamily: 'Poppins-SemiBold',
        fontSize: fontSize.lg,
    },
    disabledButton: {
        opacity: 0.6,
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
        marginBottom: -spacing.lg,
        marginLeft: spacing.xxl * 1.3,
    },
    text: {
        fontSize: fontSize.xxl,
        fontWeight: 'bold',
        color: colors.black,
        marginLeft: spacing.lg,
    },
});
