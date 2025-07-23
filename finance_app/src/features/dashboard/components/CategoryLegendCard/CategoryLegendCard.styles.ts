import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    categoryLegendCardContainer: {
       display: 'flex',
       flexDirection: 'row',
        backgroundColor: colors.gray[100],
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.gray[300],
        alignItems: 'center',
        width: '100%',
        padding: spacing.md,
        justifyContent: 'space-around',
    },
    categoryLegendCardAllContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
    },
    categoryLegendCardIncomeContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    transactionTypeLabel : {
        color: colors.gray[600],
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-SemiBold',
    },
});
