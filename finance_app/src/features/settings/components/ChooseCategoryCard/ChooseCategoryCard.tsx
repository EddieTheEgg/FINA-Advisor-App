import { View } from 'react-native';
import { styles } from './ChooseCategoryCard.styles';
import { CategoryTypeButton } from '../CreateCategoryComponents/CategoryTypeButton/CategoryTypeButton';


export const ChooseCategoryCard = () => {
    return (
        <View style = {styles.container}>
            <CategoryTypeButton
                selectedCategoryType = "EXPENSE"
                label = "Expense"
            />
            <CategoryTypeButton
                selectedCategoryType = "INCOME"
                label = "Income"
            />
            <CategoryTypeButton
                selectedCategoryType = "TRANSFER"
                label = "Transfer"
            />
        </View>
    );
};
