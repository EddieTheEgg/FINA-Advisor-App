import { StyleSheet} from 'react-native';
import { colors } from '../../../../styles/colors.js';
import { fontSize } from '../../../../styles/fontSizes.js';
import { spacing } from '../../../../styles/spacing.js';


export const styles = StyleSheet.create({
  signOutContainer: {
    backgroundColor: colors.darkerBackground,
    padding: spacing.md,
    borderRadius: 30,
    width: '100%',
    boxShadow: '0 8px 2x 0 rgba(0, 0, 0, 0.3)',
  },
  buttonText: {
    color: colors.white,
    fontSize: fontSize.lg,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
});
