import { Dimensions, Image, Modal, Platform, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './CreateTransactionScreen.styles';
import { TransactionTypeCard } from '../../components/TransactionTypeCard/TransactionTypeCard';
import { useCreateTransactionStore } from '../../store/useTransactionStore';
import { AccountSelector } from '../../components/AccountSelector/AccountSelector';
import { TransactionNavigatorProps } from '../../../../navigation/types/TransactionNavigatorTypes';
import { AmountCard } from '../../components/AmountCard/AmountCard';
import { CategorySelector } from '../../components/CategorySelector/CategorySelector';
import { TitleCard } from '../../components/TitleCard/TitleCard';
import { DateCard } from '../../components/DateCard/DateCard';
import { OptionalDetailsCard } from '../../components/OptionalDetailsCard/OptionalDetailsCard';
import { RecurringTransactionCard } from '../../components/RecurringTransactionCard/RecurringTransactionCard';
import { useNavigation } from '@react-navigation/native';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { ProcessingTransaction } from '../../components/ProcessingTransaction/ProcessingTransaction';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';
import { useState } from 'react';

type CreateTransactionScreenProps = {
    navigation : TransactionNavigatorProps;
}

const DashboardBackButton = () => {
    const navigation = useNavigation();

    const navigateToDashboard = () => {
        const parent = navigation.getParent();
        if (parent) {
            parent.navigate('Dashboard');
        }
    };

    return (
        <AnimatedPressable
            scaleValue={0.8}
            delay={200}
            onPress={navigateToDashboard}>
            <FontAwesome6 name="arrow-left" size={24} color="black" solid />
        </AnimatedPressable>
    );
};

export const CreateTransactionScreen = ( { navigation }: CreateTransactionScreenProps) => {
    const insets = useSafeAreaInsets();
    const height = Dimensions.get('window').height;
    const canvasPadding = height * 0.03;
    const [showConfirmation, setShowConfirmation] = useState(false);

    const {transactionType, isTransactionProcessing, transactionProcessingError} = useCreateTransactionStore();

    if (isTransactionProcessing) {
        return <ProcessingTransaction />;
    }

    if (transactionProcessingError) {
        return <ErrorScreen errorText="Error creating transaction" errorSubText="Please try again" errorMessage={transactionProcessingError} />;
    }

    const handleContinueConfirmation = () => {
        setShowConfirmation(false);
        navigation.goBack();
    };



    return (
        <View style = {styles.container}>
            <ScrollView
            showsVerticalScrollIndicator = {false}
            contentContainerStyle = {{paddingBottom: insets.bottom + canvasPadding}}
            style = {[styles.backgroundContainer,{paddingTop: Platform.OS === 'android' ? insets.top + canvasPadding : insets.top}]}>
                <View style = {styles.header}>
                    <DashboardBackButton />
                    <Text style = {styles.title}>Create Transaction</Text>
                </View>
                <View style = {styles.transactionTypeContainer}>
                    <TransactionTypeCard />
                </View>
                {(transactionType === 'EXPENSE' || transactionType === 'INCOME') && (
                    <View style = {styles.expenseSection}>
                        <AccountSelector navigation = {navigation} />
                        <CategorySelector navigation = {navigation} />
                        <AmountCard />
                        <TitleCard />
                        <DateCard />
                        <OptionalDetailsCard />
                        <RecurringTransactionCard />
                    </View>
                )}
            </ScrollView>
            <Modal
                visible={showConfirmation}
                animationType="fade"
                onRequestClose={() => {setShowConfirmation(false);}}
            >
                <View style={styles.deletionModalContainer}>
                    <View style={styles.deletionModalContent}>
                        <Image source={require('../../../../assets/images/confirmation.png')} style={styles.deletionModalImage} />
                        <Text style={styles.deletionModalTitle}>Transaction Created!</Text>
                        <Text style={styles.deletionModalText}>Your transaction has been created successfully</Text>
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
