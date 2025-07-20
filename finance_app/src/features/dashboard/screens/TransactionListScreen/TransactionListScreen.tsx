import { View, Text, Dimensions } from 'react-native';
import { styles } from './TransactionListScreen.styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { TransactionListSummarizeSelector } from '../../components/TransactionListSummarizeSelector/TransactionListSummarizeSelector';

export const TransactionListScreen = () => {

    const insets = useSafeAreaInsets();
    const canvasPadding = Dimensions.get('window').height * 0.02;

    return (
        <View style={[styles.container, {paddingTop: insets.top + canvasPadding}]}>
            <View style={styles.header}>
                <BackButton />
                <Text style={styles.title}>Transactions</Text>
                <FontAwesome6 name="sliders" size={24} color="black" />
            </View>
            <View style = {styles.transactionListSelector}>
                <TransactionListSummarizeSelector />
            </View>
        </View>
    );
};

