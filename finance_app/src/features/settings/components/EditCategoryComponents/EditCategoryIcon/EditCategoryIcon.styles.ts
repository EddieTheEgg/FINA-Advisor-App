import { StyleSheet } from 'react-native';
import { colors } from '../../../../../styles/colors';
import { spacing } from '../../../../../styles/spacing';
import { fontSize } from '../../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    container : {
        backgroundColor: colors.white,
        padding: spacing.md,
        marginHorizontal: spacing.md,
        borderRadius: 20,
        gap: spacing.sm,
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.2)',
    },
    title : {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
    },
    iconSelectContainer : {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: colors.gray[300],
        gap: spacing.sm,
    },
    iconSelectText : {
        fontSize: fontSize.xl,
        padding: spacing.sm + 5,
        borderRadius: 15,
    },
    iconDescriptionContainer : {
        flex: 2,
    },
    iconDescriptionTitle: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        includeFontPadding: false,
    },
    iconDescriptionText : {
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
    searchInput: {
        margin: spacing.md,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: colors.gray[300],
        borderRadius: 10,
        fontSize: fontSize.base,
        fontFamily: 'Poppins-Medium',
    },
    emojiContainer: {
        flex: 1,
        paddingHorizontal: spacing.md,
    },
    categorySection: {
        marginBottom: spacing.lg,
    },
    categoryTitle: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        color: colors.black,
        includeFontPadding: false,
    },
    divider : {
        height: 1,
        backgroundColor: colors.gray[200],
        marginVertical: spacing.sm,
    },
    emojiGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
        justifyContent: 'center',
    },
    emojiButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: colors.gray[100],
        borderWidth: 1,
        borderColor: colors.gray[200],
    },
    selectedEmoji: {
        backgroundColor: colors.background,
        borderColor: colors.darkerBackground,
        borderWidth: 2,
    },
    emojiText: {
        fontSize: fontSize.xl,
        padding: spacing.md,
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
