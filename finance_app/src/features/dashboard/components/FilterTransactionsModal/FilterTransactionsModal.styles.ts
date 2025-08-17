import { StyleSheet } from 'react-native';
import { fontSize } from '../../../../styles/fontSizes';
import { spacing } from '../../../../styles/spacing';
import { colors } from '../../../../styles/colors';

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 20,
    },
    modalHeader : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.md,
    },
    modalHeaderTitle : {
        fontSize: fontSize.xl,
        fontFamily: 'Poppins-SemiBold',
    },
    modalBody : {
        display: 'flex',
        gap: spacing.md,
        width: '100%',
        paddingHorizontal: spacing.md,
    },
    modalBodyContainer : {
        paddingHorizontal: spacing.md,
    },
    modalFooter : {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: colors.white,
        justifyContent: 'space-evenly',
        paddingTop: spacing.md,
        paddingBottom: spacing.md,
        borderTopColor: colors.gray[200],
        borderTopWidth: 1,
    },
    applyFiltersButton : {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        backgroundColor: colors.darkerBackground,
        borderRadius: 10,
    },
    applyFiltersButtonText : {
        color: colors.white,
        fontFamily: 'Poppins-SemiBold',
        fontSize: fontSize.lg,
    },
    clearAllButton : {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        backgroundColor: colors.gray[100],
        borderWidth: 1.5,
        borderColor: colors.gray[200],
        borderRadius: 10,

    },
    clearAllButtonText : {
        color: colors.gray[600],
        fontFamily: 'Poppins-SemiBold',
        fontSize: fontSize.lg,
    },
    filterInfoText : {
        fontFamily: 'Poppins-Medium',
        fontSize: fontSize.sm,
        color: colors.gray[600],
        marginHorizontal: spacing.md,
        backgroundColor: colors.lightBlue,
        padding: spacing.sm,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.darkBlue,
    },
});
