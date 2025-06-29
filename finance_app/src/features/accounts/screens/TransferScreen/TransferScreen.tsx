import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { AccountNavigatorParamList } from '../../../../navigation/types/AccountNavigatorTypes';
import { RouteProp } from '@react-navigation/native';

export const TransferScreen = () => {
    const { thisAccountDetails } = useRoute<RouteProp<AccountNavigatorParamList, 'Transfer'>>().params;
    const insets = useSafeAreaInsets();
    return (
        <View style = {{paddingTop: insets.top}}>
            <Text>This is the transfer Screen</Text>
            <Text>{thisAccountDetails.name}</Text>
        </View>
    );
};
