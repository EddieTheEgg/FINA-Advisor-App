import { View, Text } from 'react-native';
import { styles } from './CategoryTypeCard.styles';
import { colors } from '../../../../styles/colors';

type CategoryTypeCardProps = {
    categoryType: 'INCOME' | 'EXPENSE' | 'TRANSFER';
}

export const CategoryTypeCard = ({categoryType} : CategoryTypeCardProps) => {

    if (categoryType === 'INCOME') {
        return (
            <View style = {styles.container}>
            <Text style = {styles.title}>Category Type</Text>
            <View style = {styles.contentContainer}>
                <Text style = {[styles.icon, {backgroundColor: colors.lighterGreen}]}>💰</Text>
                <View style = {styles.textContainer}>
                    <Text style = {styles.categoryTypeLabel}>Income</Text>
                    <Text style = {styles.description}>Cannot be changed after creation</Text>
                </View>
                <Text style = {styles.lockIcon}>🔒</Text>
            </View>
        </View>
        );
    }

    if (categoryType === 'EXPENSE') {
        return (
            <View style = {styles.container}>
                <Text style = {styles.title}>Category Type</Text>
                <View style = {styles.contentContainer}>
                    <Text style = {[styles.icon, {backgroundColor: colors.lighterRed}]}>💳</Text>
                    <View style = {styles.textContainer}>
                        <Text style = {styles.categoryTypeLabel}>Expense</Text>
                        <Text style = {styles.description}>Cannot be changed after creation</Text>
                    </View>
                    <Text style = {styles.lockIcon}>🔒</Text>
                </View>
            </View>
        );
    }

    if (categoryType === 'TRANSFER') {
        return (
            <View style = {styles.container}>
                <Text style = {styles.title}>Category Type</Text>
                <View style = {styles.contentContainer}>
                    <Text style = {[styles.icon, {backgroundColor: colors.lightBlue}]}>↔️</Text>
                    <View style = {styles.textContainer}>
                        <Text style = {styles.categoryTypeLabel}>Transfer</Text>
                        <Text style = {styles.description}>Cannot be changed after creation</Text>
                    </View>
                    <Text style = {styles.lockIcon}>🔒</Text>
                </View>
            </View>
        );
    }
};

