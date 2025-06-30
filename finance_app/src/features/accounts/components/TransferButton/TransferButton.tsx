import { Text, Pressable, Animated } from 'react-native';
import { styles } from './TransferButton.styles';
import { AccountResponse } from '../../types';
import { AccountNavigatorProps } from '../../../../navigation/types/AccountNavigatorTypes';
import { useRef } from 'react';


type TransferButtonProps = {
    thisAccountDetails: AccountResponse;
    navigation: AccountNavigatorProps;
}

export const TransferButton = ({thisAccountDetails, navigation}: TransferButtonProps) => {

    const animation = useRef(new Animated.Value(0)).current;
    const scale = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [1,0.9],
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
        }, 200); // 200ms delay to ensure the animation is smooth
    };

    const navigateToTransferScreen = () => {
      navigation.navigate('Transfer', {thisAccountDetails});
    };

    return (
        <Animated.View style={{transform: [{scale}]}}>
            <Pressable
            onPress={navigateToTransferScreen}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={styles.actionButton}>
                <Text>🔁</Text>
                <Text style={styles.actionText}>Transfer</Text>
            </Pressable>
        </Animated.View>
    );
};
