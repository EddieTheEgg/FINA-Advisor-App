import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { fontSize } from '../../../../styles/fontSizes';
import { spacing } from '../../../../styles/spacing';

export const styles = StyleSheet.create({
    cardContainer: {
        marginTop: spacing.md,
        backgroundColor: colors.lightBlue,
        alignItems: 'center',
        marginHorizontal: spacing.md,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.darkBlue,
        padding: spacing.md,
    },
    accountIcon: {
        fontSize: fontSize.xxl * 1.5,
        padding: spacing.sm * 2,
        borderRadius: 20,
    },
    accountBalance: {
        fontSize: fontSize.xxl,
        fontFamily: 'Poppins-SemiBold',
        color: colors.darkBlue,
        marginVertical: spacing.xs,
        includeFontPadding: false,
    },
    accountTypeName: {
        fontSize: fontSize.base,
        fontFamily: 'Poppins-Regular',
        color: colors.darkBlue,
        includeFontPadding: false,
    },
});
