import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        padding: spacing.md,
        borderRadius: 20,
        marginHorizontal: spacing.md,
    },
    title: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: fontSize.lg,
    },
    contentContainer : {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.gray[100],
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.gray[200],
        padding: spacing.md,
        gap: spacing.sm,
        marginVertical: spacing.sm,
    },
    icon: {
        fontSize: fontSize.xl,
        padding: spacing.sm + 5,
        borderRadius: 15,
    },
    textContainer: {
        flex: 1,
        width: '50%',
    },
    categoryTypeLabel: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: fontSize.lg,
    },
    description: {
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-Medium',
        color: colors.gray[600],
    },
    lockIcon: {
        fontSize: fontSize.base,
    },
});
