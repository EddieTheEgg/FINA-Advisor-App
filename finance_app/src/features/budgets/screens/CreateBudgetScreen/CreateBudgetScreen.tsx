import { View, Text, ScrollView } from 'react-native';
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
    const {categoryId, budgetAmount, budgetMonth} = useCreateBudgetStore();
    const insets = useSafeAreaInsets();

    const handleCreateBudget = () => {
        createBudget({
            category_id: categoryId,
            budget_amount: budgetAmount,
            budget_month: budgetMonth.toISOString().split('T')[0], // Convert to YYYY-MM-DD format
        });
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
                contentContainerStyle = {styles.scrollViewContent}
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
        </View>
    );
};
