import { View, Text } from 'react-native';
import { useEditTransactionStore } from '../../../store/useEditTransactionStore';
import { styles } from './EditSelectedCategoryCard.styles';
import { truncateText } from '../../../../../utils/textFormat';

export const EditSelectedCategoryCard = () => {

    const { selectedCategoryDraft } = useEditTransactionStore();


    if (!selectedCategoryDraft) {
        return (
            <View style = {styles.emptyCategoryCardContainer}>
                <Text style = {[styles.emptyCategoryIcon]}>  ?  </Text>
                <View style = {styles.categoryInfoContainer}>
                    <Text style = {styles.categoryName}>Choose A Category</Text>
                </View>
                <Text style = {styles.arrowIcon}> {'>'}</Text>
            </View>
        );
    }
    return (
        <View style = {styles.categoryCardContainer}>
            <Text style = {[styles.categoryIcon, {backgroundColor: selectedCategoryDraft.color}]}>{selectedCategoryDraft.icon}</Text>
            <View style = {styles.categoryInfoContainer}>
              <Text style = {styles.categoryName}>{truncateText(selectedCategoryDraft.categoryName, 15)}</Text>
              {selectedCategoryDraft.categoryDescription && <Text style = {styles.categoryDescription}>{selectedCategoryDraft.categoryDescription}</Text>}
            </View>
            <Text style = {styles.arrowIcon}> {'>'}</Text>
        </View>
      );
};