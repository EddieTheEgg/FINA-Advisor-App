import { StyleSheet } from 'react-native';
import { fontSize } from '../../../../styles/fontSizes';
import { spacing } from '../../../../styles/spacing';
import { colors } from '../../../../styles/colors';

export const styles = StyleSheet.create({
    categoryFilterContainer : {
        marginVertical: spacing.md,
        display: 'flex',
        gap: spacing.sm,
    },
    categoryTitleLabel: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
    },
    categoryDescriptionLabel : {
        fontFamily: 'Poppins-Regular',
        color: colors.gray[600],
        fontWeight: 500,
    },
    categoryTypeLabel : {
        fontSize: fontSize.base,
        fontFamily: 'Poppins-SemiBold',
        color: colors.gray[700],
        fontWeight: 700,
    },
    categoryFilterButtonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
    },
    categoryLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    categoryLabelText: {
        fontSize: fontSize.base,
        fontFamily: 'Poppins-SemiBold',
        color: colors.gray[500],
    },
    activeCategoryLabelText: {
        textAlign: 'center',
        fontSize: fontSize.base,
        fontFamily: 'Poppins-SemiBold',
        color: colors.white,
    },
});
