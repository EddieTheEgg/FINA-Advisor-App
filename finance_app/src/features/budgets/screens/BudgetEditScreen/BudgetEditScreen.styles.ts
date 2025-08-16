import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        backgroundColor: colors.background,
        gap: spacing.md,
    },
    headerContainer : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: spacing.md,
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    headerText : {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
    },
    saveBudgetButton : {
        backgroundColor: colors.darkerBackground,
        marginHorizontal: spacing.md,
        borderRadius: 10,
        marginTop: spacing.md,
    },
    saveBudgetButtonText : {
        padding: spacing.md,
        color: colors.white,
        fontFamily: 'Poppins-SemiBold',
        alignSelf: 'center',
        fontSize: fontSize.lg,
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
    cancelModalButton: {
        padding: spacing.md,
        paddingHorizontal: spacing.lg * 2.2,
        borderWidth: 1.5,
        borderColor: colors.gray[300],
        borderRadius: 10,
    },
    cancelModalButtonText : {
        color: colors.black,
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
