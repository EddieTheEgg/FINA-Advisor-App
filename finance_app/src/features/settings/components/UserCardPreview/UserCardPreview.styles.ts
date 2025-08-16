import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    cardContainer : {
        backgroundColor: colors.white,
        padding: spacing.md,
        borderRadius: 20,
        marginHorizontal: spacing.md,
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.3)',
        alignItems: 'center',
    },
    nameText: {
        fontSize: fontSize.xl,
        fontFamily: 'Poppins-SemiBold',
    },
    emailText : {
        color: colors.gray[500],
        fontFamily: 'Poppins-Medium',
        fontSize: fontSize.sm,
    },
    editProfileContainer : {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        backgroundColor: colors.gray[100],
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.gray[300],
        marginTop: spacing.sm,
    },
    editProfileText : {
        fontSize: fontSize.base,
        fontFamily: 'Poppins-SemiBold',
        color: colors.gray[600],
    },
});
