import React, { useState } from 'react';
import { Text, View, Pressable, Modal } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { styles } from './DateCard.styles';
import { useCreateTransactionStore } from '../../store/useTransactionStore';
import { colors } from '../../../../styles/colors';
import { fontSize } from '../../../../styles/fontSizes';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

export const DateCard = () => {
    const { date, setDate } = useCreateTransactionStore();
    const [showCalendar, setShowCalendar] = useState(false);

    // Format date for display ex.) Date -> Sunday, July 14, 2025
    const formatDateToDisplay = (dateToFormat: Date) => {
        return dateToFormat.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    // Format date for calendar ex.) Date -> 2025-07-14
    const formatDateForCalendar = (dateToFormat: Date) => {
        return dateToFormat.toISOString().split('T')[0];
    };

    // handle date select from calendar via local timezone
    const handleDateSelect = (day: DateData) => {
        const [year, month, dayNum] = day.dateString.split('-').map(Number); // ["2025", "07", "14"] -> [2025, 7, 14]
        const selectedDate = new Date(year, month - 1, dayNum); // 2025-07-14 -> 2025-07-14:00:00:00
        setDate(selectedDate);
        setShowCalendar(false);
    };

    const today = new Date();
    const maxDate = formatDateForCalendar(today);
    const selectedDate = formatDateForCalendar(date);

    return (
        <View style={styles.dateCard}>
            <View style={styles.dateHeader}>
                <Text style={styles.dateTitle}>Transaction Date</Text>
            </View>
            <Pressable
                style={styles.dateDisplayContainer}
                onPress={() => setShowCalendar(true)}
            >
                <Text style={styles.dateDisplayText}>
                    {formatDateToDisplay(date)}
                </Text>
                <FontAwesome6 name="calendar-days" size={fontSize.lg} color={colors.black} />
            </Pressable>

            <Modal
                visible={showCalendar}
                transparent
                animationType="fade"
                onRequestClose={() => setShowCalendar(false)}
            >
                <Pressable style={styles.modalOverlay} onPress={() => setShowCalendar(false)}>
                    <View style={styles.calendarModalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Select Date</Text>
                            <Pressable style={styles.modalButton} onPress={() => setShowCalendar(false)}>
                                <Text style={styles.modalButtonText}>Done</Text>
                            </Pressable>
                        </View>
                        <Calendar
                            current={selectedDate}
                            showSixWeeks = {false}
                            markedDates={{
                                [selectedDate]: {
                                    selected: true,
                                    selectedColor: colors.darkerBackground,
                                    selectedTextColor: colors.white,
                                },
                                [today.toISOString().split('T')[0]]: {
                                    marked: true,
                                    dotColor: colors.darkerBackground,
                                },
                            }}
                            onDayPress={handleDateSelect}
                            maxDate={maxDate}
                            theme={{
                                backgroundColor: colors.gray[500],
                                textDisabledColor: colors.gray[300],
                                arrowColor: colors.darkerBackground,
                                textMonthFontWeight: 700,
                                textMonthFontSize: fontSize.xl,
                                textMonthFontFamily: 'Poppins-SemiBold',
                                textDayFontWeight: 500,
                                textDayFontSize: fontSize.lg,
                                textDayFontFamily: 'Poppins-Regular',
                                todayTextColor: colors.darkerBackground,
                            }}
                        />
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
};
