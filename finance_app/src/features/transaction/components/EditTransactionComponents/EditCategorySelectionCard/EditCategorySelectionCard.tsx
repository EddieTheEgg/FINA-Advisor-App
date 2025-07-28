import { Text, View } from 'react-native';
import { CategoryResponse } from '../../../types';
import { AnimatedPressable } from '../../../../../components/AnimatedPressable/AnimatedPressable';
import { styles } from './EditCategorySelectionCard.styles';
import { capitalizeFirstLetter } from '../../../../../utils/textFormat';
import { truncateText } from '../../../../../utils/textFormat';
import { RootNavigationProps } from '../../../../../navigation/types/RootNavigatorTypes';
import { useEditTransactionStore } from '../../../store/useEditTransactionStore';

type EditCategorySelectionCardProps = {
    categoryItem: CategoryResponse;
    navigation: RootNavigationProps;
}

export const EditCategorySelectionCard = ({categoryItem, navigation}: EditCategorySelectionCardProps) => {

    const {selectedCategoryDraft, setSelectedCategoryDraft, validateSelectedCategory} = useEditTransactionStore();

    const handleNavToEditTransactionScreen = () => {
        setSelectedCategoryDraft(categoryItem);
        validateSelectedCategory();
        navigation.goBack();
    };

    return (
        <AnimatedPressable
            scaleValue={0.9}
            delay={200}
            style = {[
                styles.categoryCardContainer,
                selectedCategoryDraft?.categoryId === categoryItem.categoryId ? styles.selectedCategoryCard : '']}
            onPress = {handleNavToEditTransactionScreen}
        >
            <View style = {[styles.iconContainer ,{backgroundColor : categoryItem.color}]}>
                <Text style = {styles.iconText}>{categoryItem.icon}</Text>
            </View>
            <View>
                <Text style = {styles.categoryNameText}>{truncateText(categoryItem.categoryName, 23)}</Text>
                {categoryItem.categoryDescription && (
                    <Text style = {styles.categorySubInfoText}>{capitalizeFirstLetter(categoryItem.categoryDescription)}</Text>
                )}
            </View>
        </AnimatedPressable>
    );
};
