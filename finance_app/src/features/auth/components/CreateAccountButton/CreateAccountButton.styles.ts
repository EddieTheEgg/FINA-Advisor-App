import { StyleSheet} from 'react-native';
import { colors } from '../../../../styles/colors.js';
import { fontSize } from '../../../../styles/fontSizes.js';
import { spacing } from '../../../../styles/spacing.js';

export const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: colors.darkerBackground,
        paddingVertical: spacing.md,
        borderRadius: 15,
        width: '100%',
    },
    buttonText: {
        color: colors.darkerBackground,
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center',
    },
});
