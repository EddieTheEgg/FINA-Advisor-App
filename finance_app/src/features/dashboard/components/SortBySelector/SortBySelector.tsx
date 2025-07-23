import { View, Text } from 'react-native';
import { useCreateTransactionListStore } from '../../store/useTransactionListStore';
import { FilterButton } from '../FilterButton/FilterButton';
import { styles } from './SortBySelector.styles';

export const SortBySelector = () => {

    const {sortByDraft, setSortByDraft} = useCreateTransactionListStore();
    return (
        <View style = {styles.sortBySelectorContainer}>
            <Text style = {styles.sortByLabel}>Sort By</Text>
            <View style = {styles.filterButtonContainer}>
                <FilterButton
                    label = "📅 Date"
                    onPress = {() => setSortByDraft('TRANSACTION_DATE')}
                    isActive = {sortByDraft === 'TRANSACTION_DATE'}
                />
                <FilterButton
                    label = "💰 Amount"
                    onPress = {() => setSortByDraft('AMOUNT')}
                    isActive = {sortByDraft === 'AMOUNT'}
                />
                <FilterButton
                    label = "🕒 Created At"
                    onPress = {() => setSortByDraft('CREATED_AT')}
                    isActive = {sortByDraft === 'CREATED_AT'}
                />
            </View>
        </View>
    );
};
