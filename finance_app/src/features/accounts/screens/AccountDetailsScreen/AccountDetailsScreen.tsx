import { View, Text, FlatList, ScrollView, Dimensions, Modal, Image} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAccountDetails } from '../../hooks/useAccountDetails';
import { useAccountTransactionHistory } from '../../hooks/useAccountTransactionHistory';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { AccountTransactionResponse } from '../../types';
import { styles } from './AccountDetailsScreen.styles';
import { LoadingDots } from '../../../../components/LoadingDots/LoadingDots';
import { AccountTransactionCard } from '../../components/AccountTransactionCard/AccountTransactionCard';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';
import { AccountDetailsCard } from '../../components/AccountDetailsCard/AccountDetailsCard';
import { NoTransactions } from '../../components/NoTransactions/NoTransactions';
import { TransferButton } from '../../components/TransferButton/TransferButton';
import { AddTransactionButton } from '../../components/AddTransactionButton/AddTransactionButton';
import { RouteProp } from '@react-navigation/native';
import { AccountNavigatorParamList, AccountNavigatorProps } from '../../../../navigation/types/AccountNavigatorTypes';
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';
import { fontSize } from '../../../../styles/fontSizes';
import { colors } from '../../../../styles/colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { useEffect, useState } from 'react';
import { useDeleteAccount } from '../../hooks/useDeleteAccount';
import { useGroupAccounts } from '../../hooks/useGroupAccounts';
import { useEditAccountStore } from '../../store/useEditAccountStore';

const SeparatorComponent = () => <View style={styles.separator} />;
const { height } = Dimensions.get('window');
const responsivePadding = height * 0.2;

type AccountDetailsScreenProps = {
    route: RouteProp<AccountNavigatorParamList, 'AccountDetails'>;
    navigation: AccountNavigatorProps;
}

export const AccountDetailsScreen = ({ route, navigation }: AccountDetailsScreenProps) => {
    const { accountId } = route.params;
    const insets = useSafeAreaInsets();

    // Use this store to initialize the edit account screen
    const { initializeEditAccount } = useEditAccountStore();
    // Query for account details
    const {data : accountDetails,
        isPending : isAccountDetailsPending,
        error : accountDetailsError} = useAccountDetails(accountId);

    // Query for account transactions
    const {data : accountTransactions,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPending : isAccountTransactionsPending,
        error : accountTransactionsError,
        } = useAccountTransactionHistory(accountId);

    // Query for delete account
    const {mutate : deleteAccount, isPending: isDeletingAccount, error: deleteAccountError, isSuccess: deleteAccountSuccess} = useDeleteAccount();


    // Query to get the amount of accounts, specifically to check if any accounts are left after deleting
    const {data : groupedAccounts, isPending: isGroupAccountsPending} = useGroupAccounts();

    const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
    const [showCannotDeleteAccountModal, setShowCannotDeleteAccountModal] = useState(false);
    const [showNotEnoughAccountsModal, setShowNotEnoughAccountsModal] = useState(false);

    const handleDeleteAccount = () => {
        deleteAccount(accountId);
        setShowDeleteAccountModal(false);
    };

    //Navigate to account list if succesful delete
    useEffect(() => {
        if (deleteAccountSuccess) {
            navigation.goBack();
        }
    }, [deleteAccountSuccess, navigation]);

    if (accountDetailsError || accountTransactionsError) {
        return <ErrorScreen
        errorText = "Error fetching account details or transactions"
        errorSubText = "Please try again later"
        errorMessage = {accountDetailsError?.message || accountTransactionsError?.message || 'Unknown error'} />;
    }

    if (deleteAccountError) {
        return <ErrorScreen
        errorText = "Error deleting account"
        errorSubText = "Please try again later"
        errorMessage = {deleteAccountError.message} />;
    }

    if (isAccountDetailsPending
        || isAccountTransactionsPending
        || !accountTransactions
        || !accountDetails
        || isGroupAccountsPending
        || !groupedAccounts) {
        return <LoadingScreen />;
    }

    if (isDeletingAccount) {
        return (
            <View style={[styles.loadingContainer, {paddingTop: insets.top, paddingBottom: insets.bottom}]}>
                <View>
                    <Image source={require('../../../../assets/images/Loading_Pig.png')} style={styles.image} />
                    <LoadingDots style ={styles.text} loadingText = {'Deleting account'} />
                </View>
            </View>
        );
    }

    // Navigate to the edit account screen and initialize the store with the account details
    const handleNavToEditAccount = () => {
        initializeEditAccount(accountDetails);
        navigation.navigate('EditAccount', {accountDetails});
    };

    const transactionHistoryCount = accountTransactions.pages.flatMap(page => page.transactions).length;
    //Check if this is the last account (cannot delete if only 1 account exists)
    const isLastAccount = Object.values(groupedAccounts.accountGroupsData || {}).flat().length === 1;

    return (
        <View style={styles.screenContainer}>
            <ScrollView
            style = {[styles.accountDetailsContainer, {paddingTop: insets.top}]}
            showsVerticalScrollIndicator = {false}
            contentContainerStyle = {{paddingBottom: insets.bottom + responsivePadding * 1.5}}
            >
                <View style = {styles.accountDetailsHeader}>
                    <BackButton />
                    <Text style = {styles.accountDetailsTitle}> {accountDetails.name}</Text>
                    {isLastAccount ? (
                        <AnimatedPressable
                        onPress = {() => setShowNotEnoughAccountsModal(true)}
                        >
                            <FontAwesome6 name = "trash" size = {fontSize.xxl} color = {colors.gray[500]} />
                        </AnimatedPressable>
                    ) : (
                        transactionHistoryCount > 0 ? (
                            //If there are transactions, show the trash icon in gray cannot delete
                            <AnimatedPressable
                            onPress = {() => setShowCannotDeleteAccountModal(true)}
                            >
                                <FontAwesome6 name = "trash" size = {fontSize.xxl} color = {colors.gray[500]} />
                            </AnimatedPressable>
                        ) : (
                            <AnimatedPressable
                            onPress = {() => setShowDeleteAccountModal(true)}
                            >
                                <FontAwesome6 name = "trash" size = {fontSize.xxl} color = {colors.red} />
                            </AnimatedPressable>
                        )
                    )}
                </View>
                <View style = {styles.accountDetailsCardContainer}>
                    <AccountDetailsCard accountDetails = {accountDetails}/>
                </View>
                <View style={styles.accountQuickActionCardContainer}>
                    <TransferButton fromAccountDetails = {accountDetails} navigation = {navigation} />
                    <AddTransactionButton navigation = {navigation} />
                </View>
                <View style = {styles.transactionListContainer}>
                    <Text style = {styles.transactionListTitle}>Transaction History</Text>
                    {accountTransactions.pages.flatMap(page => page.transactions).length <= 0 ? (
                        <NoTransactions />
                ) : (
                    <FlatList
                        style = {styles.transactionHistoryContainer}
                        data = {accountTransactions.pages.flatMap(page => page.transactions)}
                        renderItem = {({item}) => <AccountTransactionCard transactionData = {item} navigation = {navigation}/>}
                        keyExtractor = {(item : AccountTransactionResponse, index: number) => `transaction-${item.transactionId}-${index}`}
                        onEndReached = {() => {
                            if (hasNextPage && !isFetchingNextPage) {
                                fetchNextPage();
                            }
                        }}
                        onEndReachedThreshold = {0.5}
                        ItemSeparatorComponent={SeparatorComponent}
                        scrollEnabled = {false}
                        ListFooterComponent = {isFetchingNextPage ? <LoadingDots /> : null}
                    />
                    )}
                </View>
                <Modal
                    visible={showDeleteAccountModal}
                    animationType="fade"
                    onRequestClose={() => {setShowDeleteAccountModal(false);}}
                    >
                    <View style={styles.deletionModalContainer}>
                        <View style={styles.deletionModalContent}>
                            <Image source={require('../../../../assets/images/delete_transaction.png')} style={styles.deletionModalImage} />
                            <Text style={styles.deletionModalTitle}>Delete Account?</Text>
                            <Text style={styles.deletionModalText}>This account will be permanently deleted and cannot be recovered.</Text>
                            <View style={styles.deletionModalButtons}>
                                <AnimatedPressable
                                    onPress={handleDeleteAccount}
                                    style={styles.deletionModalButton}
                                >
                                    <Text style={styles.deletionModalButtonText}>Delete</Text>
                                </AnimatedPressable>
                                <AnimatedPressable
                                    onPress={() => {setShowDeleteAccountModal(false);}}
                                    style={styles.cancelDeletionModalButton}>
                                    <Text style={styles.cancelDeletionModalButtonText}>Cancel</Text>
                                </AnimatedPressable>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    transparent = {true}
                    visible={showCannotDeleteAccountModal}
                    animationType="fade"
                    onRequestClose={() => setShowCannotDeleteAccountModal(false)}
                    >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Image source={require('../../../../assets/images/Important_notification.png')} style={styles.modalImage} />
                            <Text style={styles.modalTitle}>Cannot Delete Account</Text>
                            <Text style={styles.modalText}>This account has transactions associated with it. Please transfer or delete all transactions before deleting the account.</Text>
                            <View style={styles.modalButtons}>
                                <AnimatedPressable
                                    onPress={() => setShowCannotDeleteAccountModal(false)}
                                    style={styles.continueButton}
                                >
                                    <Text style={styles.continueButtonText}>Continue</Text>
                                </AnimatedPressable>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    transparent = {true}
                    visible={showNotEnoughAccountsModal}
                    animationType="fade"
                    onRequestClose={() => setShowNotEnoughAccountsModal(false)}
                    >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Image source={require('../../../../assets/images/Important_notification.png')} style={styles.modalImage} />
                            <Text style={styles.modalTitle}>Cannot Delete Account</Text>
                            <Text style={styles.modalText}>This is your last account. Please add an account before deleting this one.</Text>
                            <View style={styles.modalButtons}>
                                <AnimatedPressable
                                    onPress={() => setShowNotEnoughAccountsModal(false)}
                                    style={styles.continueButton}
                                >
                                    <Text style={styles.continueButtonText}>Continue</Text>
                                </AnimatedPressable>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
            <AnimatedPressable
                onPress = {handleNavToEditAccount}
                style = {styles.editAccountButton}
                >
                    <Text style = {styles.editAccountButtonText}>Edit Account</Text>
            </AnimatedPressable>
        </View>
    );
};
