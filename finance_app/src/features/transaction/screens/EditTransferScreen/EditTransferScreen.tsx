import { View, Text, ScrollView } from 'react-native';
import { useEffect } from 'react';
import { RootNavigationProps, RootStackParamList } from '../../../../navigation/types/RootNavigatorTypes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import { styles } from './EditTransferScreen.styles';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { useEditTransactionStore } from '../../store/useEditTransactionStore';
import { RouteProp } from '@react-navigation/native';
import { EditAmountCard } from '../../components/EditTransactionComponents/EditAmountCard/EditAmountCard';
import { useGetTransaction } from '../../hooks/useGetTransaction';
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';
import { EditTransactionDateCard } from '../../components/EditTransactionComponents/EditTransactionDateCard/EditTransactionDateCard';
import { EditTransactionTitle } from '../../components/EditTransactionComponents/EditTransactionTitle/EditTransactionTitle';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { TransferBalanceImpactCard } from '../../components/EditTransferComponents/TransferBalanceImpactCard/TransferBalanceImpactCard';
import { EditTransferAccountSelector } from '../../components/EditTransferComponents/EditTransferAccountSelector/EditTransferAccountSelector';
import { colors } from '../../../../styles/colors';

type EditTransferScreenNavigationProps = {
    navigation: RootNavigationProps;
    route: RouteProp<RootStackParamList, 'EditTransfer'>;
}

export const EditTransferScreen = ({route, navigation}: EditTransferScreenNavigationProps) => {
    const { transactionId } = route.params;
    const insets = useSafeAreaInsets();
    const canvasPadding = Dimensions.get('window').height * 0.02;

    const { data: transactionDetails, isPending, error } = useGetTransaction(transactionId);
    const {
        initializeDraftFromTransaction,
        validateAmount,
        validateTitle,
    } = useEditTransactionStore();


    useEffect(() => {
        if (transactionDetails) {
            initializeDraftFromTransaction(transactionDetails);
            validateAmount();
            validateTitle();
        }
    }, [transactionDetails, initializeDraftFromTransaction, validateAmount, validateTitle]);


    if (isPending || !transactionDetails) {
        return <LoadingScreen />;
    }

    if (error) {
        return <ErrorScreen
            errorText = "Error fetching transfer details"
            errorSubText = "Please try again later"
            errorMessage = {error.message}
        />;
    }


    return (
        <ScrollView
        showsVerticalScrollIndicator = {false}
        contentContainerStyle = {{paddingBottom: insets.bottom + canvasPadding}}
        style = {[styles.container, {paddingTop: insets.top + canvasPadding}]}
        >
            <View style = {styles.header}>
                <BackButton />
                <Text style = {styles.headerTitle}>Edit Transfer</Text>
                { /** TODO: This button will delete current transfer and move user to create transaction screen */}
                <FontAwesome6 name = "circle-question" size = {24} color = "black" />
            </View>
            <View style = {styles.expenseIncomeContainer}>
                <TransferBalanceImpactCard />
                <EditTransferAccountSelector navigation = {navigation} accountType = "source" />
                <View style = {styles.downArrowContainer}>
                        <FontAwesome6 name="arrow-down" size = {24} color = {colors.darkerBackground} />
                    </View>
                <EditTransferAccountSelector navigation = {navigation} accountType = "to" />
            </View>
        </ScrollView>
    );
};
