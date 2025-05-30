import { Animated, Pressable } from 'react-native';
import React, { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const BackButton = () => {
    const navigation = useNavigation();
    const animation = useRef(new Animated.Value(0)).current;
    const scale = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.8],
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
        <Animated.View style={[{ transform: [{ scale }] }]}>
            <Pressable
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                onPress={() => navigation.goBack()}>
                <FontAwesome6 name="arrow-left" size={24} color="black" solid />
            </Pressable>
        </Animated.View>
    );
};

export default BackButton;

