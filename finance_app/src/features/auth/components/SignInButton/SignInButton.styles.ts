import { StyleSheet} from 'react-native';
import { colors } from '../../../../styles/colors.js';
import { fontSize } from '../../../../styles/fontSizes.js';
import { spacing } from '../../../../styles/spacing.js';


export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignSelf: 'stretch',
  },
  container: {
    backgroundColor: colors.darkerBackground,
    paddingVertical: spacing.md,
    borderRadius: 15,
    width: '100%',
    boxShadow: '0 4px 4px 1px rgba(0, 0, 0, 0.2)',
  },
  buttonText: {
    color: colors.white,
    fontSize: fontSize.lg,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
});
