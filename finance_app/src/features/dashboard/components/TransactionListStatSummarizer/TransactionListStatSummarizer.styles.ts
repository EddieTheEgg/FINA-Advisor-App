import { StyleSheet } from 'react-native';
import { fontSize } from '../../../../styles/fontSizes';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';

export const styles = StyleSheet.create({
    summarizeStatContainer : {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: spacing.md,
    },
    summarizeStatItem : {
        display: 'flex',
    },
    summarizeStatItemTitle : {
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-Regular',
        color: colors.gray[600],
        fontWeight: 500,
        textAlign: 'center',
    },
    incomeValue : {
        color: colors.darkerGreen,
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center',
        fontSize: fontSize.lg,
    },
    expenseValue : {
        color: colors.red,
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center',
        fontSize: fontSize.lg,
    },
    transferValue : {
        color: colors.gray[700],
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center',
        fontSize: fontSize.lg,
    },
});
