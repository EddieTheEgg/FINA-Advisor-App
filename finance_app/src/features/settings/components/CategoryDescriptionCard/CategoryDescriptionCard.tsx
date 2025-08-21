import { View, Text, TextInput } from 'react-native';
import { useCreateCategoryStore } from '../../store/useCreateCategoryStore';
import { useEffect, useState } from 'react';
import { styles } from './CategoryDescriptionCard.styles';
import { colors } from '../../../../styles/colors';

export const CategoryDescriptionCard = () => {
    const {categoryDescription, setCategoryDescription} = useCreateCategoryStore();
    const [descriptionInput, setDescriptionInput] = useState(categoryDescription || '');

    useEffect(() => {
        setCategoryDescription(descriptionInput);
    }, [descriptionInput, setCategoryDescription]);

    const maxLength = 30;
    const remainingChars = maxLength - descriptionInput.length;

    return (
        <View style = {styles.container}>
            <View style = {styles.titleContainer}>
                <Text style = {styles.title}>Description (Optional)</Text>
                <Text style = {[styles.descriptionInputLength, {color: remainingChars < 5 ? colors.red : colors.black}]}>{descriptionInput.length}/{maxLength}</Text>
            </View>
            <TextInput
                style = {styles.descriptionInput}
                value = {descriptionInput}
                onChangeText = {setDescriptionInput}
                placeholder = "Enter description"
                maxLength = {maxLength}
            />
        </View>
    );
};
