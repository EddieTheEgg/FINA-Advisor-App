import { Text, View } from 'react-native';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { styles } from './CategorySelector.styles';
import { useCreateTransactionStore } from '../../store/useTransactionStore';
import { SelectedCategoryCard } from '../SelectedCategoryCard/SelectedCategoryCard';
import { TransactionNavigatorProps } from '../../../../navigation/types/TransactionNavigatorTypes';

type CategorySelectorProps = {
    navigation : TransactionNavigatorProps;
}

export const CategorySelector = ({navigation} : CategorySelectorProps) => {

    const { selectedCategory, selectedCategoryError } = useCreateTransactionStore();

    const navigateToCategorySelection = () => {
        navigation.navigate('SelectCategory');
    };

    return (
    <View style = {styles.categorySelectorContainer}>
        <Text style = {styles.categoryTitle}>Category</Text>
        <AnimatedPressable
            onPress = {navigateToCategorySelection}
        >
            <SelectedCategoryCard
                emptyCard = {selectedCategory ? false : true}
                categoryColor = {selectedCategory?.color}
                categoryIcon = {selectedCategory?.icon}
                categoryName = {selectedCategory?.categoryName}
                categoryDescription = {selectedCategory?.categoryDescription}
            />
        </AnimatedPressable>
        {selectedCategoryError && (
            <Text style={styles.selectedCategoryError}>{selectedCategoryError}</Text>
        )}
    </View>
    );
};
