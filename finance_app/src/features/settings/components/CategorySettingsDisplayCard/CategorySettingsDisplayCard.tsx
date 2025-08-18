import { View, Text } from 'react-native';
import { CategoryManageSummary } from '../../types';
import { styles } from './CategorySettingsDisplayCard.styles';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { truncateText } from '../../../../utils/textFormat';

type CategorySettingsDisplayCardProps = {
    categoryData: CategoryManageSummary;
}

export const CategorySettingsDisplayCard = ({categoryData}: CategorySettingsDisplayCardProps) => {
    return (
        <View style = {styles.container}>
            <Text style = {[styles.categoryIcon, {backgroundColor: categoryData.categoryColor}]}>{categoryData.categoryIcon}</Text>
            <View style = {styles.categoryTextContainer}>
                <Text style = {styles.categoryName}>{truncateText(categoryData.categoryName, 20)}</Text>
                {categoryData.categoryDescription && (
                    <Text style = {styles.categoryDescription}>{truncateText(categoryData.categoryDescription, 40)}</Text>
                )}
                <Text style = {styles.usedInTransactions}>Used in {categoryData.usedInTransactions} transactions</Text>
            </View>
            <AnimatedPressable
                onPress = {() => {}}
            >
                <Text style = {styles.editButton}>Edit</Text>
            </AnimatedPressable>
        </View>
    );
};
