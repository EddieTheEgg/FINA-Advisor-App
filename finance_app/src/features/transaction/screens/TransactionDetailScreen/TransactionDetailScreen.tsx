import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../navigation/types/RootNavigatorTypes';
import { View, Text } from 'react-native';

export type TransactionDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'TransactionDetail'>;

export const TransactionDetailScreen = ({route}: TransactionDetailScreenProps) => {
    const {transactionId} = route.params;

    return (
        <View>
            <Text>Transaction Detail</Text>
            <Text>{transactionId}</Text>
        </View>
    );
};
