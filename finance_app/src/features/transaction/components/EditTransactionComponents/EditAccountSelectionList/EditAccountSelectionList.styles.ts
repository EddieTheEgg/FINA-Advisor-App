import { StyleSheet } from 'react-native';
import { spacing } from '../../../../../styles/spacing';
import { colors } from '../../../../../styles/colors';
import { fontSize } from '../../../../../styles/fontSizes';
import { Platform } from 'react-native';

export const styles = StyleSheet.create({
    groupedAccountsContainer : {
      marginBottom: spacing.md,
    },
    accountGroupTitle : {
        fontSize: fontSize.xl,
        fontFamily: 'Poppins-SemiBold',
        color: colors.gray[600],
        lineHeight: Platform.OS === 'android' ? 30 : 0,
        marginBottom: spacing.sm,
    },
    separator : {
        marginTop: spacing.sm,
    },
});
