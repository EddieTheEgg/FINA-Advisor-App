import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { fontSize } from '../../../../styles/fontSizes';
import { spacing } from '../../../../styles/spacing';

export const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: colors.background,
    },
    headerSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: spacing.md,
    },
    headerTitle : {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
    },
});
