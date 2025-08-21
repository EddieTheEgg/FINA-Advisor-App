import React, {useState, useCallback} from 'react';
import {View, Text, Modal, ScrollView} from 'react-native';
import { styles } from './CategoryColorCard.styles';
import { colors } from '../../../../styles/colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { fontSize } from '../../../../styles/fontSizes';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { COLOR_CATEGORIES } from '../../store/colorOptions';
import { useCreateCategoryStore } from '../../store/useCreateCategoryStore';

const ColorButton = React.memo(({
    color,
    isSelected,
    onPress,
}: {
    color: string;
    isSelected: boolean;
    onPress: (color: string) => void;
}) => (
    <AnimatedPressable
        style={[styles.colorButton, { backgroundColor: color }, isSelected && styles.selectedColor]}
        onPress={() => onPress(color)}
    >
        {isSelected && (
            <FontAwesome6 name="check" size={fontSize.sm} color={colors.white} />
        )}
    </AnimatedPressable>
));

const ColorSection = React.memo(({
    category,
    colors: colorArray,
    selectedColor,
    onColorSelect,
}: {
    category: string;
    colors: readonly string[];
    selectedColor: string;
    onColorSelect: (color: string) => void;
}) => (
    <View style={styles.colorSection}>
        <Text style={styles.categoryTitle}>{category}</Text>
        <View style={styles.colorGrid}>
            {colorArray.map((color, index) => (
                <ColorButton
                    key={`${category}-${index}`}
                    color={color}
                    isSelected={selectedColor === color}
                    onPress={onColorSelect}
                />
            ))}
        </View>
    </View>
));

export const CategoryColorCard = () => {
    const {categoryColor, setCategoryColor} = useCreateCategoryStore();
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [isModalReady, setIsModalReady] = useState(false);

    const handleColorSelect = () => {
        setShowColorPicker(true);
        setTimeout(() => setIsModalReady(true), 100);
    };

    const handleColorPick = useCallback((color: string) => {
        setCategoryColor(color);
        setShowColorPicker(false);
        setIsModalReady(false);
    }, [setCategoryColor]);

    const handleCloseModal = () => {
        setShowColorPicker(false);
        setIsModalReady(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Category Color</Text>
            <AnimatedPressable
                style={styles.colorSelectContainer}
                onPress={handleColorSelect}
            >
                <View style={[styles.colorPreview, {backgroundColor: categoryColor}]} />
                <View style={styles.colorDescriptionContainer}>
                    <Text style={styles.colorDescriptionTitle}>Choose Color</Text>
                    <Text style={styles.colorDescriptionText}>Tap to select color</Text>
                </View>
                <FontAwesome6 name="chevron-right" size={fontSize.base} color={colors.black} />
            </AnimatedPressable>

            <Modal
                visible={showColorPicker}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Select Category Color</Text>
                        <AnimatedPressable onPress={handleCloseModal} style={styles.closeButton}>
                            <FontAwesome6 name="xmark" size={fontSize.lg} color={colors.black} />
                        </AnimatedPressable>
                    </View>

                    {!isModalReady ? (
                        <View style={styles.loadingContainer}>
                            <Text style={styles.loadingText}>Loading colors...</Text>
                        </View>
                    ) : (
                        <ScrollView
                            style={styles.colorContainer}
                            showsVerticalScrollIndicator={false}
                            removeClippedSubviews={true}
                        >
                            {Object.entries(COLOR_CATEGORIES).map(([category, colorArray]) => (
                                <ColorSection
                                    key={category}
                                    category={category}
                                    colors={colorArray}
                                    selectedColor={categoryColor}
                                    onColorSelect={handleColorPick}
                                />
                            ))}
                        </ScrollView>
                    )}
                </View>
            </Modal>
        </View>
    );
};
