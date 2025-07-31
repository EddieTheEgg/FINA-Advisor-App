import { StyleSheet } from 'react-native';
import { colors } from '../../../../../styles/colors';
import { spacing } from '../../../../../styles/spacing';
import { fontSize } from '../../../../../styles/fontSizes';


export const styles = StyleSheet.create({
    container : {
        backgroundColor: colors.lightBlue,
        padding: spacing.md,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.darkBlue,
    },
    seperator: {
        height: 1,
        backgroundColor: colors.darkBlue,
        marginVertical: spacing.xs,
    },
    title : {
        fontSize: fontSize.base,
        fontFamily: 'Poppins-SemiBold',
        color: colors.darkBlue,
    },
    description : {
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-Regular',
        color: colors.darkBlue,
        marginTop: spacing.xs,
        includeFontPadding: false,
    },
    accountContainer : {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: spacing.sm,
    },
    accountInfo: {
        alignItems: 'center',
    },
    accountName : {
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-SemiBold',
        color: colors.darkBlue,
    },
    accountBalance : {
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-SemiBold',
        color: colors.darkBlue,
    },

});