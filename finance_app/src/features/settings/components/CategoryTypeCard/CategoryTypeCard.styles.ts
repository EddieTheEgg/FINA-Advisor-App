import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    container : {
        backgroundColor: colors.white,
        marginHorizontal: spacing.md,
        padding: spacing.md,
        borderRadius: 20,
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    },
    title : {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
    },
    categoryTypeContainer: {
        marginTop: spacing.sm,
        flexDirection: 'row',
        gap: spacing.xs,
    },
    categoryTypeButton: {
        backgroundColor: colors.gray[100],
        padding: spacing.md,
        paddingHorizontal: spacing.lg + 2,
        borderRadius: 10,
    },
    activeCategoryTypeButton: {
        backgroundColor: colors.darkerBackground,
        padding: spacing.md,
        paddingHorizontal: spacing.lg + 2,
        borderRadius: 10,
    },
    activeCategoryTypeText: {
        color: colors.white,
        fontFamily: 'Poppins-SemiBold',
    },
    categoryTypeText : {
        color: colors.gray[500],
        fontFamily: 'Poppins-SemiBold',
    },
});
