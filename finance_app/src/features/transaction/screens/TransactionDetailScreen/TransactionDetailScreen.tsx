import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../navigation/types/RootNavigatorTypes';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { styles } from './TransactionDetailScreen.styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useGetTransaction } from '../../hooks/useGetTransaction';
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';
import { MainCardSummary } from '../../components/MainCardSummary/MainCardSummary';
import { TransactionDetailsCard } from '../../components/TransactionDetailsCard/TransactionDetailsCard';
import { TransactionNotesCard } from '../../components/TransactionNotesCard/TransactionNotesCard';
import { SubscriptionCard } from '../../components/SubscriptionCard/SubscriptionCard';

export type TransactionDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'TransactionDetail'>;

export const TransactionDetailScreen = ({route}: TransactionDetailScreenProps) => {
    const {transactionId} = route.params;

    const insets = useSafeAreaInsets();
    const canvasPadding = Dimensions.get('window').height * 0.02;

    const {data : transactionDetails, isPending, error} = useGetTransaction(transactionId);

    if (isPending || !transactionDetails) {
        return <LoadingScreen />;
    }

    if (error) {
        return <ErrorScreen
            errorText = "Error fetching transaction details"
            errorSubText = "Please try again later"
            errorMessage = {error.message}
        />;
    }

    return (
        <ScrollView
        showsVerticalScrollIndicator = {false}
        contentContainerStyle = {{paddingBottom: insets.bottom + canvasPadding * 2 }}
        style = {[styles.container, {paddingTop: insets.top + canvasPadding}]}>
            <View style = {styles.header}>
                <BackButton />
                <Text style = {styles.headerTitle}>Transaction Details</Text>
                <FontAwesome6 name="ellipsis" size={24} color="black" />
            </View>
            <MainCardSummary transactionDetails = {transactionDetails} />
            <TransactionDetailsCard transactionDetails = {transactionDetails} />
            <TransactionNotesCard transactionNotes = {transactionDetails.notes ?? ''} />
            {transactionDetails.isSubscription && (
                <SubscriptionCard transactionDetails = {transactionDetails} />
            )}
        </ScrollView>
    );
};
