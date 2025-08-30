import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { fontSize } from '../../../../styles/fontSizes';
import { spacing } from '../../../../styles/spacing';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollViewContent: {
        gap: spacing.sm,
    },
    headerSection: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: spacing.md,
    },
    title: {
        fontSize: fontSize.xl,
        fontFamily: 'Poppins-SemiBold',
    },
    saveProfileButton: {
        backgroundColor: colors.darkerBackground,
        marginHorizontal: spacing.md,
        borderRadius: 20,
        marginTop: spacing.md,
    },
    saveProfileButtonText: {
        padding: spacing.md,
        color: colors.white,
        fontFamily: 'Poppins-SemiBold',
        alignSelf: 'center',
        fontSize: fontSize.lg,
    },
    disabledSaveProfileButton: {
        backgroundColor: colors.gray[400],
        opacity: 0.6,
    },
    invalidFieldsAboveText: {
        color: colors.red,
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-Regular',
        marginHorizontal: spacing.md,
        alignSelf: 'center',
    },
    validatingText: {
        fontFamily: 'Poppins-SemiBold',
        alignSelf: 'center',
        marginVertical: spacing.md,
    },
    passwordEnterToSaveModalContainer : {
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        flex: 1,
        width: '100%',
    },
    passwordEnterToSaveModalContent : {
        backgroundColor: colors.white,
        marginHorizontal: spacing.lg,
        padding: spacing.md,
        borderRadius: 20,
        alignContent: 'center',
        alignItems: 'center',
    },
    passwordEnterToSaveModalImage : {
        alignSelf: 'center',
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    passwordEnterToSaveModalTitle : {
        alignSelf: 'center',
        fontSize: fontSize.xl,
        fontFamily: 'Poppins-SemiBold',
        marginVertical: spacing.sm,
    },
    passwordEnterToSaveModalInput: {
        borderColor: colors.gray[500],
        borderBottomWidth: 2,
        borderRadius: 10,
        paddingRight: spacing.xxl,
        paddingLeft: spacing.sm,
        paddingBottom: spacing.sm,
        marginBottom: spacing.md,
        fontSize: fontSize.base,
        fontFamily: 'Poppins-Regular',
        width: '100%',
    },
    eyeIcon: {
        position: 'absolute',
        bottom: spacing.lg,
        right: -spacing.xxl * 3.3,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: spacing.sm,
        fontSize: fontSize.xxl,
    },
    passwordEnterToSaveModalText: {
        textAlign: 'center',
        marginVertical: spacing.sm,
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-Regular',
    },
    passwordEnterToSaveModalTextBold : {
        fontFamily: 'Poppins-SemiBold',
    },
    passwordEnterToSaveModalButtons : {
        marginTop: spacing.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: spacing.md,
    },
    passwordEnterToSaveModalButton : {
        padding: spacing.md,
        paddingHorizontal: spacing.lg * 2.2,
        backgroundColor: colors.blue,
        borderRadius: 10,
    },
    passwordEnterToSaveModalButtonText : {
        color: colors.white,
        fontFamily: 'Poppins-SemiBold',
    },
    cancelPasswordEnterToSaveModalButton: {
        padding: spacing.md,
        paddingHorizontal: spacing.lg * 2.2,
        borderWidth: 1.5,
        borderColor: colors.gray[300],
        borderRadius: 10,
    },
    cancelPasswordEnterToSaveModalButtonText : {
        color: colors.black,
        fontFamily: 'Poppins-SemiBold',
    },
    passwordErrorText: {
        color: colors.red,
        fontFamily: 'Poppins-Medium',
        fontSize: fontSize.sm,
        textAlign: 'center',
        marginTop: spacing.xs,
    },
    validatingPasswordText: {
        fontFamily: 'Poppins-Medium',
        fontSize: fontSize.sm,
        marginTop: spacing.xs,
        alignSelf: 'center',
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
