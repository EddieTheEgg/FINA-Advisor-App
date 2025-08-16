import { View, Text, ScrollView, Modal, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { BudgetsNavigatorParamList } from '../../../../navigation/types/BudgetsNavigatorTypes';
import { BudgetsNavigatorProps } from '../../../../navigation/types/BudgetsNavigatorTypes';
import { useEditBudgetStore } from '../../store/useEditBudgetStore';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';
import { useEffect, useState } from 'react';
import { useGetBudgetDetails } from '../../hooks/useGetBudgetDetails';
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';
import { styles } from './BudgetEditScreen.styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { truncateText } from '../../../../utils/textFormat';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { colors } from '../../../../styles/colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { CurrentBudgetInfo } from '../../components/EditBudgetComponents/CurrentBudgetInfo/CurrentBudgetInfo';
import { BudgetCategoryDetails } from '../../components/EditBudgetComponents/BudgetCategoryDetails/BudgetCategoryDetails';
import { UpdateBudgetAmount } from '../../components/EditBudgetComponents/UpdateBudgetAmount/UpdateBudgetAmount';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { useUpdateBudget } from '../../hooks/useUpdateBudget';
import { UpdatingBudgetIndicator } from '../../components/EditBudgetComponents/UpdatingBudgetIndicator/UpdatingBudgetIndicator';

type BudgetEditScreenProps = {
    route: RouteProp<BudgetsNavigatorParamList, 'EditBudget'>;
    navigation: BudgetsNavigatorProps;
}

export const BudgetEditScreen = ({route, navigation}: BudgetEditScreenProps) => {
    const insets = useSafeAreaInsets();

    const {budgetId} = route.params;
    const {
        initializeDraftFromBudget,
        validateBudgetAmount,
        budgetAmountDraft,
        checkNewBudgetStatus,
    } = useEditBudgetStore();

    //Modal to double check if the user wants to update the budget amount even if the new amount is now overbudget
    const [isOverBudgetModal, setIsOverBudgetModal] = useState(false);
    const [isUpdateSuccessModal, setIsSuccessUpdateModal] = useState(false);

    const {data, isPending, error} = useGetBudgetDetails(budgetId);
    const {
        mutate: updateBudget,
        isPending: isUpdatingBudget,
        error: updateBudgetError,
        isSuccess: isUpdateBudgetSuccess,
    } = useUpdateBudget({budgetId, budgetAmount: budgetAmountDraft, monthDate: data?.coreBudgetData.budgetPeriod || new Date()}); //Note new Date() should never run since we await for data before ever running this hook


    useEffect(() => {
        if (data) {
            initializeDraftFromBudget(data);
        }
    }, [data, initializeDraftFromBudget]);

    useEffect(() => {
        if (isUpdateBudgetSuccess) {
            setIsSuccessUpdateModal(true);
        }
    }, [isUpdateBudgetSuccess, navigation]);


    if (isPending || !data) {
        return <LoadingScreen />;
    }
    if (error) {
        return <ErrorScreen
            errorText = "Error fetching budget details"
            errorSubText = "There is no budget data to display!"
            errorMessage = {error.message || 'Some unknown error occured, no message provided'}
        />;
    }

    if (isUpdatingBudget) {
        return <UpdatingBudgetIndicator />;
    }
    if (updateBudgetError) {
        return <ErrorScreen
            errorText = "Error updating the budget"
            errorSubText = "Something went wrong when trying to update this budget"
            errorMessage = {updateBudgetError.message || 'Some unknown error occured, no message provided'}
        />;
    }

    const handleSaveBudget = () => {
        //Must validate first before updating
        if (!validateBudgetAmount()) {
            return;
        }
        if (!checkNewBudgetStatus()) {
            setIsOverBudgetModal(true);
            return;
        }
        updateBudget();
    };

    //When the user confirms to continue updating budget despite knowing it'll be overbudget with the new amount
    const handleSaveBudgetConfirmation = () => {
        setIsOverBudgetModal(false);
        updateBudget();
    };

    //After successful update, user can confirm the budget update and navigate back
    const navBackToDetails = () => {
        setIsSuccessUpdateModal(false);
        navigation.goBack();
    };

    const percentageOverBudget = (data.coreBudgetData.spentAmount / budgetAmountDraft) * 100;


    return (
        <View style = {styles.backgroundContainer}>
            <ScrollView
                style = {{paddingTop: insets.top}}
                contentContainerStyle = {{paddingBottom: insets.bottom + 200}} // Add extra bottom padding for the save button
            >
                <View style = {styles.headerContainer}>
                    <BackButton />
                    <Text style = {styles.headerText}>Edit {truncateText(data.coreBudgetData.budgetTitle, 15)} Budget</Text>
                    <FontAwesome6 name = "empty-space" size = {24} color = {colors.background} />
                </View>
                <CurrentBudgetInfo  data = {data.coreBudgetData}/>
                <BudgetCategoryDetails data = {data.coreBudgetData} />
                <UpdateBudgetAmount data = {data.coreBudgetData} />
                <AnimatedPressable
                    style = {styles.saveBudgetButton}
                    onPress = {handleSaveBudget}
                >
                    <Text style = {styles.saveBudgetButtonText}>Save Budget</Text>
                </AnimatedPressable>
            </ScrollView>
            <Modal
                visible={isOverBudgetModal}
                animationType="fade"
                onRequestClose={() => {setIsOverBudgetModal(false);}}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Image source={require('../../../../assets/images/Important_notification.png')} style={styles.modalImage} />
                        <Text style={styles.modalTitle}>Budget Will Be Exceeded</Text>
                        <Text style={styles.modalText}>Updating your budget to <Text style={styles.modalTextBold}>${budgetAmountDraft}</Text> will make you <Text style={styles.modalTextBold}>{percentageOverBudget.toFixed(2)}% over budget </Text> {'('}<Text style={styles.modalTextBold}>${data.coreBudgetData.spentAmount}</Text> spent of <Text style={styles.modalTextBold}>${budgetAmountDraft}</Text>{')'}</Text>
                        <Text style={styles.modalTextBold}>Are you sure you want to continue?</Text>
                        <View style={styles.modalButtons}>
                            <AnimatedPressable
                                onPress={handleSaveBudgetConfirmation}
                                style={styles.modalButton}
                            >
                                <Text style={styles.modalButtonText}>Update</Text>
                            </AnimatedPressable>
                            <AnimatedPressable
                                onPress={() => setIsOverBudgetModal(false)}
                                style={styles.cancelModalButton}>
                                <Text style={styles.cancelModalButtonText}>Cancel</Text>
                            </AnimatedPressable>
                        </View>
                    </View>
                </View>
            </Modal>
              <Modal
                visible={isUpdateSuccessModal}
                animationType="fade"
                onRequestClose={() => setIsSuccessUpdateModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Image source={require('../../../../assets/images/confirmation.png')} style={styles.modalImage} />
                        <Text style={styles.modalTitle}>Update Success!</Text>
                        <Text style={styles.modalText}>Your budget has been updated successfully</Text>
                        <View style={styles.modalButtons}>
                            <AnimatedPressable
                                onPress={navBackToDetails}
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
