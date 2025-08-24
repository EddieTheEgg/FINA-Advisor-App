import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    headerContainer: {
        alignSelf: 'center',
        alignItems: 'center',
    },
    headerTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: spacing.xl,
    },
    headerText: {
        fontSize: fontSize.xl,
        fontFamily: 'Poppins-SemiBold',
    },
    subHeaderText: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-Medium',
        color: colors.gray[500],
    },
    dotProgressContainer: {
        flexDirection: 'row',
        marginTop: spacing.lg,
        marginBottom: spacing.md,
        gap: spacing.sm,
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
});
