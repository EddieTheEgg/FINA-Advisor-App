import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './AccountsListScreen.styles';

export const AccountsListScreen = () => {
    const insets = useSafeAreaInsets();
    return (
        <ScrollView style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
            <Text>💳 My Accounts</Text>
            <View style = {styles.totalNetContainer}>
                <Text>Total Net Worth</Text>
            </View>
        </ScrollView>
    );
};