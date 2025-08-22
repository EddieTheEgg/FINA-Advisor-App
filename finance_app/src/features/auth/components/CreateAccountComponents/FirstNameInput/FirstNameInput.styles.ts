import { StyleSheet } from 'react-native';
import { spacing } from '../../../../../styles/spacing';
import { colors } from '../../../../../styles/colors';
import { fontSize } from '../../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
    },
    charCounter: {
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-Regular',
    },
    input: {
        backgroundColor: colors.gray[50],
        borderRadius: 10,
        padding: spacing.sm,
        fontSize: fontSize.base,
        fontFamily: 'Poppins-Regular',
        color: colors.black,
        borderWidth: 2,
        borderColor: colors.gray[200],
    },
    charCounterWarning: {
        color: colors.red,
    },
});
