import { View, Text, ScrollView, Pressable, Animated, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { AccountNavigatorParamList } from '../../../../navigation/types/AccountNavigatorTypes';
import { RouteProp } from '@react-navigation/native';
import { styles } from './TransferScreen.styles';
import GoBackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { TransferAccountCard } from '../../components/TransferAccountCard/TransferAccountCard';
import { useRef, useState } from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { colors } from '../../../../styles/colors';
import { TransferAmountCard } from '../../components/TransferAmountCard/TransferAmountCard';


export const TransferScreen = () => {
    const { fromAccountDetails, toAccountDetails } = useRoute<RouteProp<AccountNavigatorParamList, 'Transfer'>>().params;
    const [transferAmount, setTransferAmount] = useState<number>(0.00);
    const [transferAmountError, setTransferAmountError] = useState<string>('');

    const handleAmountChange = (amount: string) => {
        // Handle empty input
        if (amount === '' || amount === '.') {
            setTransferAmount(0.00);
            setTransferAmountError('');
            return;
        }

        // Validate numeric input and prevent NaN
        const amountNumber = parseFloat(amount);
        if (isNaN(amountNumber) || amountNumber < 0) {
            return;
        }

        setTransferAmount(amountNumber);

        // For error messages
        if (!fromAccountDetails || !toAccountDetails) {
            setTransferAmountError('You need to choose a source and destination account for the transfer!');
        } else if (amountNumber > fromAccountDetails.balance) {
            setTransferAmountError('Insufficient funds from source account!');
        } else {
            setTransferAmountError('');
        }
    };

    const insets = useSafeAreaInsets();
    const { height } = Dimensions.get('window');
    const responsivePadding = height * 0.2;
    const responsivePaddingTop = insets.top + (height * 0.02);

    const animation = useRef(new Animated.Value(0)).current;
    const animation2 = useRef(new Animated.Value(0)).current;
    const scale = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [1,0.9],
    });
    const scale2 = animation2.interpolate({
        inputRange: [0, 1],
        outputRange: [1,0.9],
    });

    const onPressIn = () => {
        Animated.spring(animation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressIn2 = () => {
        Animated.spring(animation2, {
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

    const onPressOut2 = () => {
        setTimeout(() => {
            Animated.spring(animation2, {
                toValue: 0,
                useNativeDriver: true,
            }).start();
        }, 200); // 200ms delay to ensure the animation is smooth
    };


    return (
        <KeyboardAvoidingView
            style = {styles.keyboardAvoidingView}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style = {[styles.transferScreenContainer,{paddingTop: responsivePaddingTop}]}>
                <View style = {styles.headerSection}>
                    <GoBackButton />
                    <Text style = {styles.headerTitle}>Transfer Money</Text>
                </View>
                <ScrollView
                    contentContainerStyle = {{paddingBottom: insets.bottom + responsivePadding}}>
                    <View style = {styles.accountToFromContainer}>
                        <Text style = {styles.accountToFromTitle}>From</Text>
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
                    <View style = {styles.downArrowContainer}>
                        <FontAwesome6 name="arrow-down" size = {24} color = {colors.darkerBackground} />
                    </View>
                    <View style = {styles.accountToFromContainer}>
                        <Text style = {styles.accountToFromTitle}>To</Text>
                        <Animated.View style = {{transform: [{scale: scale2}]}}>
                            <Pressable
                                onPressIn={onPressIn2}
                                onPressOut={onPressOut2}>
                                {toAccountDetails ? (
                                <TransferAccountCard
                                        emptyCard={false}
                                        accountColor = {toAccountDetails.color}
                                        accountIcon = {toAccountDetails.icon ?? undefined}
                                        accountBalance = {toAccountDetails.balance}
                                        accountName = {toAccountDetails.name}
                                />
                                ) : (
                                <TransferAccountCard emptyCard={true} />
                                )}
                            </Pressable>
                        </Animated.View>
                    </View>
                    <View style = {styles.transferAmountCardContainer}>
                        <TransferAmountCard
                            amount = {transferAmount}
                            onAmountChange = {handleAmountChange}
                            error = {transferAmountError}
                        />
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
};
