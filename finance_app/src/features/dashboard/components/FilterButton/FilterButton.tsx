import { View, Text } from 'react-native';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { styles } from './FilterButton.styles.ts';
import React from 'react';

type FilterButtonProps = {
    label: React.ReactNode;
    isActive: boolean;
    onPress: () => void;
}

export const FilterButton = ({label, isActive, onPress}: FilterButtonProps) => {
    return (
        <AnimatedPressable onPress = {onPress}>
            <View style = {[styles.filterButtonContainer, isActive && styles.activeFilterButton]}>
                {typeof label === 'string' ? (
                    <Text style = {[styles.filterButtonLabel, isActive && styles.activeFilterButtonLabel]}>{label}</Text>
                ) : (
                    <View style = {[styles.filterButtonContent]}>
                        {label}
                    </View>
                )}
            </View>
        </AnimatedPressable>
    );
};
