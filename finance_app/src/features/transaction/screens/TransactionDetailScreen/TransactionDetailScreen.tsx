import { RootNavigationProps, RootStackParamList } from '../../../../navigation/types/RootNavigatorTypes';
import { View, Text, Dimensions, ScrollView, Modal, Image } from 'react-native';
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
import { spacing } from '../../../../styles/spacing';
import { RouteProp } from '@react-navigation/native';
import { TransferFlowCard } from '../../components/TransferFlowCard/TransferFlowCard';
import { TransferDetailsCard } from '../../components/TransferDetailsCard/TransferDetailsCard';
import { useEffect, useState } from 'react';
import { useDeleteTransaction } from '../../hooks/useDeleteTransaction';
import { UpdatingTransaction } from '../../components/UpdatingTransaction/UpdatingTransaction';



type TransactionDetailScreenProps = {
    navigation: RootNavigationProps;
    route: RouteProp<RootStackParamList, 'TransactionDetail'>;
}

export const TransactionDetailScreen = ({route, navigation}: TransactionDetailScreenProps) => {
    const {transactionId} = route.params;
    const [isDeletionModalVisible, setIsDeletionModalVisible] = useState(false);
    const insets = useSafeAreaInsets();
    const canvasPadding = Dimensions.get('window').height * 0.02;

    const [shouldDisableQuery, setShouldDisableQuery] = useState(false);
    const {data : transactionDetails, error: getTransactionError} = useGetTransaction(transactionId, !shouldDisableQuery);
    const {mutate: deleteTransaction, isPending: isDeleting, isSuccess: isDeleteSuccess, error: deleteError} = useDeleteTransaction({transactionId, transactionDetails});

    useEffect(() => {
        if (isDeleting) {
            setShouldDisableQuery(true);
        }
        if (isDeleteSuccess) {
            // Navigate back immediately after successful deletion
            navigation.goBack();
        }
    }, [isDeleting, isDeleteSuccess, navigation]);


    // Show loading if we don't have transaction details yet
    if (!transactionDetails) {
        return <LoadingScreen />;
    }

    const handleNavToEditTransaction = () => {
        if (transactionDetails.transactionType === 'TRANSFER') {
            navigation.navigate('EditTransfer', {
                transactionId: transactionId,
            });
        } else {
            navigation.navigate('EditTransaction', {
                transactionId: transactionId,
            });
        }
    };

    const handleDeleteTransaction = () => {
        setIsDeletionModalVisible(false);
        deleteTransaction();
    };




    if (isDeleting) {
        return <UpdatingTransaction loadingText="Deleting transaction" />;
    }

    if (deleteError || getTransactionError) {
        return <ErrorScreen
            errorText="Error deleting transaction"
            errorSubText="Please try again later"
            errorMessage={deleteError?.message || getTransactionError?.message || 'An unknown error occurred'}
        />;
    }

    const isSpecialTransaction = transactionDetails.specialTransaction;



    if (transactionDetails.transactionType === 'TRANSFER') {
        return (
            <View style={styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: insets.bottom + 100, // Add extra padding for the button
                        paddingTop: insets.top + canvasPadding,
                    }}>
                    <View style={styles.header}>
                        <BackButton />
                        <Text style={styles.headerTitle}>Transfer Details</Text>
                        <AnimatedPressable
                            onPress={() => {setIsDeletionModalVisible(true);}}
                        >
                            <FontAwesome6 name="trash" size={24} color={colors.red} />
                        </AnimatedPressable>
                    </View>
                    <MainCardSummary transactionDetails={transactionDetails} />
                    <TransferFlowCard transactionDetails={transactionDetails} />
                    <TransferDetailsCard transactionDetails={transactionDetails} />
                    <TransactionNotesCard transactionNotes={transactionDetails.notes ?? ''} />
                    <TransactionMetaInfo transactionDetails={transactionDetails} title="ℹ️ Transfer Info" />
                </ScrollView>
                <View style={[styles.editTransactionButtonContainer, { paddingBottom: insets.bottom + spacing.md }]}>
                    <AnimatedPressable
                        onPress={handleNavToEditTransaction}
                        style={styles.editTransactionButton}
                    >
                        <Text style={styles.editTransactionButtonText}>Edit Transfer</Text>
                    </AnimatedPressable>
                </View>
                <Modal
                    visible={isDeletionModalVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => {setIsDeletionModalVisible(false);}}
                >
                <View style={styles.deletionModalContainer}>
                    <View style={styles.deletionModalContent}>
                        <Image source={require('../../../../assets/images/delete_transaction.png')} style={styles.deletionModalImage} />
                        <Text style={styles.deletionModalTitle}>Delete Transfer?</Text>
                        <Text style={styles.deletionModalText}>This transfer will be permanently deleted and cannot be recovered.</Text>
                        <View style={styles.deletionModalButtons}>
                            <AnimatedPressable
                                onPress={handleDeleteTransaction}
                                style={styles.deletionModalButton}
                            >
                                <Text style={styles.deletionModalButtonText}>Delete</Text>
                            </AnimatedPressable>
                            <AnimatedPressable
                                onPress={() => {setIsDeletionModalVisible(false);}}
                                style={styles.cancelModalButton}>
                                <Text style={styles.cancelModalButtonText}>Cancel</Text>
                            </AnimatedPressable>

                        </View>
                    </View>
                </View>
                </Modal>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: insets.bottom + 100,
                    paddingTop: insets.top + canvasPadding,
                }}>
                <View style={styles.header}>
                    <BackButton />
                    <Text style={styles.headerTitle}>Transaction Details</Text>
                    {!isSpecialTransaction && (
                    <AnimatedPressable
                        onPress={() => {setIsDeletionModalVisible(true);}}
                    >
                        <FontAwesome6 name="trash" size={24} color={colors.red} />
                    </AnimatedPressable>
                    )}
                    {isSpecialTransaction && (
                        <FontAwesome6 name="empty" size={24} color={colors.background} />
                    )}
                </View>
                {isSpecialTransaction && (
                    <Text style = {styles.specialTransactionText}>⚠️ This transaction is account-specific and won’t appear elsewhere. Account adjustments cannot be edited or deleted.</Text>
                )}
                <MainCardSummary transactionDetails={transactionDetails} />
                <TransactionDetailsCard transactionDetails={transactionDetails} />
                <TransactionNotesCard transactionNotes={transactionDetails.notes ?? ''} />
                {transactionDetails.isSubscription && (
                    <TransactionSubscriptionCard transactionDetails={transactionDetails} />
                )}
                <TransactionMetaInfo transactionDetails={transactionDetails} title="ℹ️ Transaction Info" />
            </ScrollView>
            {!isSpecialTransaction && (
            <View style={[styles.editTransactionButtonContainer, { paddingBottom: insets.bottom + spacing.md }]}>
                <AnimatedPressable
                    onPress={handleNavToEditTransaction}
                    style={styles.editTransactionButton}
                >
                    <Text style={styles.editTransactionButtonText}>Edit Transaction</Text>
                </AnimatedPressable>
            </View>
            )}
            <Modal
                visible={isDeletionModalVisible}
                animationType="fade"
                onRequestClose={() => {setIsDeletionModalVisible(false);}}
            >
                <View style={styles.deletionModalContainer}>
                    <View style={styles.deletionModalContent}>
                        <Image source={require('../../../../assets/images/delete_transaction.png')} style={styles.deletionModalImage} />
                        <Text style={styles.deletionModalTitle}>Delete Transaction?</Text>
                        <Text style={styles.deletionModalText}>This transaction will be permanently deleted and cannot be recovered.</Text>
                        <View style={styles.deletionModalButtons}>
                            <AnimatedPressable
                                onPress={handleDeleteTransaction}
                                style={styles.deletionModalButton}
                            >
                                <Text style={styles.deletionModalButtonText}>Delete</Text>
                            </AnimatedPressable>
                            <AnimatedPressable
                                onPress={() => {setIsDeletionModalVisible(false);}}
                                style={styles.cancelModalButton}>
                                <Text style={styles.cancelModalButtonText}>Cancel</Text>
                            </AnimatedPressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
