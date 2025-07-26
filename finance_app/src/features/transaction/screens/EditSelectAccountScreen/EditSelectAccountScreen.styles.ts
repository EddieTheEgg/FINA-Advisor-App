import { StyleSheet } from 'react-native';
import { spacing } from '../../../../styles/spacing';
import { colors } from '../../../../styles/colors';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    screenContainer : {
        flex: 1,
        backgroundColor: colors.background,
    },
    groupedAccountListContainer : {
        marginHorizontal: spacing.md,
    },
    selectAccountHeader : {
        marginVertical: spacing.md,
        marginHorizontal: spacing.md,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    selectAccountTitle : {
        fontSize: fontSize.xxl,
        fontFamily: 'Poppins-SemiBold',
    },
});
