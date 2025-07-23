import { StyleSheet } from 'react-native';
import { fontSize } from '../../../../styles/fontSizes';
import { spacing } from '../../../../styles/spacing';

export const styles = StyleSheet.create({
    accountFilterMainContainer : {
        marginVertical: spacing.md,
    },
    accountFilterContainer: {
      display: 'flex',
      gap: spacing.md,
      justifyContent: 'flex-start',
    },
    accountFilterLabel : {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        marginBottom: spacing.sm,
    },
});
