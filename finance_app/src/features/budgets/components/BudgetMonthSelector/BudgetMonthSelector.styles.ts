import { StyleSheet } from 'react-native';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';
import { colors } from '../../../../styles/colors';

export const styles = StyleSheet.create({
    budgetMonthContainer : {
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: spacing.md,
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.3)',
    },
    budgetMonthTextContainer: {
        borderRadius: 10,
        padding: spacing.md,
        borderWidth: 1.2,
        borderColor: colors.gray[300],
    },
    budgetMonthLabel: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        marginBottom: spacing.sm,
    },
    budgetMonthText: {
        color: colors.black,
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
    },
    columns: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalOverlay: {
        flex: 1,
    },
    monthSelectorContainer : {
        display: 'flex',
        gap: spacing.sm,
        borderRadius: 20,
        flexDirection: 'row',
        backgroundColor: 'white',
        marginHorizontal: spacing.sm,
        justifyContent: 'center',
        alignContent: 'center',
        padding: spacing.md,
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.3)',
    },
    monthSelectorText : {
        fontFamily: 'poppins-regular',
        fontSize: fontSize.lg,
        fontWeight: '700',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        paddingBottom: spacing.xxl,
    },
    setButtonContainer: {
        backgroundColor: 'black',
        padding: spacing.md,
        borderRadius: 20,
        width: '90%',
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.3)',
        alignItems: 'center',
    },
    pickerContainer: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    picker: {
        width: '100%',
    },
    setButtonText: {
        color: 'white',
        fontSize: fontSize.lg,
    },
    errorText: {
        color: 'red',
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-Regular',
        marginTop: spacing.sm,
    },
});

