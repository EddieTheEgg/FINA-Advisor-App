import { Dimensions, Text, View } from 'react-native';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './CreateTransactionScreen.styles';
import { TransactionTypeCard } from '../../components/TransactionTypeCard/TransactionTypeCard';

export const CreateTransactionScreen = () => {
    const insets = useSafeAreaInsets();
    const height = Dimensions.get('window').height;
    const canvasPadding = height * 0.02;
    return (
        <View style = {[styles.backgroundContainer,{paddingTop: insets.top + canvasPadding, paddingBottom: insets.bottom}]}>
            <View style = {styles.header}>
                <BackButton />
                <Text style = {styles.title}>Create Transaction</Text>
            </View>
            <View style = {styles.transactionTypeContainer}>
                <TransactionTypeCard />
            </View>
        </View>
    );
};
