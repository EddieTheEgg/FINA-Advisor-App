import React from 'react';
import { AnimatedPressable } from '../../../../../components/AnimatedPressable/AnimatedPressable';
import { Text } from 'react-native';
import { styles } from './CategoryTypeButton.styles';
import { useCategoryStore } from '../../../store/useCategoryStore';

type CategoryTypeButtonProps = {
    selectedCategoryType: 'INCOME' | 'EXPENSE' | 'TRANSFER';
    label: string;
}

export const CategoryTypeButton = React.memo(({selectedCategoryType, label}: CategoryTypeButtonProps) => {

    const {categoryType, setCategoryType} = useCategoryStore();

    const handleChangeCategoryType = () => {
        setCategoryType(selectedCategoryType);
    };

    return (
        <AnimatedPressable
            style={[
                categoryType === selectedCategoryType
                    ? styles.activeCategoryType
                    : styles.inactiveCategoryType,
            ]}
            onPress={handleChangeCategoryType}
        >
        <Text style = {categoryType === selectedCategoryType
                    ? styles.activeCategoryTypeText
                    : styles.inactiveCategoryTypeText}>{label}</Text>
        </AnimatedPressable>
);
});
