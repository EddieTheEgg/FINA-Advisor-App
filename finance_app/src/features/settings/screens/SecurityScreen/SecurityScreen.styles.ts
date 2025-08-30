import { StyleSheet } from 'react-native';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';
import { colors } from '../../../../styles/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollViewContent: {
        gap: spacing.md,
    },
    headerSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: spacing.md,
    },
    title: {
        fontSize: fontSize.xl,
        fontFamily: 'Poppins-SemiBold',
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
        fontSize: fontSize.lg,
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
        backgroundColor: colors.red,
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
    disabledSaveProfileButton: {
        opacity: 0.5,
    },
    deletingUserContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    image: {
        width: 200,
        height: 200,
        marginLeft: spacing.lg,
        marginBottom: -spacing.lg,
    },
    text: {
        fontSize: fontSize.xxxl,
        fontWeight: 'bold',
        color: colors.black,
        marginLeft: spacing.lg,
    },
});
