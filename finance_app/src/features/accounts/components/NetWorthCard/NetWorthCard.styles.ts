import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';
import { Platform } from 'react-native';

export const styles = StyleSheet.create({
    netWorthContainer : {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: colors.white,
        marginHorizontal: spacing.sm,
        gap: spacing.xs,
        paddingVertical: spacing.md,
        borderRadius: 20,
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.3)',
    },
    title : {
        color: colors.gray[600],
        fontSize: fontSize.lg,
    },
    netWorthText : {
        fontSize: fontSize.xxxxl,
        fontFamily: 'Poppins-SemiBold',
        lineHeight: Platform.OS === 'android' ? 45 : 50,
    },
    badgeContainer : {
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: 20,
        fontFamily: 'Poppins-SemiBold',
        lineHeight: Platform.OS === 'android' ? 20 : 0,
    },
    greenBadge : {
        backgroundColor: colors.lighterGreen,
        color: colors.green,
    },
    redBadge: {
        backgroundColor: colors.lighterRed,
        color: colors.red,
    },
    grayBadge: {
        backgroundColor: colors.gray[200],
        color: colors.gray[700],

    },
});
