import { View, Text, Modal, Dimensions, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './FilterTransactionsModal.styles';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { SortBySelector } from '../SortBySelector/SortBySelector';
import { SortOrderSelector } from '../SortOrderSelector/SortOrderSelector';
import { AccountFilterSelector } from '../AccountFilterSelector/AccountFilterSelector';
import { CategoryFilterSelector } from '../CategoryFilterSelector/CategoryFilterSelector';
import { TransactionListResponse } from '../../types';
import { useCreateTransactionListStore } from '../../store/useTransactionListStore';

type FilterTransactionsModalProps = {
    visible: boolean;
    onRequestClose: () => void;
    onApplyFilters: () => void;
    data: TransactionListResponse;
};

export const FilterTransactionsModal = ({visible, onRequestClose, onApplyFilters, data}: FilterTransactionsModalProps) => {

    const insets = useSafeAreaInsets();
    const screenHeight = Dimensions.get('window').height;

    const {clearAllDraftFilters} = useCreateTransactionListStore();

    //Clears all draft filters (not the actual filters, until applied)
    const handleClearAllDraftFilters = () => {
        clearAllDraftFilters();
    };

    return (
        <Modal
            visible = {visible}
            onRequestClose = {onRequestClose}
            transparent = {true}
            animationType = "fade"
        >
            {/* Overlay background */}
            <View style={styles.overlay}>
                {/* Modal content container - 3/4 of screen height */}
                <View style={[
                    styles.modalContent,
                    {
                        height: screenHeight * 0.75,
                        paddingBottom: insets.bottom,
                    },
                    ]}>
                    <View style = {styles.modalHeader}>
                        <Text style = {styles.modalHeaderTitle}>Filter Transactions</Text>
                        <AnimatedPressable onPress = {onRequestClose}>
                            <FontAwesome6 name="xmark" size={24} color="black" />
                        </AnimatedPressable>
                    </View>
                    <ScrollView
                        style = {styles.modalBody}
                        showsVerticalScrollIndicator = {false}
                    >
                        <SortBySelector />
                        <SortOrderSelector />
                        <AccountFilterSelector />
                        <CategoryFilterSelector data = {data?.possibleCategories || []} />
                    </ScrollView>
                    <View style = {styles.modalFooter}>
                        <AnimatedPressable
                            style = {styles.clearAllButton}
                            onPress = {handleClearAllDraftFilters}
                        >
                            <Text style = {styles.clearAllButtonText}>Reset Filters</Text>
                        </AnimatedPressable>
                        <AnimatedPressable
                            style = {styles.applyFiltersButton}
                            onPress = {onApplyFilters}
                        >
                            <Text style = {styles.applyFiltersButtonText}>Apply Filters</Text>
                        </AnimatedPressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
