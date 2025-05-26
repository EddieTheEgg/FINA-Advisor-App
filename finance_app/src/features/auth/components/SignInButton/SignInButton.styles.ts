import { StyleSheet} from 'react-native';
import { colors } from '../../../../styles/colors.js';
import { fontSize } from '../../../../styles/fontSizes.js';
import { spacing } from '../../../../styles/spacing.js';


export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
   paddingVertical: spacing.md,
   borderRadius: 30,
        width: '100%',
  },
  buttonText: {
    color: colors.white,
    fontSize: fontSize.lg,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
});
