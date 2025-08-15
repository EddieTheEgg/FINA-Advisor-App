import { StyleSheet } from 'react-native';
import { spacing } from '../../../../../styles/spacing';
import { colors } from '../../../../../styles/colors';
import { fontSize } from '../../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    container: {
       marginHorizontal: spacing.md,
       padding: spacing.md,
       backgroundColor: colors.lightBlue,
       borderRadius: 20,
       borderWidth: 1,
       borderColor: colors.darkBlue,
    },
    budgetTitleText : {
        fontSize: fontSize.base,
        fontFamily: 'Poppins-SemiBold',
        color: colors.darkBlue,
    },
    currentSpentText: {
        marginVertical: spacing.sm,
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-Regular',
        color: colors.darkBlue,
        includeFontPadding: false,
    },
    currentBudgetAmount: {
        fontSize: fontSize.xl,
        fontFamily: 'Poppins-SemiBold',
        color: colors.darkBlue,
        alignSelf: 'center',
        includeFontPadding: false,
    },
});
