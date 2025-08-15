import { Platform, StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

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
    headerSection: {
        flexDirection: 'row',
        marginTop: Platform.OS === 'android' ? spacing.sm : 0,
        justifyContent: 'space-between',
    },
    headerTitle: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: fontSize.xl,
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
    containerDelete: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    imageDelete: {
        width: 200,
        height: 200,
        marginBottom: -spacing.lg,
        marginLeft: spacing.lg,
    },
    textDelete: {
        fontSize: fontSize.xxxl,
        fontWeight: 'bold',
        color: colors.black,
    },
    editBudgetContainer : {
        position: 'absolute',
        bottom: 100,
        backgroundColor: colors.darkerBackground,
        left: spacing.md,
        right: spacing.md,
        alignItems: 'center',
        padding: spacing.md,
        borderRadius: 10,
    },
    editBudgetText : {
        fontSize: fontSize.lg,
        color: colors.white,
        fontFamily: 'Poppins-SemiBold',
    },
});
