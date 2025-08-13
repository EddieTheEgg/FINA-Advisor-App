import React, { useState } from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { styles } from './BudgetDashboardMonthSelector.styles';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const years = Array.from({ length: 30 }, (_, i) => 2025 - i);

type BudgetDashboardMonthSelectorProps = {
    selectedMonth: Date;
    setSelectedMonth: (month: Date) => void;
}

export const BudgetDashboardMonthSelector = ({ selectedMonth, setSelectedMonth }: BudgetDashboardMonthSelectorProps) => {
  const [tempMonth, setTempMonth] = useState(selectedMonth.getMonth() + 1);
  const [tempYear, setTempYear] = useState(selectedMonth.getFullYear());
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSet = () => {
    setSelectedMonth(new Date(tempYear, tempMonth - 1, 1));
    setIsModalVisible(false);
  };

  return (
    <View>
        <View>
            <Pressable onPress={() => setIsModalVisible(!isModalVisible)}>
                <View style={styles.monthSelectorContainer}>
                    <Text style = {styles.monthSelectorText}>{months[selectedMonth.getMonth()]} {selectedMonth.getFullYear()}</Text>
                    {isModalVisible ? <FontAwesome6 name="caret-up" size={24} color="black" iconStyle="solid" /> :
                    <FontAwesome6 name="caret-down" size={24} color="black" iconStyle="solid" />
                    }
                </View>
            </Pressable>
        </View>
        <Modal visible={isModalVisible} transparent animationType="slide">
            <View style={styles.modalOverlay}>
                <Pressable style={styles.modalOverlay} onPress={() => setIsModalVisible(false)} />
                <View style={styles.modalContent}>
                    <View style={styles.columns}>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={months[tempMonth - 1]}
                                onValueChange={(itemValue: string) => setTempMonth(months.indexOf(itemValue) + 1)}
                                style={styles.picker}
                            >
                                {months.map((m) => (
                                    <Picker.Item key={m} label={m} value={m} />
                                ))}
                            </Picker>
                        </View>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={tempYear}
                                onValueChange={(itemValue: number) => setTempYear(itemValue)}
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
}
