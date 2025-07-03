import { StyleSheet } from 'react-native';
import { spacing } from '../../../../styles/spacing';
import { colors } from '../../../../styles/colors';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    keyboardAvoidingView : {
        flex: 1,
    },
    transferScreenContainer : {
        flex: 1,
        backgroundColor: colors.background,
    },
    headerSection : {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: spacing.md,
        gap: spacing.xxl + 21,
        marginBottom: spacing.sm,
    },
    headerTitle: {
        fontSize: fontSize.xxl,
        fontFamily: 'Poppins-SemiBold',
        color: colors.black,
    },
    accountToFromContainer : {
        backgroundColor: colors.white,
        borderRadius: 20,
        marginHorizontal: spacing.md,
        padding: spacing.md,
        gap: spacing.sm,
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    },
    accountToFromTitle: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
    },
    downArrowContainer : {
        marginHorizontal: spacing.md,
        alignSelf: 'center',
        marginVertical: spacing.lg,
    },
    transferAmountCardContainer : {
        marginHorizontal: spacing.md,
        marginVertical: spacing.sm,
    },
    transferTitleContainer: {
        marginHorizontal: spacing.md,
        marginTop: spacing.lg,
    },
    optionalDetailsContainer: {
        marginTop: spacing.sm,
        marginHorizontal: spacing.md,
    },
});
