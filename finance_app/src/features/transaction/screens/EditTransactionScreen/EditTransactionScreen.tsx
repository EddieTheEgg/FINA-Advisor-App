import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../navigation/types/RootNavigatorTypes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import { styles } from './EditTransactionScreen.styles';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';


export type EditTransactionScreenProps = NativeStackScreenProps<RootStackParamList, 'EditTransaction'>;

export const EditTransactionScreen = ({route}: EditTransactionScreenProps) => {
    const {transactionId} = route.params;
    const insets = useSafeAreaInsets();
    const canvasPadding = Dimensions.get('window').height * 0.02;

    return (
        <View style = {[styles.container, {paddingTop: insets.top + canvasPadding}]}>
            <BackButton />
            <Text>Edit Transaction</Text>
            <Text>{transactionId}</Text>
        </View>
    );
};
