import { View, Text, ScrollView, Modal, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './CreateBudgetScreen.styles';
import { BudgetMonthSelector } from '../../components/BudgetMonthSelector/BudgetMonthSelector';
import { BudgetCategorySelector } from '../../components/BudgetCategorySelector/BudgetCategorySelector';
import { BudgetsNavigatorProps } from '../../../../navigation/types/BudgetsNavigatorTypes';
import { useNavigation } from '@react-navigation/native';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { BudgetAmountInput } from '../../components/BudgetAmountInput/BudgetAmountInput';
import { useCreateBudget } from '../../hooks/useCreateBudget';
import { useCreateBudgetStore } from '../../store/useCreateBudgetStore';
import React from 'react';
import { CreatingBudgetIndicator } from '../../components/CreatingBudgetIndicator/CreatingBudgetIndicator';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';
import { spacing } from '../../../../styles/spacing';

type CreateBudgetScreenProps = {
    navigation: BudgetsNavigatorProps;
}

const BudgetHomeBackButton = () => {
    const navigation = useNavigation<BudgetsNavigatorProps>();

    return (
        <AnimatedPressable
            scaleValue={0.8}
            delay={200}
            onPress={() => navigation.navigate('BudgetsHome')}>
            <FontAwesome6 name="arrow-left" size={24} color="black" solid />
        </AnimatedPressable>
    );
};

export const CreateBudgetScreen = ({navigation} : CreateBudgetScreenProps) => {
    const {mutate: createBudget, isPending, error: createBudgetError} = useCreateBudget();
    const {categoryId,
         budgetAmount,
         budgetMonth,
         createSuccessModal,
         setCreateSuccessModal,
         resetCreateBudgetStore,
         validateBudgetAmount,
         validateBudgetMonth,
         validateSelectedCategory} = useCreateBudgetStore();
    const insets = useSafeAreaInsets();

    const handleCreateBudget = () => {
        // Validate these fields, storing in variables for now so easier for debugging
        const amountValid = validateBudgetAmount();
        const monthValid = validateBudgetMonth();
        const categoryValid = validateSelectedCategory();

        if (amountValid && monthValid && categoryValid) {
            createBudget({
                category_id: categoryId,
                budget_amount: budgetAmount,
                budget_month: budgetMonth.toISOString().split('T')[0], // Convert to YYYY-MM-DD format
            });
        }
    };

    const handleContinueConfirmation = () => {
        resetCreateBudgetStore();
        setCreateSuccessModal(false);
        navigation.navigate('BudgetsHome');
    };


    if (isPending) {
        return <CreatingBudgetIndicator />;
    }

    if (createBudgetError) {
        return <ErrorScreen
            errorText = "Error creating budget"
            errorSubText = "Please try again later"
            errorMessage={createBudgetError.message}
        />;
    }



    return (
        <View style = {[styles.container, {paddingTop: insets.top}]}>
            <ScrollView
                contentContainerStyle = {[styles.scrollViewContent, {paddingBottom: insets.bottom + spacing.xxl * 5}]}
            >
                <View style = {styles.headerRowContainer}>
                    <BudgetHomeBackButton />
                    <Text style = {styles.headerTitle}>Create Category Budget</Text>
                </View>
                <BudgetMonthSelector />
                <BudgetCategorySelector navigation={navigation} />
                <BudgetAmountInput />
            </ScrollView>
            <AnimatedPressable
                style = {styles.createBudgetButtonContainer}
                onPress={handleCreateBudget}>
                <Text style = {styles.createBudgetButtonText}>Create</Text>
            </AnimatedPressable>
            <Modal
                visible={createSuccessModal}
                animationType="fade"
                onRequestClose={() => {setCreateSuccessModal(false);}}
            >
            <View style={styles.createSuccessModalContainer}>
                <View style={styles.createSuccessModalContent}>
                    <Image source={require('../../../../assets/images/confirmation.png')} style={styles.createSuccessModalImage} />
                    <Text style={styles.createSuccessModalTitle}>Budget Created!</Text>
                    <Text style={styles.createSuccessModalText}>Your budget has been created successfully</Text>
                    <View style={styles.createSuccessModalButtons}>
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
