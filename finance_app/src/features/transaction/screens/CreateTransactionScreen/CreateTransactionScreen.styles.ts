import { StyleSheet } from 'react-native';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';
import { colors } from '../../../../styles/colors';

export const styles = StyleSheet.create({
    container : {
        flex: 1,
    },
    backgroundContainer : {
        display: 'flex',
        flex: 1,
        backgroundColor: colors.background,
    },
    header : {
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: spacing.md,
        alignItems: 'center',
        gap: spacing.xxl + 19,
        marginBottom: spacing.sm,
    },
    title : {
        includeFontPadding: false,
        fontSize: fontSize.xl,
        fontFamily: 'Poppins-SemiBold',
    },
    transactionTypeContainer : {
        marginHorizontal: spacing.md,
    },
    expenseSection : {
        gap: spacing.md,
        marginVertical: spacing.md,
        marginHorizontal: spacing.md,
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
    },
    continueButtonText: {
        color: colors.white,
        fontFamily: 'Poppins-SemiBold',
    },
});
