import { View, Text, ScrollView, Pressable } from 'react-native';
import { useEffect } from 'react';
import { RootNavigationProps, RootStackParamList } from '../../../../navigation/types/RootNavigatorTypes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import { styles } from './EditTransactionScreen.styles';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { EditTransactionTypeCard } from '../../components/EditTransactionComponents/EditTransactionTypeCard/EditTransactionTypeCard';
import { useEditTransactionStore } from '../../store/useEditTransactionStore';
import { EditAccountSelector } from '../../components/EditTransactionComponents/EditAccountSelector/EditAccountSelector';
import { RouteProp } from '@react-navigation/native';
import { EditAmountCard } from '../../components/EditTransactionComponents/EditAmountCard/EditAmountCard';
import { EditCategorySelector } from '../../components/EditTransactionComponents/EditCategorySelector/EditCategorySelector';
import { useGetTransaction } from '../../hooks/useGetTransaction';
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';
import { EditTransactionDateCard } from '../../components/EditTransactionComponents/EditTransactionDateCard/EditTransactionDateCard';
import { EditTransactionTitle } from '../../components/EditTransactionComponents/EditTransactionTitle/EditTransactionTitle';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { EditOptionalDetailsCard } from '../../components/EditTransactionComponents/EditOptionalDetailComponents/EditOptionalDetailsCard/EditOptionalDetailsCard';
import { RecurringTransactionCard } from '../../components/RecurringTransactionCard/RecurringTransactionCard';


//This screen is used to edit transactions that are not transfers (so income and expense)
type EditTransactionScreenNavigationProps = {
    navigation: RootNavigationProps;
    route: RouteProp<RootStackParamList, 'EditTransaction'>;
}

export const EditTransactionScreen = ({route, navigation}: EditTransactionScreenNavigationProps) => {
    const { transactionId } = route.params;
    const insets = useSafeAreaInsets();
    const canvasPadding = Dimensions.get('window').height * 0.02;

    const { data: transactionDetails, isPending, error } = useGetTransaction(transactionId);
    const {
        initializeDraftFromTransaction,
        validateSelectedCategory,
        validateAmount,
        validateTitle,
    } = useEditTransactionStore();

    // Initialize draft when transaction details are available
    useEffect(() => {
        if (transactionDetails) {
            initializeDraftFromTransaction(transactionDetails);
            validateSelectedCategory();
            validateAmount();
            validateTitle();
        }
    }, [transactionId, transactionDetails, initializeDraftFromTransaction, validateSelectedCategory, validateAmount, validateTitle]);


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
                { /** TODO: This button will delete current transaction and move user to create transfer screen */}
                <FontAwesome6 name = "circle-question" size = {24} color = "black" />
            </View>
            <EditTransactionTypeCard />
                <View style = {styles.expenseIncomeContainer}>
                    <EditAccountSelector navigation = {navigation} />
                    <EditCategorySelector navigation = {navigation} />
                    <EditAmountCard />
                    <EditTransactionTitle />
                    <EditTransactionDateCard />
                    <EditOptionalDetailsCard />
                    <RecurringTransactionCard />
                </View>
        </ScrollView>
    );
};
