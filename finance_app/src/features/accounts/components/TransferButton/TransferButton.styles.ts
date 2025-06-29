import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    accountQuickActionCardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    actionButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        minWidth: 80,
        alignItems: 'center',
    },
    actionText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
});
