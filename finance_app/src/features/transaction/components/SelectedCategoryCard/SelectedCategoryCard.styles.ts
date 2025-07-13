import { StyleSheet } from 'react-native';
import { spacing } from '../../../../styles/spacing';
import { colors } from '../../../../styles/colors';
import { fontSize } from '../../../../styles/fontSizes';
import { Platform } from 'react-native';

export const styles = StyleSheet.create({
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
    categoryName: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: fontSize.lg,
          lineHeight: Platform.OS === 'android' ? 25 : 0,
    },
    categoryDescription: {
        fontSize: fontSize.sm + 1,
        fontFamily: 'Poppins-Regular',
        fontWeight: Platform.OS === 'android' ? 700 : 500,
        color: colors.gray[600],
    },
    arrowIcon : {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
    },
});
