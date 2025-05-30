import { Animated, Pressable, Text } from 'react-native';
import { styles } from './CreateAccountButton.styles';
import { useRef } from 'react';

export default function CreateAccountButton ({ onPress }: { onPress: () => void }) {
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
                >
                    <Text style={styles.buttonText}>Create Account</Text>
                </Pressable>
            </Animated.View>
        );
}

