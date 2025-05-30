import { StyleSheet} from 'react-native';
import { colors } from '../../../../styles/colors.js';
import { fontSize } from '../../../../styles/fontSizes.js';
import { spacing } from '../../../../styles/spacing.js';

export const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: colors.secondary,
        paddingVertical: spacing.md,
        borderRadius: 30,
        width: '100%',
    },
    buttonText: {
        color: colors.secondary,
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center',
    },
});
