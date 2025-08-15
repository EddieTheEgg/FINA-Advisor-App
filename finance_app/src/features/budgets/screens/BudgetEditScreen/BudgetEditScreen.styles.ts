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
});
