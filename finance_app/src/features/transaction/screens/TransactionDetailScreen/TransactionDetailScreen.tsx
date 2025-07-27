import { RootNavigationProps, RootStackParamList } from '../../../../navigation/types/RootNavigatorTypes';
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
import { TransactionSubscriptionCard } from '../../components/TransactionSubscriptionCard/TransactionSubscriptionCard';
import { TransactionMetaInfo } from '../../components/TransactionMetaInfo/TransactionMetaInfo';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { colors } from '../../../../styles/colors';
import { RouteProp } from '@react-navigation/native';
import { TransferFlowCard } from '../../components/TransferFlowCard/TransferFlowCard';
import { TransferDetailsCard } from '../../components/TransferDetailsCard/TransferDetailsCard';



type TransactionDetailScreenProps = {
    navigation: RootNavigationProps;
    route: RouteProp<RootStackParamList, 'TransactionDetail'>;
}

export const TransactionDetailScreen = ({route, navigation}: TransactionDetailScreenProps) => {
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

    const handleNavToEditTransaction = () => {
        navigation.navigate('EditTransaction', {
            transactionId: transactionDetails.transactionId,
        });
    };


    if (transactionDetails.transactionType === 'TRANSFER') {
        return (
            <ScrollView
            showsVerticalScrollIndicator = {false}
            contentContainerStyle = {{paddingBottom: insets.bottom + canvasPadding * 2 }}
            style = {[styles.container, {paddingTop: insets.top + canvasPadding}]}>
                <View style = {styles.header}>
                    <BackButton />
                    <Text style = {styles.headerTitle}>Transfer Details</Text>
                    <AnimatedPressable
                        onPress = {() => {}}
                    >
                        <FontAwesome6 name="trash" size={24} color={colors.red} />
                    </AnimatedPressable>
                </View>
                <MainCardSummary transactionDetails = {transactionDetails} />
                <TransferFlowCard transactionDetails = {transactionDetails} />
                <TransferDetailsCard transactionDetails = {transactionDetails} />
                <TransactionNotesCard transactionNotes = {transactionDetails.notes ?? ''} />
                <TransactionMetaInfo transactionDetails = {transactionDetails} title = "ℹ️ Transfer Info" />
                <AnimatedPressable
                    onPress = {handleNavToEditTransaction}
                    style = {styles.editTransactionButton}
                >
                    <Text style = {styles.editTransactionButtonText}>Edit Transaction</Text>
                </AnimatedPressable>
            </ScrollView>
        );
    }

    return (
        <ScrollView
        showsVerticalScrollIndicator = {false}
        contentContainerStyle = {{paddingBottom: insets.bottom + canvasPadding * 2 }}
        style = {[styles.container, {paddingTop: insets.top + canvasPadding}]}>
            <View style = {styles.header}>
                <BackButton />
                <Text style = {styles.headerTitle}>Transaction Details</Text>
                <AnimatedPressable
                    onPress = {() => {}}
                >
                    <FontAwesome6 name="trash" size={24} color={colors.red} />
                </AnimatedPressable>
            </View>
            <MainCardSummary transactionDetails = {transactionDetails} />
            <TransactionDetailsCard transactionDetails = {transactionDetails} />
            <TransactionNotesCard transactionNotes = {transactionDetails.notes ?? ''} />
            {transactionDetails.isSubscription && (
                <TransactionSubscriptionCard transactionDetails = {transactionDetails} />
            )}
            <TransactionMetaInfo transactionDetails = {transactionDetails} title = "ℹ️ Transaction Info" />
            <AnimatedPressable
                onPress = {handleNavToEditTransaction}
                style = {styles.editTransactionButton}
            >
                <Text style = {styles.editTransactionButtonText}>Edit Transaction</Text>
            </AnimatedPressable>
        </ScrollView>
    );
};
