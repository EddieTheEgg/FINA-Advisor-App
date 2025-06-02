import React, { useRef } from 'react';
import { styles } from './SignInButton.styles';
import { Pressable, Text, Animated } from 'react-native';

export default function SignInButton({ onPress, disabled }: { onPress: () => void, disabled: boolean }) {
    const animation = useRef(new Animated.Value(0)).current;
    const scale = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.9],
    });

    const onPressIn = () => {
        Animated.spring(animation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressOut = () => {
        setTimeout(() => {
            Animated.spring(animation, {
                toValue: 0,
                useNativeDriver: true,
            }).start();
        }, 200);
    };

    return (
        <Animated.View style={[styles.container, { transform: [{ scale }] }]}>
            <Pressable
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                onPress={onPress}
                disabled={disabled}
            >
                <Text style={styles.buttonText}>Sign In</Text>
            </Pressable>
        </Animated.View>
    );
}

