import { StyleSheet } from 'react-native';
import { spacing } from '../../../../styles/spacing';
import { colors } from '../../../../styles/colors';
import { fontSize } from '../../../../styles/fontSizes';
import { Platform } from 'react-native';

export const styles = StyleSheet.create({
    accountCardContainer : {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        backgroundColor: colors.background,
        padding: spacing.md,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.darkerBackground,
    },
    emptyCategoryCardContainer : {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        backgroundColor: colors.white,
        padding: spacing.md,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.gray[300],
    },
    categoryIcon : {
        alignSelf: 'flex-start',
        padding: spacing.sm,
        paddingHorizontal: spacing.sm + 2,
        borderRadius: 10,
        fontSize: fontSize.xxl,
    },
    emptyCategoryIcon: {
        backgroundColor: colors.gray[600],
        alignSelf: 'flex-start',
        padding: spacing.sm,
        paddingHorizontal: spacing.sm,
        borderRadius: 10,
        fontSize: fontSize.xxl,
        color: colors.white,
    },
    categoryInfoContainer: {
        display: 'flex',
        flex: 2,
    },
    categoryCardContainer : {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        backgroundColor: colors.background,
        padding: spacing.md,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.darkerBackground,
    },
    categoryName: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: fontSize.lg,
          lineHeight: Platform.OS === 'android' ? 25 : 0,
    },
    arrowIcon : {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
    },
    categoryDescription: {
        fontFamily: 'Poppins-Regular',
        fontSize: fontSize.sm,
        color: colors.gray[600],
    },
});
