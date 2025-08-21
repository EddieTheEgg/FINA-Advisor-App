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
import { EditCategoryIcon } from '../../components/EditCategoryIcon/EditCategoryIcon';
import { EditCategoryColor } from '../../components/EditCategoryColor/EditCategoryColor';
import { EditDescriptionCard } from '../../components/EditDescriptionCard/EditDescriptionCard';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { useEditCategoryStore } from '../../store/editCategoryStore';
import { useUpdateCategory } from '../../hooks/useUpdateCategory';
import { useEffect, useState } from 'react';
import { LoadingDots } from '../../../../components/LoadingDots/LoadingDots';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';


type EditCategoryScreenProps = {
    navigation: DashboardNavigationProps;
    route: RouteProp<DashboardStackParamList, 'EditCategory'>;
}

export const EditCategoryScreen = ({navigation, route}: EditCategoryScreenProps) => {
    const {categoryData} = route.params;
    const insets = useSafeAreaInsets();
    const height = Dimensions.get('window').height;
    const {validateCategoryName} = useEditCategoryStore();

    const {mutate: updateCategory, isPending, error, isSuccess} = useUpdateCategory();
    const [showSuccessUpdate, setShowSuccessUpdate] = useState(false);

    useEffect(() => {
        if (isSuccess) {
            setShowSuccessUpdate(true);
        }
    }, [isSuccess]);

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

    const handleSaveCategory = () => {
        if (!validateCategoryName()) {
            return;
        }
        updateCategory();
    };

    const navBackToCategoryListScreen = () => {
        navigation.navigate('ManageCategories');
        setShowSuccessUpdate(false);
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
                <AnimatedPressable
                    style = {styles.saveCategoryButton}
                    onPress = {handleSaveCategory}
                >
                    <Text style = {styles.saveCategoryButtonText}>Save Category</Text>
                </AnimatedPressable>
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
            </ScrollView>
  
    );
};

