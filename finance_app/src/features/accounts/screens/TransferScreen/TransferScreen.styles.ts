import { StyleSheet } from 'react-native';
import { spacing } from '../../../../styles/spacing';
import { colors } from '../../../../styles/colors';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        position: 'relative',
    },
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
        includeFontPadding: false,
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
    errorText: {
        color: colors.red,
        fontSize: fontSize.base,
        textAlign: 'center',
        marginHorizontal: spacing.md,
        marginTop: spacing.md,
        fontFamily: 'Poppins-Medium',
    },
    deletionModalContainer : {
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        flex: 1,
        width: '100%',
    },
    deletionModalContent : {
        backgroundColor: colors.white,
        marginHorizontal: spacing.lg,
        padding: spacing.md,
        borderRadius: 20,
        alignContent: 'center',
    },
    deletionModalImage : {
        alignSelf: 'center',
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    deletionModalTitle : {
        alignSelf: 'center',
        fontSize: fontSize.xl,
        fontFamily: 'Poppins-SemiBold',
        marginTop: spacing.sm,
    },
    deletionModalText: {
        textAlign: 'center',
        marginVertical: spacing.sm,
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-Regular',
    },
    deletionModalButtons : {
        marginTop: spacing.md,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    continueButton : {
        backgroundColor: colors.blue,
        padding: spacing.md,
        paddingHorizontal: spacing.xxl * 2.3,
        borderRadius: 10,
        alignSelf: 'center',
    },
    continueButtonText: {
        color: colors.white,
        fontFamily: 'Poppins-SemiBold',
    },
});
