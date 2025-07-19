import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../navigation/types/RootNavigatorTypes';

export type EditTransactionScreenProps = NativeStackScreenProps<RootStackParamList, 'EditTransaction'>;

export const EditTransactionScreen = ({route}: EditTransactionScreenProps) => {
    const {transactionId} = route.params;

    return (
        <View>
            <Text>Edit Transaction</Text>
            <Text>{transactionId}</Text>
        </View>
    );
};
