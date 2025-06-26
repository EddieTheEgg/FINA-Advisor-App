import { Platform, StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { fontSize } from '../../../../styles/fontSizes';
import { spacing } from '../../../../styles/spacing';

export const styles = StyleSheet.create({
    accountDetailsCardContainer: {
        backgroundColor: colors.white,
        display: 'flex',
        justifyContent: 'flex-start',
        padding: spacing.md,
        borderRadius: 20,
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.3)',
    },
    accountDetailsCardIcon: {
        fontSize: fontSize.xxxl,
        borderRadius: 20,
        padding: spacing.md,
        alignSelf: 'flex-start',
    },
    accountDetailsCardBalance : {
        fontSize: fontSize.xxxxl,
        fontFamily: 'Poppins-SemiBold',
        marginTop: spacing.sm,
    },
    accountDetailsCardBalanceSubText : {
        fontSize: fontSize.lg,
        fontFamily: Platform.OS === 'android' ? 'Poppins-SemiBold' : 'Poppins-Regular',
        fontWeight: 500,
        lineHeight: Platform.OS === 'android' ? 15 : 0,
        color: colors.gray[500],
    },
    lineDivider : {
        marginVertical: spacing.md,
        height: spacing.xs - 3,
        backgroundColor: colors.gray[300],
    },
    accountDetailsInfoRow : {
        flexDirection: 'row',
        gap: spacing.md,
        justifyContent: 'space-evenly',
    },
    detailsColumn : {
        alignItems: 'center',
    },
    detailsColumnTitle : {
        fontSize: fontSize.sm + 2,
        textAlign: 'center',
        fontFamily: Platform.OS === 'android' ? 'Poppins-SemiBold' : 'Poppins-Regular',
        fontWeight: 500,
        color: colors.gray[500],
    },
    detailsColumnValue : {
        fontFamily: 'Poppins-SemiBold',
        fontSize: fontSize.sm + 2,
    },
});
