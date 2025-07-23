import { Text, View } from 'react-native';
import { useCreateTransactionListStore } from '../../store/useTransactionListStore';
import { styles } from './CategoryFilterSelector.styles';
import { CategoryLegendCard } from '../CategoryLegendCard/CategoryLegendCard';
import { CategorySimplifiedData, TransactionListResponse } from '../../types';
import { FilterButton } from '../FilterButton/FilterButton';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { fontSize } from '../../../../styles/fontSizes';
import { colors } from '../../../../styles/colors';

type CategoryFilterSelectorProps = {
    data: TransactionListResponse['possibleCategories'];
};

export const CategoryFilterSelector = ({data}: CategoryFilterSelectorProps) => {

    const {transactionListType, categoriesFilterDraft, setCategoriesFilterDraft} = useCreateTransactionListStore();

    const handleCategoryPress = (category: CategorySimplifiedData) => {
        if (categoriesFilterDraft.length === 0) {
            setCategoriesFilterDraft([category.categoryId]);
        } else {
            setCategoriesFilterDraft(categoriesFilterDraft.includes(category.categoryId) ? categoriesFilterDraft.filter((id) => id !== category.categoryId) : [...categoriesFilterDraft, category.categoryId]);
        }
    };

    const createCategoryLabel = (category: CategorySimplifiedData, isActive: boolean) => {
        const textStyle = [styles.categoryLabelText, isActive && styles.activeCategoryLabelText];
        const iconColor = isActive ? colors.white :
            category.transactionType === 'INCOME' ? colors.darkerGreen :
            category.transactionType === 'EXPENSE' ? colors.red :
            colors.gray[500];

        if (category.transactionType === 'INCOME') {
            return (
                <View style={styles.categoryLabelContainer}>
                    <FontAwesome6 name="arrow-up" size={fontSize.base} color={iconColor} />
                    <Text style={textStyle}>{category.icon} {category.categoryName}</Text>
                </View>
            );
        } else if (category.transactionType === 'EXPENSE') {
            return (
                <View style={styles.categoryLabelContainer}>
                    <FontAwesome6 name="arrow-down" size={fontSize.base} color={iconColor} />
                    <Text style={textStyle}>{category.icon} {category.categoryName}</Text>
                </View>
            );
        }
        if (category.transactionType === 'TRANSFER') {
            return (
                <View style={styles.categoryLabelContainer}>
                    <FontAwesome6 name="money-bill-transfer" size={fontSize.base} color={iconColor} />
                    <Text style={textStyle}>{category.icon} {category.categoryName}</Text>
                </View>
            );
        }
        return (
            <Text style={textStyle}>{category.icon} {category.categoryName}</Text>
        );
    };

    return (
        <View style = {styles.categoryFilterContainer}>
            <Text style = {styles.categoryTitleLabel}>Categories</Text>
            <Text style = {styles.categoryDescriptionLabel}>Showing categories for: <Text style = {styles.categoryTypeLabel}>{transactionListType}</Text> transactions</Text>
            <CategoryLegendCard />
            <View style = {styles.categoryFilterButtonsContainer}>
                {data.map((category) => {
                    const isActive = categoriesFilterDraft.includes(category.categoryId);
                    return (
                        <FilterButton
                            key = {category.categoryId}
                            label = {createCategoryLabel(category, isActive)}
                            onPress = {() => handleCategoryPress(category)}
                            isActive = {isActive}
                        />
                    );
                })}
            </View>
        </View>
    );
};
