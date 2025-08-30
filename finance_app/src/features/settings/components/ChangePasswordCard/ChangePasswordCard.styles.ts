import { StyleSheet } from 'react-native';
import { spacing } from '../../../../styles/spacing';
import { colors } from '../../../../styles/colors';
import { fontSize } from '../../../../styles/fontSizes';


export const styles = StyleSheet.create({
    container: {
        marginHorizontal: spacing.md,
        backgroundColor: colors.white,
        padding: spacing.md,
        borderRadius: 20,
        gap: spacing.sm,
    },
    title: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
    },
    subTitle: {
        fontSize: fontSize.base,
        fontFamily: 'Poppins-SemiBold',
    },
    input: {
        backgroundColor: colors.gray[50],
        borderRadius: 10,
        padding: spacing.sm,
        fontSize: fontSize.base,
        fontFamily: 'Poppins-Regular',
        color: colors.black,
        borderWidth: 2,
        borderColor: colors.gray[200],
    },
    updatePasswordButton: {
        backgroundColor: colors.darkerBackground,
        borderRadius: 20,
        padding: spacing.md,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing.md,
    },
    updatePasswordButtonText: {
        color: colors.white,
        fontFamily: 'Poppins-SemiBold',
        fontSize: fontSize.lg,
    },
    validationText: {
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-Regular',
    },
    eyeIcon: {
        position: 'absolute',
        right: spacing.sm,
        bottom: spacing.sm + 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: spacing.sm,
        fontSize: fontSize.xl,
    },
    errorText: {
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-Regular',
        color: colors.red,
    },
    successText: {
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-Regular',
        color: colors.green,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    inputContainer: {
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
