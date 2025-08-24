import { StyleSheet } from 'react-native';
import { colors } from '../../../../../styles/colors';
import { spacing } from '../../../../../styles/spacing';
import { fontSize } from '../../../../../styles/fontSizes';

export const styles = StyleSheet.create({
   container: {
      backgroundColor: colors.white,
      borderRadius: 20,
      padding: spacing.md,
      marginBottom: spacing.md,
      marginHorizontal: spacing.md,
      boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
   },
   headerText: {
      alignSelf: 'center',
      fontSize: fontSize.lg,
      fontFamily: 'Poppins-SemiBold',
   },
   subHeaderContainer: {
      marginVertical: spacing.sm,
   },
   subHeaderText: {
      color: colors.gray[500],
      fontFamily: 'Poppins-Medium',
      textAlign: 'center',
      fontSize: fontSize.sm,
   },
   detailsContainer: {
      gap: spacing.sm,
      padding: spacing.md,
      backgroundColor: colors.gray[100],
      borderRadius: 20,
   },
   detailsHeader:{
      fontFamily: 'Poppins-SemiBold',
      fontSize: fontSize.base,
      marginBottom: spacing.sm,
   },
   detailsText: {
      fontFamily: 'Poppins-Regular',
      fontSize: fontSize.sm,
      color: colors.gray[600],
   },
   detailsTextBold: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: fontSize.sm,
   },
});
