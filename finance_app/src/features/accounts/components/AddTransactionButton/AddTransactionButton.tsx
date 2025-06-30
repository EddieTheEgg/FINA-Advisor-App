import { Text, Pressable, Animated } from 'react-native';
import { styles } from './AddTransactionButton.styles';
import { AccountNavigatorProps } from '../../../../navigation/types/AccountNavigatorTypes';
import { useRef } from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { colors } from '../../../../styles/colors';


type AddTransactionButtonProps = {
    navigation: AccountNavigatorProps;
}

export const AddTransactionButton = ({navigation} : AddTransactionButtonProps) => {

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

    const navigateToCreateTransactionScreen = () => {
      navigation.getParent()?.navigate('Transactions');
    };

    return (
        <Animated.View style={{transform: [{scale}]}}>
            <Pressable
                onPress={navigateToCreateTransactionScreen}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                style={styles.actionButton}>
                <FontAwesome6 name="plus" size={20} color={colors.gray[700]} />
                <Text style={styles.actionText}>Add{'\n'}Transaction</Text>
            </Pressable>
        </Animated.View>
    );
};
