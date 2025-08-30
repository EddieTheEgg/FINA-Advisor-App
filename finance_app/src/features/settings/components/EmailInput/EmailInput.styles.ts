import { StyleSheet } from 'react-native';
import { fontSize } from '../../../../styles/fontSizes';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';

export const styles = StyleSheet.create({
    headerText : {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
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
    errorText: {
        color: colors.red,
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-Regular',
    },
});
