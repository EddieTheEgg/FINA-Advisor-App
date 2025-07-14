import { Text, View } from 'react-native';
import { truncateText } from '../../../../utils/textFormat';
import { styles } from './SelectedCategoryCard.styles';

type SelectedCategoryCardProps = {
    emptyCard: boolean,
    categoryColor?: string,
    categoryIcon?: string,
    categoryName?: string,
    categoryDescription?: string | null,
}

export const SelectedCategoryCard = ({emptyCard, categoryColor, categoryIcon, categoryName, categoryDescription}: SelectedCategoryCardProps) => {
    return emptyCard ? (
        <View style = {styles.emptyCategoryCardContainer}>
           <Text style = {[styles.emptyCategoryIcon]}>  ?  </Text>
            <View style = {styles.categoryInfoContainer}>
              <Text style = {styles.categoryName}>Choose A Category</Text>
            </View>
            <Text style = {styles.arrowIcon}> {'>'}</Text>
        </View>
      ) : (
        <View style = {styles.categoryCardContainer}>
            <Text style = {[styles.categoryIcon, {backgroundColor: categoryColor}]}>{categoryIcon}</Text>
            <View style = {styles.categoryInfoContainer}>
              <Text style = {styles.categoryName}>{truncateText(categoryName, 15)}</Text>
              {categoryDescription && <Text style = {styles.categoryDescription}>{categoryDescription}</Text>}
            </View>
            <Text style = {styles.arrowIcon}> {'>'}</Text>
        </View>
      );
};
