import { StyleSheet } from 'react-native';
import { colors } from '../../../../../styles/colors';
import { spacing } from '../../../../../styles/spacing';
import { fontSize } from '../../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    title: {
        backgroundColor: colors.white,
        padding: spacing.md,
        borderRadius: 20,
        gap: spacing.sm,
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.3)',
    },
    titleHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleText: {
        fontSize: fontSize.lg,
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
    titleInput: {
        backgroundColor: colors.gray[50],
        borderRadius: 10,
        padding: spacing.sm,
        fontSize: fontSize.base,
        fontFamily: 'Poppins-Regular',
        color: colors.black,
        borderWidth: 2,
        borderColor: colors.gray[200],
    },
    titleError: {
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-Regular',
        color: colors.red,
    },
});
