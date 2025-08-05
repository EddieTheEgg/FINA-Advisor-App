import { View, Text, ScrollView, Modal, Image } from 'react-native';
import { useEffect, useState } from 'react';
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
import { spacing } from '../../../../styles/spacing';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { useUpdateTransaction } from '../../hooks/useUpdateTransaction';
import { UpdatingTransaction } from '../../components/UpdatingTransaction/UpdatingTransaction';


//This screen is used to edit transactions that are not transfers (so income and expense)
type EditTransactionScreenNavigationProps = {
    navigation: RootNavigationProps;
    route: RouteProp<RootStackParamList, 'EditTransaction'>;
}

export const EditTransactionScreen = ({route, navigation}: EditTransactionScreenNavigationProps) => {
    const { transactionId } = route.params;
    const insets = useSafeAreaInsets();
    const canvasPadding = Dimensions.get('window').height * 0.02;

    const [showError, setShowError] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const { mutate, isPending: isUpdatingTransaction, error: updateTransactionError, isSuccess: isUpdateTransactionSuccess } = useUpdateTransaction();

    const { data: transactionDetails, isPending: isFetchingTransaction, error: fetchTransactionError } = useGetTransaction(transactionId);
    const {
        initializeDraftFromTransaction,
        validateSelectedCategory,
        validateAmount,
        validateTitle,
        validateEditTransaction,
        formatEditTransactionForBackend,
        resetDraft,
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


    const handleSaveTransaction = () => {
        const isValid = validateEditTransaction();
        if (!isValid) {
            setShowError(true);
        } else {
            setShowError(false);
            const formattedTransaction = formatEditTransactionForBackend();

            console.log('Sending transaction to backend:', formattedTransaction);
            mutate(formattedTransaction);
        }
    };

    const handleContinueConfirmation = () => {
        setShowConfirmation(false);
        navigation.goBack();
    };

    useEffect(() => {
        if (isUpdateTransactionSuccess) {
            setShowError(false);
            resetDraft();
            setShowConfirmation(true);
        }
    }, [isUpdateTransactionSuccess, resetDraft]);

    if (isUpdatingTransaction) {
        return <UpdatingTransaction loadingText = "Updating Transaction" />;
    }

    if (isFetchingTransaction || !transactionDetails) {
        return <LoadingScreen />;
    }

    if (fetchTransactionError || updateTransactionError) {
        return <ErrorScreen
            errorText = "Error fetching transaction details"
            errorSubText = "Please try again later"
            errorMessage = {fetchTransactionError?.message || updateTransactionError?.message || 'An unknown error occurred'}
        />;
    }



    return (
        <View style={styles.container}>
            <ScrollView
             showsVerticalScrollIndicator={false}
             contentContainerStyle={{
                 paddingBottom: insets.bottom + 100,
                 paddingTop: insets.top + canvasPadding,
             }}>
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
            <View style={[styles.saveTransactionButtonContainer, { paddingBottom: insets.bottom + spacing.md }]}>
                {showError && (
                        <Text style={styles.errorText}>Some fields above are invalid</Text>
                )}
                <AnimatedPressable
                    onPress={handleSaveTransaction}
                    style={styles.saveTransactionButton}
                >
                    <Text style={styles.saveTransactionButtonText}>Save Transaction</Text>
                </AnimatedPressable>
            </View>
            <Modal
                visible={showConfirmation}
                animationType="fade"
                onRequestClose={() => {setShowConfirmation(false);}}
            >
                <View style={styles.deletionModalContainer}>
                    <View style={styles.deletionModalContent}>
                        <Image source={require('../../../../assets/images/confirmation.png')} style={styles.deletionModalImage} />
                        <Text style={styles.deletionModalTitle}>Update Success!</Text>
                        <Text style={styles.deletionModalText}>Your transaction has been updated successfully</Text>
                        <View style={styles.deletionModalButtons}>
                            <AnimatedPressable
                                onPress={(handleContinueConfirmation)}
                                style={styles.continueButton}
                            >
                                <Text style={styles.continueButtonText}>Continue</Text>
                            </AnimatedPressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
