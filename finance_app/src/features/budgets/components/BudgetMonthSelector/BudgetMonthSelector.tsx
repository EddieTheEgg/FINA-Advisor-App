import { View, Text, Pressable, Modal } from 'react-native';
import { useCreateBudgetStore } from '../../store/useCreateBudgetStore';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { styles } from './BudgetMonthSelector.styles';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const years = Array.from({ length: 30 }, (_, i) => 2025 - i);


export const BudgetMonthSelector = () => {

    const {budgetMonth, setBudgetMonth} = useCreateBudgetStore();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [tempMonth, setTempMonth] = useState(budgetMonth.getMonth());
    const [tempYear, setTempYear] = useState(budgetMonth.getFullYear());

    const handleSet = () => {
        setBudgetMonth(new Date(tempYear, tempMonth, 1));
        setIsModalVisible(false);
    };

    const handleOpenModal = () => {
        setTempMonth(budgetMonth.getMonth()); // Reset temp to current when opening
        setTempYear(budgetMonth.getFullYear());
        setIsModalVisible(true);
    };

    return (
        <View>
            <View style = {styles.budgetMonthContainer}>
                <Text style={styles.budgetMonthLabel}>Budget Month</Text>
                <AnimatedPressable
                style={styles.budgetMonthTextContainer}
                onPress={handleOpenModal}>
                    <Text style={styles.budgetMonthText}>
                        {months[budgetMonth.getMonth()]} {budgetMonth.getFullYear()}
                    </Text>
                </AnimatedPressable>
            </View>
            <Modal visible={isModalVisible} transparent animationType="slide">
            <View style={styles.modalOverlay}>
                <Pressable style={styles.modalOverlay} onPress={() => setIsModalVisible(false)} />
                <View style={styles.modalContent}>
                    <View style={styles.columns}>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={tempMonth}
                                onValueChange={(itemValue: number) => {
                                    setTempMonth(itemValue);
                                }}
                                style={styles.picker}
                            >
                                {months.map((m, index) => (
                                    <Picker.Item key={m} label={m} value={index} />
                                ))}
                            </Picker>
                        </View>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={tempYear}
                                onValueChange={(itemValue: number) => {
                                    setTempYear(itemValue);
                                }}
                                style={styles.picker}
                            >
                                {years.map((y) => (
                                    <Picker.Item key={y} label={String(y)} value={y} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                    <Pressable style={styles.setButtonContainer} onPress={handleSet}>
                        <Text style={styles.setButtonText}>Set</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
        </View>
    );
};
