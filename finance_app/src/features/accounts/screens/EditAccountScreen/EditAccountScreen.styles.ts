import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        position: 'relative',
        backgroundColor: colors.background,
    },
    headerSection: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: spacing.md,
    },
    headerTitle: {
        fontSize: fontSize.xl,
        fontFamily: 'Poppins-SemiBold',
    },
    saveAccountButton: {
        backgroundColor: colors.darkerBackground,
        padding: spacing.md,
        marginHorizontal: spacing.md,
        marginVertical: spacing.md,
        alignItems: 'center',
        borderRadius: 20,
    },
    saveAccountButtonText: {
        fontSize: fontSize.lg,
        color: colors.white,
        fontFamily: 'Poppins-SemiBold',
    },
    saveValidationText: {
        fontSize: fontSize.base,
        color: colors.red,
        fontFamily: 'Poppins-Regular',
        alignSelf: 'center',
        marginHorizontal: spacing.md,
        marginTop: spacing.sm,
        includeFontPadding: false,
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: -spacing.lg,
    },
    text: {
        fontSize: fontSize.xxxl,
        fontWeight: 'bold',
        color: colors.black,
        marginLeft: spacing.lg,
    },
});
