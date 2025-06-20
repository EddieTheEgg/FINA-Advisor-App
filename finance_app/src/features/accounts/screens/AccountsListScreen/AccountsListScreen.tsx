import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const AccountsListScreen = () => {
    const insets = useSafeAreaInsets();
    return (
        <ScrollView style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
            <Text>My Accounts</Text>
        </ScrollView>
    );
};
