import { View, Text } from 'react-native';
import { styles } from './EditCategoryActivityCard.styles';
import { CategoryManageSummary } from '../../../types';
import { colors } from '../../../../../styles/colors';

type EditCategoryActivityCardProps = {
    categoryData: CategoryManageSummary;
}

export const EditCategoryActivityCard = ({categoryData}: EditCategoryActivityCardProps) => {


    //If the category is not used in any transactions or budgets, show a message
    if (categoryData.usedInTransactions <= 0 && categoryData.usedInBudgets <= 0) {
        return (
            <View style = {styles.container}>
                <Text>This category is not used in any transactions or budgets</Text>
                <Text>{categoryData.categoryName}</Text>
            </View>
        );
    }


    return (
        <View style = {styles.container}>
            <Text style = {styles.title}>{categoryData.categoryIcon}  This category is actively used</Text>
            <Text style = {styles.description}>{categoryData.categoryName} is used in your financial tracking.</Text>
            <Text style = {styles.warningText}>You cannot DELETE this category when actively used.</Text>
            <View style = {styles.divider}/>
            <View style = {styles.activityInfoSection}>
                <View style = {[styles.activitySection, {backgroundColor: colors.green}]}>
                    <View style = {[styles.activityContent, {backgroundColor: colors.lighterGreen}]}>
                        <Text style = {[styles.activityText, {color: colors.darkerGreen}]}>📝 Transactions: {categoryData.usedInTransactions}</Text>
                    </View>
                </View>
                <View style = {[styles.activitySection, {backgroundColor: colors.blue}]}>
                    <View style = {[styles.activityContent, {backgroundColor: colors.lightBlueV2}]}>
                        <Text style = {[styles.activityText, {color: colors.darkBlue}]}>📝 Active budgets: {categoryData.usedInBudgets}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};
