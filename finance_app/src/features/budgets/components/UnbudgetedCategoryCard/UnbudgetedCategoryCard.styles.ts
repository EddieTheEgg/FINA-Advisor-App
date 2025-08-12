import { StyleSheet } from 'react-native';
import { spacing } from '../../../../styles/spacing';
import { colors } from '../../../../styles/colors';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
      categoryCardContainer : {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: spacing.md,
        alignItems: 'center',
        gap: spacing.md,
        borderRadius: 20,
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.3)',
        marginHorizontal: spacing.md,
    },
    selectedCategoryCard: {
        backgroundColor: colors.gray[200],
    },
    iconContainer: {
        padding: spacing.sm,
        borderRadius: 10,
    },
    iconText: {
        fontSize: fontSize.xxl,
    },
    categoryNameText : {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
    },
    categorySubInfoText: {
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-SemiBold',
        color: colors.gray[500],
    },
});
