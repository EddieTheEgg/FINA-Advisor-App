import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        padding: spacing.md,
        marginHorizontal: spacing.md,
        borderRadius: 20,
        marginTop: spacing.md,
        gap: spacing.md,
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.2)',
    },
    accountTypeItem: {
        alignItems: 'center',
        padding: spacing.md,
        borderWidth: 1.5,
        borderColor: colors.gray[200],
        borderRadius: 15,
        width: 160,
        gap: spacing.sm,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    title: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
    },
    accountTypeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
        paddingBottom: spacing.md,
    },
    accountTypeIcon: {
        fontSize: fontSize.lg * 2,
    },
    accountTypeName: {
        fontSize: fontSize.base,
        fontFamily: 'Poppins-SemiBold',
    },
    selectedAccountType: {
        backgroundColor: colors.background,
        borderColor: colors.darkerBackground,
    },
    scrollText: {
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-Regular',
        color: colors.gray[500],
    },
});
