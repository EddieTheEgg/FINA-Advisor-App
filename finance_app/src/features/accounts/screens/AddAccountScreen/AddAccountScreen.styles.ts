import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { fontSize } from '../../../../styles/fontSizes';
import { spacing } from '../../../../styles/spacing';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: spacing.md,
    },
    headerText: {
        fontSize: fontSize.xl,
        fontFamily: 'Poppins-SemiBold',
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: spacing.xxl * 2,
    },
    createAccountButton: {
        backgroundColor: colors.darkerBackground,
        padding: spacing.md,
        borderRadius: 20,
        marginHorizontal: spacing.md,
        alignItems: 'center',
        marginTop: spacing.md,
    },
    createAccountButtonText: {
        color: colors.white,
        fontFamily: 'Poppins-SemiBold',
        fontSize: fontSize.lg,
    },
    invalidAccountCreationText: {
        fontSize: fontSize.base,
        fontFamily: 'Poppins-Regular',
        color: colors.red,
        marginHorizontal: spacing.md,
        marginTop: spacing.md,
        alignSelf: 'center',
    },
});
