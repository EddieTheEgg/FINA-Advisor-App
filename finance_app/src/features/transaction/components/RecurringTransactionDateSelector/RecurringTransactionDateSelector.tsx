import React, { useState } from 'react';
import { Text, View, Pressable, Modal } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { styles } from './RecurringTransactionDateSelector.styles.ts';
import { colors } from '../../../../styles/colors';
import { fontSize } from '../../../../styles/fontSizes';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

type RecurringTransactionDateSelectorProps = {
    onDateSelect: (date: Date) => void;
    title: string;
    value: Date | null;
};

export const RecurringTransactionDateSelector = ({ onDateSelect, title, value }: RecurringTransactionDateSelectorProps) => {
    const [showCalendar, setShowCalendar] = useState(false);

    // Format date for display ex.) Date -> Sunday, July 14, 2025
    const formatDateToDisplay = (dateToFormat: Date | null) => {
        if (!dateToFormat) {
            return '';
        }
        return dateToFormat.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    // Format date for calendar ex.) Date -> 2025-07-14
    const formatDateForCalendar = (dateToFormat: Date | null) => {
        if (!dateToFormat) {
            return '';
        }
        return dateToFormat.toISOString().split('T')[0];
    };

    // Handle date select from calendar via local timezone
    const handleDateSelect = (day: DateData) => {
        const [year, month, dayNum] = day.dateString.split('-').map(Number);
        const selectedDate = new Date(year, month - 1, dayNum);
        onDateSelect(selectedDate);
        setShowCalendar(false);
    };

    const today = new Date();
    const currentDate = value;
    const selectedDate = formatDateForCalendar(currentDate);

    return (
        <View style={styles.dateCard}>
            <View style={styles.dateHeader}>
                <Text style={styles.dateTitle}>{title}</Text>
            </View>
            <Pressable
                style={styles.dateDisplayContainer}
                onPress={() => setShowCalendar(true)}
            >
                <Text style={styles.dateDisplayText}>
                    {formatDateToDisplay(currentDate)}
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
                            <Text style={styles.modalTitle}>Select {title}</Text>
                            <Pressable style={styles.modalButton} onPress={() => setShowCalendar(false)}>
                                <Text style={styles.modalButtonText}>Done</Text>
                            </Pressable>
                        </View>
                        <Calendar
                            current={selectedDate}
                            showSixWeeks={false}
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
