import React, {useState, useMemo, useCallback} from 'react';
import {View, Text, Modal, ScrollView, TextInput} from 'react-native';
import { styles } from './EditCategoryIcon.styles';
import { useEditCategoryStore } from '../../store/editCategoryStore';
import { colors } from '../../../../styles/colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { fontSize } from '../../../../styles/fontSizes';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { CATEGORY_ICONS } from '../../store/categoryIcons';
import { LoadingDots } from '../../../../components/LoadingDots/LoadingDots';

// Only re-render if the emoji changes via being selected or unselected
const EmojiButton = React.memo(({
    emoji,
    isSelected,
    onPress,
}: {
    emoji: string;
    isSelected: boolean;
    onPress: (emoji: string) => void;
}) => (
    <AnimatedPressable
        style={[styles.emojiButton, isSelected && styles.selectedEmoji]}
        onPress={() => onPress(emoji)}
    >
        <Text style={styles.emojiText}>{emoji}</Text>
    </AnimatedPressable>
));

// Only re-render if the any of the emojis change really, usually via selections
// React.memo caches the component
const CategorySection = React.memo(({
    category,
    emojis,
    selectedEmoji,
    onEmojiSelect,
}: {
    category: string;
    emojis: readonly string[];
    selectedEmoji: string;
    onEmojiSelect: (emoji: string) => void;
}) => (
    <View style={styles.categorySection}>
        <Text style={styles.categoryTitle}>{category}</Text>
        <View style = {styles.divider} />
        <View style={styles.emojiGrid}>
            {emojis.map((emoji, index) => (
                <EmojiButton
                    key={`${category}-${index}`}
                    emoji={emoji}
                    isSelected={selectedEmoji === emoji}
                    onPress={onEmojiSelect}
                />
            ))}
        </View>
    </View>
));

export const EditCategoryIcon = () => {
    const {categoryIconDraft, categoryColorDraft, setCategoryIconDraft} = useEditCategoryStore();
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalReady, setIsModalReady] = useState(false);

    //Filtering emojis based on search query (Run this only when the search query changes)
    //Cache the result of this function so that it doesn't rerender every time the search query changes
    //React useMemo caches a value, NOT A COMPONENT
    const filteredEmojis = useMemo(() => {
        // If the search query is empty do not filter emojis, just return all emojis
        if (!searchQuery.trim()) {
            return CATEGORY_ICONS;
        }

        const query = searchQuery.toLowerCase();
        return Object.entries(CATEGORY_ICONS).reduce((acc, [category, emojis]) => {
            if (category.toLowerCase().includes(query)) {
                acc[category] = emojis;
            }
            return acc;
        }, {} as Record<string, readonly string[]>);
    }, [searchQuery]);

    const openEmojiPickerModal = () => {
        setShowEmojiPicker(true);
        setTimeout(() => setIsModalReady(true), 100); //100ms is the sweet spot for the modal to load the emojis
    };

    const handleEmojiSelect = useCallback((emoji: string) => {
        setCategoryIconDraft(emoji);
        setShowEmojiPicker(false);
        setSearchQuery('');
        setIsModalReady(false);
    }, [setCategoryIconDraft]); //This function is stable, so it's technically not needed but good practice

    const handleCloseModal = () => {
        setShowEmojiPicker(false);
        setSearchQuery('');
        setIsModalReady(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Category Icon</Text>
            <AnimatedPressable
                style={styles.iconSelectContainer}
                onPress={openEmojiPickerModal}
            >
                <Text style={[styles.iconSelectText, {backgroundColor: categoryColorDraft}]}>
                    {categoryIconDraft}
                </Text>
                <View style={styles.iconDescriptionContainer}>
                    <Text style={styles.iconDescriptionTitle}>Choose Icon</Text>
                    <Text style={styles.iconDescriptionText}>Tap to select emoji</Text>
                </View>
                <FontAwesome6 name="chevron-right" size={fontSize.base} color={colors.black} />
            </AnimatedPressable>

            <Modal
                visible={showEmojiPicker}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Select Category Icon</Text>
                        <AnimatedPressable onPress={handleCloseModal} style={styles.closeButton}>
                            <FontAwesome6 name="xmark" size={fontSize.lg} color={colors.black} />
                        </AnimatedPressable>
                    </View>

                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search categories..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholderTextColor={colors.gray[500]}
                    />

                    {!isModalReady ? (
                        <View style={styles.loadingContainer}>
                            <LoadingDots style={styles.loadingText} loadingText="Loading emojis" />
                        </View>
                    ) : (
                        <ScrollView
                            style={styles.emojiContainer}
                            showsVerticalScrollIndicator={false}
                            removeClippedSubviews={true} // Unmounts emojiis that are not visible
                        >
                            {Object.entries(filteredEmojis).map(([category, emojis]) => (
                                <CategorySection
                                    key={category}
                                    category={category}
                                    emojis={emojis}
                                    selectedEmoji={categoryIconDraft}
                                    onEmojiSelect={handleEmojiSelect}
                                />
                            ))}
                        </ScrollView>
                    )}
                </View>
            </Modal>
        </View>
    );
};

