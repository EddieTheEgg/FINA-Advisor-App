import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Dimensions, Modal, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AccountNavigatorProps } from '../../../../navigation/types/AccountNavigatorTypes';
import { styles } from './TransferScreen.styles';
import GoBackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { TransferAccountCard } from '../../components/TransferAccountCard/TransferAccountCard';
import { useEffect } from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { colors } from '../../../../styles/colors';
import { TransferAmountCard } from '../../components/TransferAmountCard/TransferAmountCard';
import { TransferTitleInput } from '../../components/TransferTitleInput/TransferTitleInput';
import { TransferNoteCard } from '../../components/TransferNoteCard/TransferNoteCard';
import { TransferLocationCard } from '../../components/TransferLocationCard/TransferLocationCard';
import { useTransferStore } from '../../store/useTransferStore';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';

type TransferScreenProps = {
    navigation: AccountNavigatorProps;
}

export const TransferScreen = ({ navigation }: TransferScreenProps) => {
    const {
        fromAccount,
        toAccount,
        amount,
        title,
        note,
        location,
        amountError,
        setAmount,
        setTitle,
        setNote,
        setLocation,
        validateTransfer,
        openTransferSuccessModal,
        setOpenTransferSuccessModal,
    } = useTransferStore();

    const insets = useSafeAreaInsets();
    const { height } = Dimensions.get('window');
    const responsivePadding = height * 0.1;
    const responsivePaddingTop = insets.top + (height * 0.02);

    const handleNavigateFromAccountSelection = () => {
        navigation.navigate('TransferAccountSelection', {
            selectionType: 'from',
        });
    };

    const handleNavigateToAccountSelection = () => {
        navigation.navigate('TransferAccountSelection', {
            selectionType: 'to',
        });
    };

    const handleAmountChange = (amountStr: string) => {
        // Handle empty input
        if (amountStr === '' || amountStr === '.') {
            setAmount(0.00);
            return;
        }

        // Validate numeric input and prevent NaN
        const amountNumber = parseFloat(amountStr);
        if (isNaN(amountNumber) || amountNumber < 0) {
            return;
        }

        setAmount(amountNumber);
    };

    const handleNavToAccountListScreen = () => {
        navigation.navigate('AccountsList');
        setOpenTransferSuccessModal(false);
    };

    // Validate amount whenever relevant state changes
    useEffect(() => {
        validateTransfer();
    }, [amount, title, fromAccount, toAccount, validateTransfer]);

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingView}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: insets.bottom + responsivePadding,
                        paddingTop: responsivePaddingTop,
                    }}
                >
                    <View style={styles.headerSection}>
                        <GoBackButton />
                        <Text style={styles.headerTitle}>Transfer Money</Text>
                    </View>
                    <View style={styles.accountToFromContainer}>
                        <Text style={styles.accountToFromTitle}>Source Account</Text>
                        <AnimatedPressable
                            onPress={handleNavigateFromAccountSelection}
                            delay={200}
                        >
                            {fromAccount ? (
                                <TransferAccountCard
                                    emptyCard={false}
                                    accountColor={fromAccount.color}
                                    accountIcon={fromAccount.icon}
                                    accountBalance={fromAccount.balance}
                                    accountName={fromAccount.name}
                                />
                            ) : (
                                <TransferAccountCard emptyCard={true} />
                            )}
                        </AnimatedPressable>
                    </View>
                    <View style={styles.downArrowContainer}>
                        <FontAwesome6 name="arrow-down" size={24} color={colors.darkerBackground} />
                    </View>
                    <View style={styles.accountToFromContainer}>
                        <Text style={styles.accountToFromTitle}>Recipient Account</Text>
                        <AnimatedPressable
                            onPress={handleNavigateToAccountSelection}
                            delay={200}
                        >
                            {toAccount ? (
                                <TransferAccountCard
                                    emptyCard={false}
                                    accountColor={toAccount.color}
                                    accountIcon={toAccount.icon}
                                    accountBalance={toAccount.balance}
                                    accountName={toAccount.name}
                                />
                            ) : (
                                <TransferAccountCard emptyCard={true} />
                            )}
                        </AnimatedPressable>
                    </View>
                    <View style={styles.transferTitleContainer}>
                        <TransferTitleInput
                            title={title}
                            onTitleChange={setTitle}
                        />
                    </View>
                    <View style={styles.optionalDetailsContainer}>
                        <TransferNoteCard
                            note={note}
                            onNoteChange={setNote}
                            maxLength={150}
                        />
                    </View>
                    <View style={styles.optionalDetailsContainer}>
                        <TransferLocationCard
                            location={location}
                            onLocationChange={setLocation}
                            maxLength={50}
                        />
                    </View>
                    <View style={styles.transferAmountCardContainer}>
                        <TransferAmountCard
                            amount={amount}
                            onAmountChange={handleAmountChange}
                            error={amountError}
                        />
                    </View>
                </ScrollView>
                <Modal
                    visible={openTransferSuccessModal}
                    animationType="fade"
                    onRequestClose={() => {setOpenTransferSuccessModal(false);}}
                >
                    <View style={styles.deletionModalContainer}>
                        <View style={styles.deletionModalContent}>
                            <Image source={require('../../../../assets/images/confirmation.png')} style={styles.deletionModalImage} />
                            <Text style={styles.deletionModalTitle}>Transfer Complete!</Text>
                            <Text style={styles.deletionModalText}>The transfers have been processed successfully</Text>
                            <AnimatedPressable
                                onPress={handleNavToAccountListScreen}
                                style={styles.continueButton}>
                                <Text style={styles.continueButtonText}>Continue</Text>
                            </AnimatedPressable>
                        </View>
                    </View>
                </Modal>
            </KeyboardAvoidingView>
        </View>
    );
};
