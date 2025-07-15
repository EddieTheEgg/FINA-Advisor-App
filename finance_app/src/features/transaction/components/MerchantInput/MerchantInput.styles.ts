import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    merchantContainer: {
        backgroundColor: colors.white,
        borderRadius: 20,
        gap: spacing.xs,
    },
    merchantHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    merchantText: {
        fontSize: fontSize.base,
        fontFamily: 'Poppins-SemiBold',
        color: colors.black,
    },
    charCounter: {
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-Regular',
        color: colors.black,
    },
    charCounterWarning: {
        color: colors.red,
    },
    merchantInput: {
        backgroundColor: colors.gray[50],
        borderRadius: 10,
        padding: spacing.sm,
        fontSize: fontSize.base,
        fontFamily: 'Poppins-Regular',
        color: colors.black,
        borderWidth: 2,
        borderColor: colors.gray[200],
    },
});
