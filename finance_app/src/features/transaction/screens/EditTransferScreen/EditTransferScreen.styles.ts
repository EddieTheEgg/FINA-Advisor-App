import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        position: 'relative',
    },
    header : {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: spacing.md,
    },
    headerTitle : {
        fontSize: fontSize.xl,
        marginLeft: spacing.sm,
        fontFamily: 'Poppins-SemiBold',
    },
    expenseIncomeContainer : {
        gap: spacing.md,
        marginVertical: spacing.md,
        marginHorizontal: spacing.md,
    },
    downArrowContainer : {
        marginHorizontal: spacing.md,
        alignSelf: 'center',
        marginVertical: spacing.sm,
    },
    saveTransferButtonContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.white,
        paddingTop: spacing.md,
        paddingBottom: spacing.xl,
    },
    saveTransferButton: {
        marginHorizontal: spacing.md,
        padding: spacing.md,
        backgroundColor: colors.darkerBackground,
        borderRadius: 10,
    },
    saveTransferButtonText : {
        color: colors.white,
        fontFamily: 'Poppins-SemiBold',
        fontSize: fontSize.lg,
        textAlign: 'center',
        flex: 1,
    },
    errorText: {
        alignSelf: 'center',
        fontSize: fontSize.base,
        fontFamily: 'Poppins-Regular',
        color: colors.red,
        marginBottom: spacing.sm,
    },
});
