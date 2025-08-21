import { View, Text, TextInput } from 'react-native';
import { useEditCategoryStore } from '../../store/editCategoryStore';
import { useEffect, useState } from 'react';
import { styles } from './EditDescriptionCard.styles';
import { colors } from '../../../../styles/colors';

export const EditDescriptionCard = () => {
    const {categoryDescriptionDraft, setCategoryDescriptionDraft} = useEditCategoryStore();
    const [descriptionInput, setDescriptionInput] = useState(categoryDescriptionDraft || '');

    useEffect(() => {
        setCategoryDescriptionDraft(descriptionInput);
    }, [descriptionInput, setCategoryDescriptionDraft]);

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
