import { View, Text, TextInput } from 'react-native';
import { useEditCategoryStore } from '../../../store/editCategoryStore';
import { useEffect, useState } from 'react';
import { styles } from './EditCategoryNameCard.styles';
import { useGetAllUserCategories } from '../../../hooks/useGetAllUserCategories';
import { ErrorScreen } from '../../../../../components/ErrorScreen/ErrorScreen';

type EditCategoryNameCardProps = {
    categoryType: 'INCOME' | 'EXPENSE' | 'TRANSFER';
}

export const EditCategoryNameCard = ({categoryType}: EditCategoryNameCardProps) => {

     // Fetches user categories by transaction type, used for validating category name uniqueness!
     const {data: allCategories, isPending, error: fetchAllCategoriesError} = useGetAllUserCategories(categoryType);
     const {initializeAllCategories, categoryNameDraft, setCategoryNameDraft, validateCategoryName, categoryNameError} = useEditCategoryStore();
     const [categoryNameInput, setCategoryNameInput] = useState(categoryNameDraft);

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
