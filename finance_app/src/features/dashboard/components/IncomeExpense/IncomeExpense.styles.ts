import { Platform, StyleSheet } from 'react-native';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';
import { colors } from '../../../../styles/colors';

export const styles = StyleSheet.create({
    expenseIncomeContainer : {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        borderRadius: 20,
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.3)',
        marginHorizontal: spacing.sm,
        paddingVertical: spacing.sm,
        alignItems: 'center',
    },
    expenseIncomeTextContainer : {
        alignItems: 'center',
    },
    expenseIncomeLabel : {
        fontFamily: 'Poppins-SemiBold',
        fontSize: fontSize.sm,
        color: colors.gray[400],
    },
    incomeText: {
        fontFamily: 'Poppins-SemiBold',
        color: colors.darkerGreen,
        fontSize: fontSize.lg,
        lineHeight: Platform.OS === 'android' ? 15 : 0,
    },
    expenseText: {
        fontFamily: 'Poppins-SemiBold',
        color: colors.red,
        fontSize: fontSize.lg,
        lineHeight: Platform.OS === 'android' ? 15 : 0,
    },
    transferText: {
        fontFamily: 'Poppins-SemiBold',
        color: colors.secondary,
        fontSize: fontSize.lg,
        lineHeight: Platform.OS === 'android' ? 15 : 0,
    },
});
