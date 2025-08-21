import { Dimensions, Image, Modal, Platform, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './CreateCategoryScreen.styles';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { fontSize } from '../../../../styles/fontSizes';
import { colors } from '../../../../styles/colors';
import { CategoryTypeCard } from '../../components/CreateCategoryComponents/CategoryTypeCard/CategoryTypeCard';
import { CategoryNameCard } from '../../components/CreateCategoryComponents/CategoryNameCard/CategoryNameCard';
import { CategoryIconCard } from '../../components/CreateCategoryComponents/CategoryIconCard/CategoryIconCard';
import { CategoryColorCard } from '../../components/CreateCategoryComponents/CategoryColorCard/CategoryColorCard';
import { CategoryDescriptionCard } from '../../components/CreateCategoryComponents/CategoryDescriptionCard/CategoryDescriptionCard';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { useEffect, useState } from 'react';
import { DashboardNavigationProps } from '../../../../navigation/types/DashboardNavigatorTypes';
import { useCreateCategoryStore } from '../../store/useCreateCategoryStore';
import { useCreateCategory } from '../../hooks/useCreateCategory';
import { LoadingDots } from '../../../../components/LoadingDots/LoadingDots';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';


type CreateCategoryScreenProps = {
    navigation: DashboardNavigationProps;
};

export const CreateCategoryScreen = ({navigation}: CreateCategoryScreenProps) => {
    const insets = useSafeAreaInsets();
    const height = Dimensions.get('window').height;
    const [showSuccessCreate, setShowSuccessCreate] = useState(false);
    const {resetToInitialState, categoryIconError, categoryNameError, categoryColorError, validateCategoryName, validateCategoryIcon, validateCategoryColor} = useCreateCategoryStore();
    const {mutate: createCategory, isPending, error, isSuccess} = useCreateCategory();
    const [invalidSubmissionText, setInvalidSubmissionText] = useState('');

    useEffect(() => {
        if (isSuccess) {
            resetToInitialState();
            setShowSuccessCreate(true);
        }
    }, [isSuccess, resetToInitialState]);

    useEffect(() => {
        if (categoryNameError === null && categoryIconError === null && categoryColorError === null) {
            setInvalidSubmissionText('');
        }
    }, [categoryNameError, categoryIconError, categoryColorError]); //This is a dependency that we don't need, but it's here to avoid linting errors

    if (isPending) {
        return (
            <View style={[styles.loadingContainer, {paddingTop: insets.top, paddingBottom: insets.bottom}]}>
                <View>
                    <Image source={require('../../../../assets/images/Loading_Pig.png')} style={styles.image} />
                    <LoadingDots style={styles.text} loadingText="Creating category" />
                </View>
            </View>
        );
    }

    if (error) {
        return <ErrorScreen
            errorText = "Error creating category"
            errorSubText = "Please try again later"
            errorMessage = {error.message}
        />;
    }

    const navBackToCategoryListScreen = () => {
        setShowSuccessCreate(false);
        navigation.navigate('ManageCategories');
    };

    const handleCreateCategory = () => {
        if (!validateCategoryName() || !validateCategoryIcon() || !validateCategoryColor()) {
            setInvalidSubmissionText('There are some invalid fields above');
            return;
        }
        createCategory();
    };

    return (
        <ScrollView
            style = {[styles.container, {paddingTop: Platform.OS === 'ios' ? insets.top : insets.top + 10}]}
            showsVerticalScrollIndicator = {false}
            contentContainerStyle = {[styles.contentContainer, {paddingBottom: insets.bottom + height * 0.5}]}
        >
            <View style = {styles.headerSection}>
                <BackButton />
                <Text style = {styles.title}>Create Category</Text>
                <FontAwesome6 name = "empty-space" size = {fontSize.lg} color = {colors.background} />
            </View>
            <CategoryTypeCard />
            <CategoryNameCard />
            <CategoryIconCard />
            <CategoryColorCard />
            <CategoryDescriptionCard />
            <AnimatedPressable
                style = {styles.createCategoryButton}
                onPress = {handleCreateCategory}
            >
                <Text style = {styles.createCategoryButtonText}>Create Category</Text>
            </AnimatedPressable>
            {invalidSubmissionText && <Text style={styles.errorText}>{invalidSubmissionText}</Text>}
            <Modal
                visible={showSuccessCreate}
                animationType="fade"
                onRequestClose={() => setShowSuccessCreate(false)}
                >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Image source={require('../../../../assets/images/confirmation.png')} style={styles.modalImage} />
                        <Text style={styles.modalTitle}>Create Success!</Text>
                        <Text style={styles.modalText}>Your category has been created successfully</Text>
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
