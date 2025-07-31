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
import { useState } from 'react';



type TransactionDetailScreenProps = {
    navigation: RootNavigationProps;
    route: RouteProp<RootStackParamList, 'TransactionDetail'>;
}

export const TransactionDetailScreen = ({route, navigation}: TransactionDetailScreenProps) => {
    const {transactionId} = route.params;
    const [isDeletionModalVisible, setIsDeletionModalVisible] = useState(false);
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
                            onPress={() => {setIsDeletionModalVisible(true)}}
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
                    onRequestClose={() => {setIsDeletionModalVisible(false)}}
                >
                    <View style={styles.deletionModalContainer}>
                        <View style={styles.deletionModalContent}>
                            <Text style={styles.deletionModalTitle}>Delete Transaction</Text>
                            <Text style={styles.deletionModalText}>Are you sure you want to delete this transaction?</Text>
                            <View style={styles.deletionModalButtons}>
                                <AnimatedPressable
                                    onPress={() => {setIsDeletionModalVisible(false)}}
                                    style={styles.deletionModalButton}>
                                    <Text style={styles.deletionModalButtonText}>Cancel</Text>
                                </AnimatedPressable>
                                <AnimatedPressable
                                    onPress={() => {}}
                                    style={styles.deletionModalButton}
                                >
                                    <Text style={styles.deletionModalButtonText}>Delete</Text>
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
                    <AnimatedPressable
                        onPress={() => {setIsDeletionModalVisible(true)}}
                    >
                        <FontAwesome6 name="trash" size={24} color={colors.red} />
                    </AnimatedPressable>
                </View>
                <MainCardSummary transactionDetails={transactionDetails} />
                <TransactionDetailsCard transactionDetails={transactionDetails} />
                <TransactionNotesCard transactionNotes={transactionDetails.notes ?? ''} />
                {transactionDetails.isSubscription && (
                    <TransactionSubscriptionCard transactionDetails={transactionDetails} />
                )}
                <TransactionMetaInfo transactionDetails={transactionDetails} title="ℹ️ Transaction Info" />
            </ScrollView>
            <View style={[styles.editTransactionButtonContainer, { paddingBottom: insets.bottom + spacing.md }]}>
                <AnimatedPressable
                    onPress={handleNavToEditTransaction}
                    style={styles.editTransactionButton}
                >
                    <Text style={styles.editTransactionButtonText}>Edit Transaction</Text>
                </AnimatedPressable>
            </View>
            <Modal
                visible={isDeletionModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => {setIsDeletionModalVisible(false)}}
            >
                <View style={styles.deletionModalContainer}>
                    <View style={styles.deletionModalContent}>
                        <Image source={require('../../../../assets/images/delete_transaction.png')} style={styles.deletionModalImage} />
                        <Text style={styles.deletionModalTitle}>Delete Transaction?</Text>
                        <Text style={styles.deletionModalText}>This transaction will be permanently deleted and cannot be recovered.</Text>
                        <View style={styles.deletionModalButtons}>
                            <AnimatedPressable
                                onPress={() => {}}
                                style={styles.deletionModalButton}
                            >
                                <Text style={styles.deletionModalButtonText}>Delete</Text>
                            </AnimatedPressable>
                            <AnimatedPressable
                                onPress={() => {setIsDeletionModalVisible(false)}}
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
