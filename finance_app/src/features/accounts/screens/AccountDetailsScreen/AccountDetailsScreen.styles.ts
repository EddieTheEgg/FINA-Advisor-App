import { Platform, StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    accountDetailsContainer: {
        flex: 1,
        backgroundColor: colors.background,
    },
    accountDetailsHeader : {
        display: 'flex',
        flexDirection: 'row',
        gap: spacing.sm,
        alignItems: 'center',
        marginTop: Platform.OS === 'ios' ? 0 : spacing.md,
        marginHorizontal: spacing.md,
        justifyContent: 'space-between',
        marginVertical: spacing.sm,
    },
    accountDetailsTitle: {
        fontSize: fontSize.xxl,
        fontFamily: 'Poppins-SemiBold',
        includeFontPadding: false,
    },
    accountDetailsCardContainer : {
        marginHorizontal: spacing.md,
    },
    transactionListContainer : {
        marginHorizontal: spacing.md,
    },
    transactionHistoryContainer : {
        paddingTop: spacing.sm,
        backgroundColor: colors.white,
        borderRadius: 20,
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.3)',
    },
    transactionListTitle: {
        color: colors.black,
        fontSize: fontSize.xl,
        fontFamily: 'Poppins-SemiBold',
        marginVertical: spacing.md,
    },
    separator : {
      backgroundColor: colors.gray[200],
      height: 1,
      borderRadius: 12,
      marginVertical: spacing.sm,
    },
    accountQuickActionCardContainer : {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: colors.white,
        padding: spacing.sm,
        marginTop: spacing.sm,
        marginHorizontal: spacing.md,
        borderRadius: 20,
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.3)',
    },
    deletionModalContainer : {
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
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
    deletionModalButton : {
        padding: spacing.md,
        paddingHorizontal: spacing.lg * 2.2,
        backgroundColor: colors.darkerRed,
        borderRadius: 10,
    },
    deletionModalButtonText : {
        color: colors.white,
        fontFamily: 'Poppins-SemiBold',
    },
    cancelDeletionModalButton: {
        padding: spacing.md,
        paddingHorizontal: spacing.lg * 2.2,
        borderWidth: 1.5,
        borderColor: colors.gray[300],
        borderRadius: 10,
    },
    cancelDeletionModalButtonText : {
        color: colors.black,
        fontFamily: 'Poppins-SemiBold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    image: {
        width: 200,
        height: 200,
        marginLeft: spacing.lg * 2,
        marginBottom: -spacing.lg,
    },
    text: {
        fontSize: fontSize.xxxl,
        fontWeight: 'bold',
        color: colors.black,
        marginLeft: spacing.lg,
    },
    modalContainer : {
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        flex: 1,
        width: '100%',
    },
    modalContent : {
        backgroundColor: colors.white,
        marginHorizontal: spacing.lg,
        padding: spacing.md,
        borderRadius: 20,
        alignContent: 'center',
        alignItems: 'center',
    },
    modalImage : {
        alignSelf: 'center',
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    modalTitle : {
        alignSelf: 'center',
        fontSize: fontSize.xl,
        fontFamily: 'Poppins-SemiBold',
        marginTop: spacing.sm,
    },
    modalText: {
        textAlign: 'center',
        marginVertical: spacing.sm,
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-Regular',
    },
    modalTextBold : {
        fontFamily: 'Poppins-SemiBold',
    },
    modalButtons : {
        marginTop: spacing.md,
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: spacing.sm,
    },
    modalButton : {
        padding: spacing.md,
        paddingHorizontal: spacing.lg * 2.2,
        backgroundColor: colors.blue,
        borderRadius: 10,
    },
    modalButtonText : {
        color: colors.white,
        fontFamily: 'Poppins-SemiBold',
    },
    continueButton : {
        backgroundColor: colors.blue,
        padding: spacing.md,
        paddingHorizontal: spacing.xxl * 2.3,
        borderRadius: 10,
    },
    continueButtonText: {
        color: colors.white,
        fontFamily: 'Poppins-SemiBold',
    },
});
