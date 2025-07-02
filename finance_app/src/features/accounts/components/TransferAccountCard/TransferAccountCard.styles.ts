import { Platform, StyleSheet } from 'react-native';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';
import { colors } from '../../../../styles/colors';

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
    emptyAccountCardContainer : {
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
    accountIcon : {
        alignSelf: 'flex-start',
        padding: spacing.sm,
        paddingHorizontal: spacing.sm + 2,
        borderRadius: 10,
        fontSize: fontSize.xxl,
    },
    emptyAccountIcon: {
        backgroundColor: colors.gray[600],
        alignSelf: 'flex-start',
        padding: spacing.sm,
        paddingHorizontal: spacing.sm,
        borderRadius: 10,
        fontSize: fontSize.xxl,
        color: colors.white,
    },
    accountInfoContainer: {
        display: 'flex',
        flex: 2,
    },
    accountName: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: fontSize.lg,
          lineHeight: Platform.OS === 'android' ? 25 : 0,
    },
    accountBalance: {
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
