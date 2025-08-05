import { View, Text, ScrollView, Platform, Modal, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { RootNavigationProps, RootStackParamList } from '../../../../navigation/types/RootNavigatorTypes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import { styles } from './EditTransferScreen.styles';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { useEditTransactionStore } from '../../store/useEditTransactionStore';
import { RouteProp } from '@react-navigation/native';
import { useGetTransaction } from '../../hooks/useGetTransaction';
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { TransferBalanceImpactCard } from '../../components/EditTransferComponents/TransferBalanceImpactCard/TransferBalanceImpactCard';
import { EditTransferAccountSelector } from '../../components/EditTransferComponents/EditTransferAccountSelector/EditTransferAccountSelector';
import { colors } from '../../../../styles/colors';
import { EditTransferTitle } from '../../components/EditTransferComponents/EditTransferTitle/EditTransferTitle';
import { EditTransferNote } from '../../components/EditTransferComponents/EditTransferNote/EditTransferNote';
import { EditTransferLocation } from '../../components/EditTransferComponents/EditTransferLocation/EditTransferLocation';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';

import { useUpdateTransaction } from '../../hooks/useUpdateTransaction';
import { UpdatingTransaction } from '../../components/UpdatingTransaction/UpdatingTransaction';
import { EditTransferAmount } from '../../components/EditTransferComponents/EditTransferAmount/EditTransferAmount';

type EditTransferScreenNavigationProps = {
    navigation: RootNavigationProps;
    route: RouteProp<RootStackParamList, 'EditTransfer'>;
}

export const EditTransferScreen = ({route, navigation}: EditTransferScreenNavigationProps) => {
    const { transactionId } = route.params;

    // Screen Canvas
    const insets = useSafeAreaInsets();
    const canvasPadding = Dimensions.get('window').height * 0.02;

    // Hooks
    const { mutate: updateTransfer, isPending: isUpdatingTransfer, isSuccess: isUpdatedTransfer, error: updateTransferError } = useUpdateTransaction();
    const { data: transactionDetails, isPending, error } = useGetTransaction(transactionId);

    // Global and local states
    const {
        initializeDraftFromTransaction,
        validateAmount,
        validateTitle,
        validateEditTransaction,
        formatEditTransactionForBackend,
        validateTransferAccounts,
    } = useEditTransactionStore();
    const [showError, setShowError] = useState(false);
    const [transferUpdateModal, setTransferUpdateModal] = useState(false);


    useEffect(() => {
        if (transactionDetails) {
            initializeDraftFromTransaction(transactionDetails);
            validateAmount();
            validateTitle();
        }
    }, [transactionDetails, initializeDraftFromTransaction, validateAmount, validateTitle]);

    const handleSaveTransfer = () => {
        const isValid = validateEditTransaction() && validateTransferAccounts();
        if (!isValid) {
            setShowError(true);
        } else {
            setShowError(false);
            const formattedTransaction = formatEditTransactionForBackend();
            updateTransfer(formattedTransaction);
        }
    };

    const handleContinueConfirmation = () => {
        setTransferUpdateModal(false);
        navigation.goBack();
    };

    useEffect(() => {
        if (isUpdatedTransfer) {
            setShowError(false);
            setTransferUpdateModal(true);
        }
    }, [isUpdatedTransfer]);

    if (isUpdatingTransfer) {
        return <UpdatingTransaction loadingText = "Updating Transfer" />;
    }


    if (isPending || !transactionDetails) {
        return <LoadingScreen />;
    }

    if (error || updateTransferError) {
        return <ErrorScreen
            errorText = "Error fetching transfer details"
            errorSubText = "Please try again later"
            errorMessage = {error?.message || updateTransferError?.message || 'An unknown error occurred'}
        />;
    }


    return (
        <View style = {styles.container}>
            <ScrollView
            showsVerticalScrollIndicator = {false}
            contentContainerStyle={{
                paddingBottom: Platform.OS === 'ios' ? insets.bottom + canvasPadding * 7 : insets.bottom + canvasPadding * 10,
                paddingTop: insets.top + canvasPadding,
            }}
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
                    <EditTransferTitle />
                    <EditTransferNote />
                    <EditTransferLocation />
                    <EditTransferAmount />
                </View>
            </ScrollView>
            <View style = {styles.saveTransferButtonContainer}>
                {showError && (
                        <Text style={styles.errorText}>Some fields above are invalid</Text>
                )}
                <AnimatedPressable
                    onPress={handleSaveTransfer}
                    style={styles.saveTransferButton}
                >
                    <Text style={styles.saveTransferButtonText}>Update Transfer</Text>
                </AnimatedPressable>
            </View>
            <Modal
                visible={transferUpdateModal}
                animationType="fade"
                onRequestClose={() => {setTransferUpdateModal(false);}}
            >
                <View style={styles.deletionModalContainer}>
                    <View style={styles.deletionModalContent}>
                        <Image source={require('../../../../assets/images/confirmation.png')} style={styles.deletionModalImage} />
                        <Text style={styles.deletionModalTitle}>Transfer Updated!</Text>
                        <Text style={styles.deletionModalText}>This transfer has been updated successfully</Text>
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
