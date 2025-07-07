import { Animated, Pressable, Text} from 'react-native';
import { styles } from './TransferSubmissionBar.styles';
import { useRef } from 'react';
import { useTransferStore } from '../../store/useTransferStore';
import { TransferSubmission } from '../../types';
import { useMutation } from '@tanstack/react-query';
import { submitTransfer } from '../../api/api';

export const TransferSubmissionBar = () => {

    const {
        fromAccount,
        toAccount,
        amount,
        title,
        note,
        location,
        amountError,
        resetTransfer,
    } = useTransferStore();

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
        });
    };

    const handleTransferSubmission = async() => {
        if (amountError || fromAccount === null || toAccount === null) {
            return; //TODO: Show error message
        }

        const transferSubmissionData : TransferSubmission = {
            fromAccount: fromAccount.accountId,
            toAccount: toAccount.accountId,
            amount,
            title,
            note,
            location,
        };

        mutate(transferSubmissionData);
    };

    const {mutate} = useMutation({
        mutationFn: async (transferSubmissionData: TransferSubmission) => {
            return await submitTransfer(transferSubmissionData);
        },
        onSuccess: () => {
            console.log('Transfer successful!');
            resetTransfer();
        },
        onError: (error) => {
            console.error('Transfer failed:', error);
        },
    });

    return (
        <Animated.View style={[styles.transferSubmissionBar, { transform: [{ scale }] }]}>
            <Pressable style={styles.completeTransferButton}
                onPressIn = {onPressIn}
                onPressOut = {onPressOut}
                onPress = {handleTransferSubmission}
            >
                <Text style={styles.completeTransferButtonText}>Complete Transfer</Text>
            </Pressable>
        </Animated.View>
    );
};
