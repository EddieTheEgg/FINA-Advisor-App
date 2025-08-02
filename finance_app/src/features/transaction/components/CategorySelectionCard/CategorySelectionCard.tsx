import { Text, View } from 'react-native';
import { CategoryResponse } from '../../types';
import { TransactionNavigatorProps } from '../../../../navigation/types/TransactionNavigatorTypes';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { styles } from './CategorySelectionCard.styles';
import { useCreateTransactionStore } from '../../store/useTransactionStore';
import { capitalizeFirstLetter } from '../../../../utils/textFormat';
import { truncateText } from '../../../../utils/textFormat';

type CategorySelectionCardProps = {
    categoryItem: CategoryResponse;
    navigation: TransactionNavigatorProps;
}

export const CategorySelectionCard = ({categoryItem, navigation}: CategorySelectionCardProps) => {

    const {selectedCategory, setSelectedCategory, validateSelectedCategory} = useCreateTransactionStore();

    const handleNavToTransactionScreen = () => {
        setSelectedCategory(categoryItem);
        validateSelectedCategory();
        navigation.navigate('CreateTransaction');
    };

    return (
        <AnimatedPressable
            scaleValue={0.9}
            delay={200}
            style = {[
                styles.categoryCardContainer,
                selectedCategory?.categoryId === categoryItem.categoryId ? styles.selectedCategoryCard : '']}
            onPress = {handleNavToTransactionScreen}
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
