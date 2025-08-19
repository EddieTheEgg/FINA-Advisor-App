import { View, Text, ScrollView, Modal, Image, Platform } from 'react-native';
import { useGetBudgetDetails } from '../../hooks/useGetBudgetDetails';
import { BudgetsNavigatorParamList, BudgetsNavigatorProps } from '../../../../navigation/types/BudgetsNavigatorTypes';
import { RouteProp } from '@react-navigation/native';
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './BudgetDetailsScreen.styles';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { colors } from '../../../../styles/colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { spacing } from '../../../../styles/spacing';
import { BudgetSummaryCard } from '../../components/BudgetSummaryCard/BudgetSummaryCard';
import { BudgetProgressCard } from '../../components/BudgetProgressCard/BudgetProgressCard';
import { BudgetDetailsCard } from '../../components/BudgetDetailsCard/BudgetDetailsCard';
import { BudgetInsightsCard } from '../../components/BudgetInsightsCard/BudgetInsightsCard';
import { truncateText } from '../../../../utils/textFormat';
import { BudgetRecentTransactionsCard } from '../../components/BudgetRecentTransactionsCard/BudgetRecentTransactionsCard';
import { useState, useEffect } from 'react';
import { useDeleteBudget } from '../../hooks/useDeleteBudget';
import { LoadingDots } from '../../../../components/LoadingDots/LoadingDots';

type BudgetDetailsScreenprops = {
    route: RouteProp<BudgetsNavigatorParamList, 'BudgetDetails'>;
    navigation: BudgetsNavigatorProps;
}


export const BudgetDetailsScreen = ({route, navigation}: BudgetDetailsScreenprops) => {
    const insets = useSafeAreaInsets();
    const {budgetId} = route.params;

    const {data, isPending, error} = useGetBudgetDetails(budgetId);
    const {mutate: deleteBudget, isPending: isBudgetDeletePending, error: budgetDeleteError, isSuccess: budgetDeleteSuccess} = useDeleteBudget({budgetId, monthDate: data?.coreBudgetData?.budgetPeriod || new Date()});

    // Handle successful deletion (the deleteBUdget is async, so useEffect is used to await for the deletion response to go back)
    useEffect(() => {
        if (budgetDeleteSuccess) {
            navigation.goBack();
        }
    }, [budgetDeleteSuccess, navigation]);

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    if (isPending || !data) {
        return <LoadingScreen />;
    }
    if (error) {
        return <ErrorScreen
            errorText="Error fetching budget details"
            errorSubText="Please try again later"
            errorMessage={error.message || 'Some unknown error occured, no message provided'}
        />;
    } else if (budgetDeleteError) {
        return <ErrorScreen
            errorText="Error deleting budget"
            errorSubText="Please try again later"
            errorMessage={budgetDeleteError.message || 'Some unknown error occured, no message provided'}
        />;
    }

    if (isBudgetDeletePending) {
        return (
        <View style={[styles.containerDelete, {paddingTop: insets.top, paddingBottom: insets.bottom}]}>
            <View>
                <Image source={require('../../../../assets/images/Loading_Pig.png')} style={styles.imageDelete} />
                <LoadingDots style ={styles.textDelete} loadingText="Deleting budget" />
            </View>
        </View>);
    }

    const handleDeleteBudget = () => {
       deleteBudget();
       setIsDeleteModalVisible(false);
    };

    const handleEditBudget = () => {
        navigation.navigate('EditBudget', {budgetId});
    };


    return (
        <View style={[styles.container, {paddingTop: insets.top}]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle = {[styles.scrollViewContent, {paddingBottom: Platform.OS === 'ios' ? insets.bottom + spacing.lg * 6 : insets.bottom + spacing.lg * 8}]}
            >
                <View style = {styles.headerSection}>
                    <BackButton />
                    <Text style = {styles.headerTitle}>{truncateText(data.coreBudgetData.budgetTitle, 18)} Details</Text>
                    <AnimatedPressable
                        onPress = {() => setIsDeleteModalVisible(true)}
                    >
                        <FontAwesome6 name="trash" size={24} color={colors.red} />
                    </AnimatedPressable>
                </View>
                <BudgetSummaryCard data = {data.coreBudgetData} />
                <BudgetProgressCard data = {data.coreBudgetData} />
                <BudgetRecentTransactionsCard data = {data} navigation = {navigation}/>
                <BudgetDetailsCard data = {data.coreBudgetData} />
                <BudgetInsightsCard data = {data} />
            </ScrollView>
            <AnimatedPressable
                style = {styles.editBudgetContainer}
                onPress = {handleEditBudget}
            >
                <Text style = {styles.editBudgetText}>Edit Budget</Text>
            </AnimatedPressable>
            <Modal
                visible={isDeleteModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => {setIsDeleteModalVisible(false);}}
            >
                <View style={styles.deletionModalContainer}>
                    <View style={styles.deletionModalContent}>
                        <Image source={require('../../../../assets/images/delete_transaction.png')} style={styles.deletionModalImage} />
                        <Text style={styles.deletionModalTitle}>Delete Budget?</Text>
                        <Text style={styles.deletionModalText}>This budget will be permanently deleted and cannot be recovered.</Text>
                        <View style={styles.deletionModalButtons}>
                            <AnimatedPressable
                                onPress={handleDeleteBudget}
                                style={styles.deletionModalButton}
                            >
                                <Text style={styles.deletionModalButtonText}>Delete</Text>
                            </AnimatedPressable>
                            <AnimatedPressable
                                onPress={() => setIsDeleteModalVisible(false)}
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
