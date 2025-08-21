import { View, Text, ScrollView, Dimensions, Image, Modal } from 'react-native';
import { DashboardNavigationProps, DashboardStackParamList } from '../../../../navigation/types/DashboardNavigatorTypes';
import { RouteProp } from '@react-navigation/native';
import { styles } from './EditCategoryScreen.styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { colors } from '../../../../styles/colors';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { fontSize } from '../../../../styles/fontSizes';
import { EditCategoryActivityCard } from '../../components/EditCategoryComponents/EditCategoryActivityCard/EditCategoryActivityCard';
import { EditCategoryTypeCard } from '../../components/EditCategoryComponents/EditCategoryTypeCard/EditCategoryTypeCard';
import { EditCategoryNameCard } from '../../components/EditCategoryComponents/EditCategoryNameCard/EditCategoryNameCard';
import { EditCategoryIcon } from '../../components/EditCategoryComponents/EditCategoryIcon/EditCategoryIcon';
import { EditCategoryColor } from '../../components/EditCategoryComponents/EditCategoryColor/EditCategoryColor';
import { EditDescriptionCard } from '../../components/EditDescriptionCard/EditDescriptionCard';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { useEditCategoryStore } from '../../store/editCategoryStore';
import { useUpdateCategory } from '../../hooks/useUpdateCategory';
import { useEffect, useState } from 'react';
import { LoadingDots } from '../../../../components/LoadingDots/LoadingDots';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';
import { useDeleteCategory } from '../../hooks/useDeleteCategory';


type EditCategoryScreenProps = {
    navigation: DashboardNavigationProps;
    route: RouteProp<DashboardStackParamList, 'EditCategory'>;
}

export const EditCategoryScreen = ({navigation, route}: EditCategoryScreenProps) => {
    const {categoryData} = route.params;
    const insets = useSafeAreaInsets();
    const height = Dimensions.get('window').height;
    const {validateCategoryName, categoryNameError, categoryIconError} = useEditCategoryStore();

    const {mutate: updateCategory, isPending, error, isSuccess} = useUpdateCategory();
    const {mutate: deleteCategory,
        isPending: isDeletingCategory,
        error: deleteCategoryError,
        isSuccess: isDeleteCategorySuccess
    } = useDeleteCategory({categoryId: categoryData.categoryId, categoryType: categoryData.categoryType});
    const [showSuccessUpdate, setShowSuccessUpdate] = useState(false);
    const [showCannotDeleteCategoryModal, setShowCannotDeleteCategoryModal] = useState(false);
    const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);
    const [invalidSubmissionText, setInvalidSubmissionText] = useState('');

    const isDeletableCategory = categoryData.usedInTransactions <= 0 && categoryData.usedInBudgets <= 0;

    useEffect(() => {
        if (isSuccess) {
            setShowSuccessUpdate(true);
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isDeleteCategorySuccess) {
            navigation.navigate('ManageCategories');
        }
    }, [isDeleteCategorySuccess, navigation]);

    useEffect(() => {
        if (categoryNameError === null && categoryIconError === null) {
            setInvalidSubmissionText('');
        }
    }, [categoryNameError, categoryIconError]);

    if (isPending) {
        return (
            <View style={[styles.loadingContainer, {paddingTop: insets.top, paddingBottom: insets.bottom}]}>
                <View>
                    <Image source={require('../../../../assets/images/Loading_Pig.png')} style={styles.image} />
                    <LoadingDots style={styles.text} loadingText="Updating category" />
                </View>
            </View>
        );
    }

    if (error) {
        return <ErrorScreen
            errorText = "Error updating category"
            errorSubText = "Please try again later"
            errorMessage = {error.message}
        />;
    }

    if (isDeletingCategory) {
        return (
            <View style={[styles.loadingContainer, {paddingTop: insets.top, paddingBottom: insets.bottom}]}>
                <View>
                    <Image source={require('../../../../assets/images/Loading_Pig.png')} style={styles.image} />
                    <LoadingDots style={styles.text} loadingText="Deleting category" />
                </View>
            </View>
        );
    }

    if (deleteCategoryError) {
        return <ErrorScreen
            errorText = "Error deleting category"
            errorSubText = "Please try again later"
            errorMessage = {deleteCategoryError.message}
        />;
    }

    const handleSaveCategory = () => {
        if (!validateCategoryName()) {
            setInvalidSubmissionText('There are some invalid fields above');
            return;
        }
        updateCategory();
    };

    const handleOpenDeleteCategory = () => {
        if (!isDeletableCategory ||
            categoryData.categoryName === 'Uncategorized Expense' ||
            categoryData.categoryName === 'Uncategorized Income' ||
            categoryData.categoryName === 'Transfer') {
            setShowCannotDeleteCategoryModal(true);
        } else {
            setShowDeleteCategoryModal(true);
        }
    };

    const handleDeleteCategory = () => {
        setShowDeleteCategoryModal(false);
        deleteCategory();
    };

    const navBackToCategoryListScreen = () => {
        setShowSuccessUpdate(false);
        navigation.navigate('ManageCategories');
    };

    return (

            <ScrollView
                style = {[styles.container, {paddingTop: insets.top}]}
                showsVerticalScrollIndicator = {false}
                contentContainerStyle = {[styles.contentContainer, {paddingBottom: insets.bottom + height * 0.5}]}
            >
                <View style = {styles.headerSection}>
                    <BackButton />
                    <Text style = {styles.title}>Edit Category</Text>
                    <FontAwesome6 name = "empty-space" size = {fontSize.xl} color = {colors.background} />
                </View>
                <EditCategoryActivityCard categoryData = {categoryData} />
                <EditCategoryTypeCard categoryType = {categoryData.categoryType}/>
                <EditCategoryNameCard categoryType = {categoryData.categoryType}/>
                <EditCategoryIcon />
                <EditCategoryColor />
                <EditDescriptionCard />
                <View style = {styles.buttonsContainer}>
                    <AnimatedPressable
                        style = {styles.saveCategoryButton}
                        onPress = {handleSaveCategory}
                    >
                        <Text style = {styles.saveCategoryButtonText}>Save Category</Text>
                    </AnimatedPressable>
                    <AnimatedPressable
                        style = {isDeletableCategory ? styles.deleteCategoryButton : styles.deleteCategoryButtonDisabled}
                        onPress = {handleOpenDeleteCategory}
                    >
                        <Text style = {isDeletableCategory ? styles.deleteCategoryButtonText : styles.deleteCategoryButtonTextDisabled}>Delete Category</Text>
                    </AnimatedPressable>
                </View>
                {invalidSubmissionText && <Text style={styles.errorText}>{invalidSubmissionText}</Text>}
                <Modal
                    visible={showSuccessUpdate}
                    animationType="fade"
                    onRequestClose={() => setShowSuccessUpdate(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Image source={require('../../../../assets/images/confirmation.png')} style={styles.modalImage} />
                            <Text style={styles.modalTitle}>Update Success!</Text>
                            <Text style={styles.modalText}>Your category has been updated successfully</Text>
                            <View style={styles.modalButtons}>
                                <AnimatedPressable
                                    onPress={navBackToCategoryListScreen}
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
                    visible={showCannotDeleteCategoryModal}
                    animationType="fade"
                    onRequestClose={() => setShowCannotDeleteCategoryModal(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Image source={require('../../../../assets/images/Important_notification.png')} style={styles.modalImage} />
                            <Text style={styles.modalTitle}>Cannot Delete Category</Text>
                            <Text style={styles.modalText}>This category is either used actively in transactions or budgets or is a system default like Uncategorized or Transfer.</Text>
                            <View style={styles.modalButtons}>
                                <AnimatedPressable
                                    onPress={() => setShowCannotDeleteCategoryModal(false)}
                                    style={styles.continueButton}
                                >
                                    <Text style={styles.continueButtonText}>Continue</Text>
                                </AnimatedPressable>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                visible={showDeleteCategoryModal}
                animationType="fade"
                onRequestClose={() => {setShowDeleteCategoryModal(false);}}
            >
                <View style={styles.deletionModalContainer}>
                    <View style={styles.deletionModalContent}>
                        <Image source={require('../../../../assets/images/delete_transaction.png')} style={styles.deletionModalImage} />
                        <Text style={styles.deletionModalTitle}>Delete Category?</Text>
                        <Text style={styles.deletionModalText}>This category will be permanently deleted and cannot be recovered.</Text>
                        <View style={styles.deletionModalButtons}>
                            <AnimatedPressable
                                onPress={handleDeleteCategory}
                                style={styles.deletionModalButton}
                            >
                                <Text style={styles.deletionModalButtonText}>Delete</Text>
                            </AnimatedPressable>
                            <AnimatedPressable
                                onPress={() => {setShowDeleteCategoryModal(false);}}
                                style={styles.cancelDeletionModalButton}>
                                <Text style={styles.cancelDeletionModalButtonText}>Cancel</Text>
                            </AnimatedPressable>

                        </View>
                    </View>
                </View>
                </Modal>
            </ScrollView>
    );
};

