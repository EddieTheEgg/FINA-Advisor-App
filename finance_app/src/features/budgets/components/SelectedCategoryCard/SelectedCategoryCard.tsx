import { Text, View } from 'react-native';
import { truncateText } from '../../../../utils/textFormat';
import {styles } from './SelectedCategoryCard.styles';
import { useCreateBudgetStore } from '../../store/useCreateBudgetStore';



export const SelectedCategoryCard = () => {
    const {selectedCategoryInfo} = useCreateBudgetStore();

    if (!selectedCategoryInfo) {
        return (
            <View style = {styles.emptyCategoryCardContainer}>
            <Text style = {[styles.emptyCategoryIcon]}>  ?  </Text>
                <View style = {styles.categoryInfoContainer}>
                <Text style = {styles.categoryName}>Choose An Category</Text>
                </View>
                <Text style = {styles.arrowIcon}> {'>'}</Text>
            </View>
        );
    }
    return(
        <View style = {styles.categoryCardContainer}>
            <Text style = {[styles.categoryIcon, {backgroundColor: selectedCategoryInfo.categoryColor}]}>{selectedCategoryInfo.categoryIcon}</Text>
            <View style = {styles.categoryInfoContainer}>
                <Text style = {styles.categoryName}>{truncateText(selectedCategoryInfo.categoryName, 15)}</Text>
                {selectedCategoryInfo.categoryDescription && (
                    <Text style = {styles.categoryDescription}>{selectedCategoryInfo.categoryDescription}</Text>
                )}
            </View>
            <Text style = {styles.arrowIcon}> {'>'}</Text>
        </View>
    );
};
