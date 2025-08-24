import { StyleSheet } from 'react-native';
import { colors } from '../../../../../styles/colors';
import { spacing } from '../../../../../styles/spacing';
import { fontSize } from '../../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.lightBlue,
        padding: spacing.md,
        marginHorizontal: spacing.md,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.blue,
    },
    title:{
        fontFamily: 'Poppins-SemiBold',
        color: colors.darkBlue,
        fontSize: fontSize.base,
    },
    description: {
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-Regular',
        color: colors.darkBlue,
    },
});
