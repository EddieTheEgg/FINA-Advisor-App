import { StyleSheet } from 'react-native';
import { colors } from '../../../../../styles/colors';
import { spacing } from '../../../../../styles/spacing';
import { fontSize } from '../../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        marginHorizontal: spacing.md,
        marginTop: spacing.md,
        padding: spacing.md,
        borderRadius: 20,
    },
    budgetDetailsTitle: {
        fontSize: fontSize.base,
        fontFamily: 'Poppins-Semibold',
    },
    budgetDetailsHeaderSection : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    budgetDetailsContentSection : {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
        gap: spacing.sm,
        backgroundColor: colors.gray[100],
        borderRadius: 10,
        marginVertical: spacing.sm,
    },
    budgetDetailsIcon: {
        padding: spacing.sm + 2,
        borderRadius: 10,
        fontSize: fontSize.lg,
    },
    budgetDetailsTitleContainer: {
         flex: 2,
    },
    budgetDetailsPeriod: {
        fontFamily: 'Poppins-Medium',
        fontSize: fontSize.xs,
        color: colors.gray[600],
    },
    modalContainer : {
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        flex: 1,
        width: '100%',
    },
    modalContent : {
        backgroundColor: colors.white,
        marginHorizontal: spacing.lg,
        padding: spacing.md,
        borderRadius: 20,
        alignContent: 'center',
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
        fontFamily: 'Poppins-Medium',
    },
    modalCloseButton : {
        padding: spacing.md,
        paddingHorizontal: spacing.lg * 5,
        backgroundColor: colors.blue,
        borderRadius: 10,
        color: colors.white,
        fontFamily: 'Poppins-SemiBold',
        fontSize: fontSize.base,
        alignSelf: 'center',
    },
});
