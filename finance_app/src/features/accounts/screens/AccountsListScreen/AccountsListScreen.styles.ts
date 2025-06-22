import { StyleSheet } from 'react-native';
import { fontSize } from '../../../../styles/fontSizes';
import { spacing } from '../../../../styles/spacing';
import { colors } from '../../../../styles/colors';

export const styles = StyleSheet.create({
    accountBackground: {
        flex: 1,
        backgroundColor: colors.background,
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: spacing.md,
    },
    headerAccountTitle: {
        fontSize: fontSize.xxxl,
        fontFamily: 'Poppins-SemiBold',
    },
    netWorthCardContainer : {

    },
    accountListContainer: {
        marginTop: spacing.md,
        marginHorizontal: spacing.sm,
    },
});
