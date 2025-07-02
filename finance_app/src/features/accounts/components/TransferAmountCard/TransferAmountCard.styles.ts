import { Platform, StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    transferAmountCardContainer : {
        backgroundColor: colors.white,
        padding: spacing.md,
        borderRadius: 20,
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    },
    transferAmountTitle : {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
    },
    inputTextContainer : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    inputContainer : {
        display: 'flex',
        alignItems: 'center',
    },
    input : {
        color: colors.darkerBackground,
        fontFamily: 'Poppins-SemiBold',
        includeFontPadding: false,
        fontSize: fontSize.xxxxl,
        paddingTop: spacing.xs,
    },
      inputText : {
        color: colors.darkerBackground,
        fontFamily: 'Poppins-SemiBold',
        includeFontPadding: false,
        fontSize: fontSize.xxxxl,
        paddingTop: spacing.xs + 1,
    },
    subText : {
        fontSize: fontSize.base,
        fontFamily: 'Poppins-SemiBold',
        color: colors.gray[600],
        marginTop: Platform.OS === 'android' ? -spacing.sm : 0,
    },
    errorText : {
        fontFamily: 'Poppins-Regular',
        fontSize: fontSize.base,
        textAlign: 'center',
        color: 'red',
    },
});
