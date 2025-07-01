import { View, Text, useWindowDimensions, ScrollView, Pressable, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { AccountNavigatorParamList } from '../../../../navigation/types/AccountNavigatorTypes';
import { RouteProp } from '@react-navigation/native';
import { styles } from './TransferScreen.styles';
import GoBackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { TransferAccountCard } from '../../components/TransferAccountCard/TransferAccountCard';
import { useRef } from 'react';


export const TransferScreen = () => {
    const { fromAccountDetails, toAccountDetails } = useRoute<RouteProp<AccountNavigatorParamList, 'Transfer'>>().params;

    const insets = useSafeAreaInsets();
    const dimensions = useWindowDimensions();
    const { height } = dimensions;
    const responsivePaddingTop = insets.top + (height * 0.02);

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


    return (
        <View style = {[styles.transferScreenContainer,{paddingTop: responsivePaddingTop}]}>
            <View style = {styles.headerSection}>
                <GoBackButton />
                <Text style = {styles.headerTitle}>Transfer Money</Text>
            </View>
            <ScrollView>
                <View style = {styles.fromAccountContainer}>
                    <Text style = {styles.fromAccountTitle}>From</Text>
                    <Animated.View style = {{transform: [{scale}]}}>
                        <Pressable
                            onPressIn={onPressIn}
                            onPressOut={onPressOut}>
                            {fromAccountDetails ? (
                            <TransferAccountCard
                                    emptyCard={false}
                                    accountColor = {fromAccountDetails.color}
                                    accountIcon = {fromAccountDetails.icon ?? undefined}
                                    accountBalance = {fromAccountDetails.balance}
                                    accountName = {fromAccountDetails.name}
                            />
                            ) : (
                            <TransferAccountCard emptyCard={true} />
                            )}
                        </Pressable>
                    </Animated.View>
                </View>
            </ScrollView>
        </View>
    );
};
