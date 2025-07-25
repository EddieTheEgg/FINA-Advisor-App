import { StyleSheet } from 'react-native';
import { fontSize } from '../../../../styles/fontSizes';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';

export const styles = StyleSheet.create({
    transactionInfoContainer : {
        backgroundColor: colors.white,
        borderRadius: 20,
        marginHorizontal: spacing.md,
        padding: spacing.md,
        marginTop: spacing.md,
    },
    transactionInfoTitle : {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        marginBottom: spacing.sm,
    },
    divider : {
        height: 1,
        backgroundColor: colors.gray[300],
        marginVertical: spacing.sm,
    },
    transactionInfoRowContainer : {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    transactionInfoLabel : {
        fontSize: fontSize.sm,
        color: colors.gray[500],
        fontFamily: 'Poppins-SemiBold',
    },
    transactionInfoValue : {
        fontSize: fontSize.sm,
        color: colors.gray[600],
        fontFamily: 'Poppins-Medium',
    },
});
