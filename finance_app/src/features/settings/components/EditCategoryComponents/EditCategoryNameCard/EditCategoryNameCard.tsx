import { View, Text, TextInput, Modal, Image } from 'react-native';
import { useEditCategoryStore } from '../../../store/editCategoryStore';
import { useEffect, useState } from 'react';
import { styles } from './EditCategoryNameCard.styles';
import { useGetAllUserCategories } from '../../../hooks/useGetAllUserCategories';
import { ErrorScreen } from '../../../../../components/ErrorScreen/ErrorScreen';
import { AnimatedPressable } from '../../../../../components/AnimatedPressable/AnimatedPressable';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { fontSize } from '../../../../../styles/fontSizes';
import { colors } from '../../../../../styles/colors';

type EditCategoryNameCardProps = {
    categoryType: 'INCOME' | 'EXPENSE' | 'TRANSFER';
}

export const EditCategoryNameCard = ({categoryType}: EditCategoryNameCardProps) => {

     // Fetches user categories by transaction type, used for validating category name uniqueness!
     const {data: allCategories, isPending, error: fetchAllCategoriesError} = useGetAllUserCategories(categoryType);
     const {initializeAllCategories, categoryNameDraft, setCategoryNameDraft, validateCategoryName, categoryNameError, originalCategoryName} = useEditCategoryStore();
     const [categoryNameInput, setCategoryNameInput] = useState(categoryNameDraft);
     const [isMoreDetailsExpanded, setIsMoreDetailsExpanded] = useState(false);

     const cannotEditCategoryName = originalCategoryName === 'Uncategorized Expense' || originalCategoryName === 'Uncategorized Income' || originalCategoryName === 'Transfer';

     const maxLength = 30;
     const remainingChars = maxLength - categoryNameInput.length;

     useEffect(() => {
         if (allCategories) {
             initializeAllCategories(allCategories.categories);
         }
     }, [allCategories, initializeAllCategories]);

     // Update store immediately as category name is typedfor real-time validation
     useEffect(() => {
         setCategoryNameDraft(categoryNameInput);
     }, [categoryNameInput, setCategoryNameDraft]);

     // Part 2 of the real-time validation, using the updated categoryNameInput changes to trigger validation
     useEffect(() => {
         validateCategoryName();
     }, [categoryNameDraft, validateCategoryName]);

     if (fetchAllCategoriesError) {
        return <ErrorScreen
            errorText = "Error fetching all categories for this category type"
            errorSubText = "Something went wrong, categories are needed to validate category name uniqueness"
            errorMessage = {fetchAllCategoriesError.message}
        />;
     }

     if (cannotEditCategoryName) {
        return (
            <View style = {styles.container}>
                <View style={styles.categoryNameHeader}>
                        <Text style={styles.categoryNameText}>Category Name</Text>
                        <AnimatedPressable
                            onPress = {() => setIsMoreDetailsExpanded(true)}
                            >
                            <FontAwesome6 name = "circle-question" size = {fontSize.base + 2} color = {colors.black} />
                        </AnimatedPressable>
                    </View>
                    <TextInput
                        value = {categoryNameInput}
                        onChangeText = {setCategoryNameInput}
                        placeholder = "Enter category name"
                        style = {styles.categoryNameInput}
                        maxLength = {maxLength}
                        editable = {false}
                    />
                    <Text style = {styles.lockIcon}>🔒</Text>
                    <Modal
                        visible = {isMoreDetailsExpanded}
                        transparent = {true}
                        animationType = "fade"
                        onRequestClose = {() => setIsMoreDetailsExpanded(false)}
                        >
                        <View style = {styles.modalContainer}>
                            <View style = {styles.modalContent}>
                                <Image source={require('../../../../../assets/images/question_icon.png')} style={styles.modalImage} />
                                <Text style = {styles.modalTitle}>Why is this locked?</Text>
                                <Text style = {styles.modalText}>This category name is a default category that is used for reassigning transactions.</Text>
                                <AnimatedPressable
                                    onPress = {() => setIsMoreDetailsExpanded(false)}
                                >
                                    <Text style = {styles.modalCloseButton}>Close</Text>
                                </AnimatedPressable>
                            </View>
                        </View>
                    </Modal>
        </View>
        );
     }

    return (
        <View style = {styles.container}>
           <View style={styles.categoryNameHeader}>
                <Text style={styles.categoryNameText}>Category Name</Text>
                <Text style={[
                    styles.charCounter,
                    remainingChars < 10 ? styles.charCounterWarning : {},
                ]}>
                    {categoryNameInput.length}/{maxLength}
                </Text>
            </View>
            <TextInput
                value = {categoryNameInput}
                onChangeText = {setCategoryNameInput}
                placeholder = "Enter category name"
                style = {styles.categoryNameInput}
                maxLength = {maxLength}
                editable = {!cannotEditCategoryName}
            />
             {isPending && categoryNameDraft.trim().length >= 3 && (
                <Text style={styles.categoryNameError}>Checking for duplicates...</Text>
            )}
             {categoryNameError && !isPending && (
                <Text style={styles.categoryNameError}>{categoryNameError}</Text>
            )}
        </View>
    );
};
