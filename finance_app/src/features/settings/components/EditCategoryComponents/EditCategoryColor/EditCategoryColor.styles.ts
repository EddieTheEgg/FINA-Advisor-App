import { StyleSheet } from 'react-native';
import { colors } from '../../../../../styles/colors';
import { spacing } from '../../../../../styles/spacing';
import { fontSize } from '../../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        padding: spacing.md,
        marginHorizontal: spacing.md,
        borderRadius: 20,
        gap: spacing.sm,
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.2)',
    },
    title: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
    },
    colorSelectContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: colors.gray[300],
        gap: spacing.sm,
    },
    colorPreview: {
        width: 50,
        height: 50,
        borderRadius: 15,
    },
    colorDescriptionContainer: {
        flex: 2,
    },
    colorDescriptionTitle: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        includeFontPadding: false,
    },
    colorDescriptionText: {
        color: colors.gray[500],
        fontFamily: 'Poppins-Medium',
    },
    // Modal styles
    modalContainer: {
        flex: 1,
        backgroundColor: colors.white,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray[200],
        paddingTop: spacing.xl + 10,
    },
    modalTitle: {
        fontSize: fontSize.xl,
        fontFamily: 'Poppins-SemiBold',
        flex: 1,
    },
    closeButton: {
        padding: spacing.sm,
    },
    colorContainer: {
        flex: 1,
        paddingHorizontal: spacing.md,
        paddingTop: spacing.md,
    },
    colorSection: {
        marginBottom: spacing.lg,
    },
    categoryTitle: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        marginBottom: spacing.sm,
        color: colors.black,
    },
    colorGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
    },
    colorButton: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.2)',
    },
    selectedColor: {
        borderColor: colors.black,
        borderWidth: 3,
    },
    // Loading styles
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-Medium',
        color: colors.gray[500],
    },
});
