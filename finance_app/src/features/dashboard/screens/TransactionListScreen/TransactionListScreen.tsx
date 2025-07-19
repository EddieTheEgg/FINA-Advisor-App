import { View, Text } from 'react-native';
import { styles } from './TransactionListScreen.styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const TransactionListScreen = () => {

    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, {paddingTop: insets.top}]}>
            <Text>Transaction List</Text>
        </View>
    );
};

