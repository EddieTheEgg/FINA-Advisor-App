import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GoBackButton from '../../../auth/components/GoBackButton/GoBackButton';

export const TransferAccountSelectionScreen = () => {
    const insets = useSafeAreaInsets();
    return (
        <View style = {{paddingTop: insets.top}}>
            <GoBackButton />
            <Text>This is the transfer account selection screen</Text>
        </View>
    );
};

