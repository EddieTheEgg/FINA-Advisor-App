import { StyleSheet, Platform, Dimensions } from 'react-native';
import { colors } from '../../../../styles/colors.js';
import { fontSize } from '../../../../styles/fontSizes.js';
import { spacing } from '../../../../styles/spacing.js';

const { width: screenWidth } = Dimensions.get('window');
const imageSize = screenWidth * 0.7;

export const WelcomeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  imageContainer: {
    width: imageSize,
    height: imageSize,
  },
  appTitle: {
    fontSize: fontSize.xxxxl,
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'center',
  },


  tagline: {
    fontSize: fontSize.base,
    fontFamily: 'Poppins-Regular',
    letterSpacing: 1.5,
    color: colors.black,
    textAlign: 'center',
  },

  imageBackground: {
    width: '120%',
    position: 'absolute',
    bottom: Platform.OS === 'android' ? -290 : -230,
    zIndex: 0,
    borderRadius: 60,
    overflow: 'hidden',
    elevation: 0,
  },
  buttonContainer: {
    marginTop: spacing.xxl,
    display: 'flex',
    gap: spacing.md,
    width: '100%',
  },
});

