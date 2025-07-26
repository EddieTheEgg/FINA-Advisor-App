import { View, Text, ScrollView } from 'react-native';
import { RootNavigationProps, RootStackParamList } from '../../../../navigation/types/RootNavigatorTypes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import { styles } from './EditTransactionScreen.styles';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { useGetTransaction } from '../../hooks/useGetTransaction';
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';
import { EditTransactionTypeCard } from '../../components/EditTransactionComponents/EditTransactionTypeCard/EditTransactionTypeCard';
import { useEditTransactionStore } from '../../store/useEditTransactionStore';
import { useEffect } from 'react';
import { EditAccountSelector } from '../../components/EditTransactionComponents/EditAccountSelector/EditAccountSelector';
import { RouteProp } from '@react-navigation/native';

type EditTransactionScreenNavigationProps = {
    navigation: RootNavigationProps;
    route: RouteProp<RootStackParamList, 'EditTransaction'>;
}

export const EditTransactionScreen = ({route, navigation}: EditTransactionScreenNavigationProps) => {
    const {transactionId} = route.params;
    const insets = useSafeAreaInsets();
    const canvasPadding = Dimensions.get('window').height * 0.02;

    const {data: transactionDetails, isPending, error} = useGetTransaction(transactionId);
    const { transactionTypeDraft, initializeDraftFromTransaction } = useEditTransactionStore();

    // Initialize the draft when transaction data is loaded
    useEffect(() => {
        if (transactionDetails) {
            initializeDraftFromTransaction(transactionDetails);
        }
    }, [transactionDetails, initializeDraftFromTransaction]);

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
        contentContainerStyle = {{paddingBottom: insets.bottom + canvasPadding}}
        style = {[styles.container, {paddingTop: insets.top + canvasPadding}]}
        >
            <View style = {styles.header}>
                <BackButton />
                <Text style = {styles.headerTitle}>Edit Transaction</Text>
                <Text>    </Text>
            </View>
            <EditTransactionTypeCard />
            {(transactionTypeDraft === 'EXPENSE' || transactionTypeDraft === 'INCOME') && (
                <View style = {styles.expenseIncomeContainer}>
                    <EditAccountSelector navigation = {navigation} />
                </View>
            )}
        </ScrollView>
    );
};
