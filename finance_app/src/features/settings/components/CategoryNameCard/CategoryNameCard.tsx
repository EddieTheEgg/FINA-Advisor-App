import { View, Text, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { styles } from './CategoryNameCard.styles';

import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';
import { useCreateCategoryStore } from '../../store/useCreateCategoryStore';
import { useGetAllUserCategories } from '../../hooks/useGetAllUserCategories';


export const CategoryNameCard = () => {

    const {initializeAllCategories, categoryName, setCategoryName, categoryNameError, validateCategoryName, categoryType} = useCreateCategoryStore();

     // Fetches user categories by transaction type, used for validating category name uniqueness!
     const {data: allCategories, isPending, error: fetchAllCategoriesError} = useGetAllUserCategories(categoryType);
     const [categoryNameInput, setCategoryNameInput] = useState(categoryName);

     const maxLength = 30;
     const remainingChars = maxLength - categoryNameInput.length;

     useEffect(() => {
         if (allCategories) {
             initializeAllCategories(allCategories.categories);
         }
     }, [allCategories, initializeAllCategories]);

     // Update store immediately as category name is typedfor real-time validation
     useEffect(() => {
         setCategoryName(categoryNameInput);
     }, [categoryNameInput, setCategoryName]);

     // Part 2 of the real-time validation, using the updated categoryNameInput changes to trigger validation
     useEffect(() => {
         validateCategoryName();
     }, [categoryNameInput, validateCategoryName]);

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
            {isPending && categoryName.trim().length >= 3 && (
                <Text style={styles.categoryNameError}>Checking for duplicates...</Text>
            )}
             {categoryNameError && !isPending && (
                <Text style={styles.categoryNameError}>{categoryNameError}</Text>
            )}
        </View>
    );
};
