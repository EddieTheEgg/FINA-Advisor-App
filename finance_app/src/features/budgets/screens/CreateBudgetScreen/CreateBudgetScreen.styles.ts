import { Platform, StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { fontSize } from '../../../../styles/fontSizes';
import { spacing } from '../../../../styles/spacing';

export const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: colors.background,
        position: 'relative',
    },
    scrollViewContent : {
        marginHorizontal: spacing.md,
        gap: spacing.md,
    },
    headerRowContainer : {
        flexDirection: 'row',
        marginTop: Platform.OS === 'ios' ? 0 : spacing.md,
    },
    headerTitle : {
        includeFontPadding: false,
        fontSize: fontSize.xl,
        fontFamily: 'Poppins-SemiBold',
        marginLeft: spacing.xl * 1.3,
    },
    createBudgetButtonContainer : {
        position: 'absolute',
        bottom: 100,
        left: spacing.md,
        right: spacing.md,
        borderRadius: 15,
        padding: spacing.md,
        backgroundColor: colors.darkerBackground,
    },
    createBudgetButtonText : {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        color: colors.white,
        textAlign: 'center',
    },
    createSuccessModalContainer : {
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        flex: 1,
        width: '100%',
    },
    createSuccessModalContent : {
        backgroundColor: colors.white,
        marginHorizontal: spacing.lg,
        padding: spacing.md,
        borderRadius: 20,
        alignContent: 'center',
    },
    createSuccessModalImage : {
        alignSelf: 'center',
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    createSuccessModalTitle : {
        alignSelf: 'center',
        fontSize: fontSize.xl,
        fontFamily: 'Poppins-SemiBold',
        marginTop: spacing.sm,
    },
    createSuccessModalText: {
        textAlign: 'center',
        marginVertical: spacing.sm,
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-Regular',
    },
    createSuccessModalButtons : {
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
