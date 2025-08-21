import { StyleSheet } from 'react-native';
import { colors } from '../../../../../styles/colors';
import { spacing } from '../../../../../styles/spacing';
import { fontSize } from '../../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        padding: spacing.md,
        borderRadius: 20,
        gap: spacing.sm,
        boxShadow: '0px 3px 3px 0px rgba(0, 0, 0, 0.25)',
        marginHorizontal: spacing.md,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        color: colors.black,
    },
    descriptionInputLength: {
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-Regular',
        color: colors.black,
    },
    descriptionInput: {
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
    categoryNameError: {
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-Regular',
        color: colors.red,
    },
});
