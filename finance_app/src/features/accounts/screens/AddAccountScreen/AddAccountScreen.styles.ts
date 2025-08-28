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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: -spacing.lg,
        marginLeft: spacing.lg * 2,
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
