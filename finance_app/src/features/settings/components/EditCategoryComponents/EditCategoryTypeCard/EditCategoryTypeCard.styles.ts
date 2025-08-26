import { StyleSheet } from 'react-native';
import { colors } from '../../../../../styles/colors';
import { spacing } from '../../../../../styles/spacing';
import { fontSize } from '../../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        padding: spacing.md,
        borderRadius: 20,
        marginHorizontal: spacing.md,
        boxShadow: '0px 3px 3px 0px rgba(0, 0, 0, 0.25)',
    },
    title: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: fontSize.lg,
    },
    contentContainer : {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.gray[100],
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.gray[200],
        padding: spacing.md,
        gap: spacing.sm,
        marginVertical: spacing.sm,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icon: {
        fontSize: fontSize.xl,
        padding: spacing.sm + 5,
        borderRadius: 15,
    },
    textContainer: {
        flex: 1,
        width: '50%',
    },
    categoryTypeLabel: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: fontSize.lg,
    },
    description: {
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-Medium',
        color: colors.gray[600],
    },
    lockIcon: {
        fontSize: fontSize.base,
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
        fontFamily: 'Poppins-Regular',
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
