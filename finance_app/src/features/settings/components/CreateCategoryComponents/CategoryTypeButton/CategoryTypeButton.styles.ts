import { StyleSheet } from 'react-native';
import { colors } from '../../../../../styles/colors';
import { spacing } from '../../../../../styles/spacing';
import { fontSize } from '../../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    activeCategoryType: {
        backgroundColor: colors.darkerBackground,
        padding: spacing.md,
        borderRadius: 10,
        fontSize: fontSize.xs,
    },
    activeCategoryTypeText : {
        fontSize: fontSize.sm,
        color: colors.white,
        fontFamily: 'Poppins-SemiBold',
    },
    inactiveCategoryType: {
        backgroundColor: colors.gray[100],
        padding: spacing.md,
        borderRadius: 10,
        fontSize: fontSize.xs,
    },
     inactiveCategoryTypeText : {
        fontSize: fontSize.sm,
        color: colors.gray[500],
        fontFamily: 'Poppins-SemiBold',
    },
    allCategoryType: {
        paddingHorizontal: spacing.lg,
    },
});
