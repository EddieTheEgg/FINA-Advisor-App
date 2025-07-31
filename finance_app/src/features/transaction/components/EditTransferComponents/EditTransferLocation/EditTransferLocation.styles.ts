import { StyleSheet } from 'react-native';
import { colors } from '../../../../../styles/colors';
import { spacing } from '../../../../../styles/spacing';
import { fontSize } from '../../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    locationContainer: {
        backgroundColor: colors.white,
        borderRadius: 20,
        gap: spacing.xs,
        padding: spacing.md,
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.3)',
    },
    locationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    locationText: {
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
    locationInput: {
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
