import { Animated, Pressable, Text} from 'react-native';
import { styles } from './TransferSubmissionBar.styles';
import { useRef } from 'react';
import { useTransferStore } from '../../store/useTransferStore';
import { TransferSubmission } from '../../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitTransfer } from '../../api/api';
import { useNavigation } from '@react-navigation/native';
import { AccountNavigatorProps } from '../../../../navigation/types/AccountNavigatorTypes';

export const TransferSubmissionBar = () => {
    const navigation = useNavigation<AccountNavigatorProps>();
    const queryClient = useQueryClient();

    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    const {
        fromAccount,
        toAccount,
        amount,
        title,
        note,
        location,
        resetTransfer,
        setTransferError,
        amountError,
        validateTransfer,
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
        // Clear any previous transfer errors
        setTransferError('');
        validateTransfer();

        // Validation checks with specific error messages

        if (fromAccount === null || toAccount === null) {
            return;
        }

        if (amountError) {
            setTransferError('You have missing or invalid fields');
            return;
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
            queryClient.invalidateQueries({ queryKey: ['grouped-accounts'] });
            queryClient.invalidateQueries({ queryKey: ['account-details', fromAccount?.accountId] });
            queryClient.invalidateQueries({ queryKey: ['account-details', toAccount?.accountId] });
            queryClient.invalidateQueries({ queryKey: ['account-transactions', fromAccount?.accountId] });
            queryClient.invalidateQueries({ queryKey: ['account-transactions', toAccount?.accountId] });
            queryClient.invalidateQueries({ queryKey: ['dashboard', month, year] });
            navigation.navigate('AccountsList');
        },
        onError: (error) => {
            console.error('Transfer failed:', error);
            setTransferError(`Transfer failed: ${error.message || 'An unexpected error occurred'}`);
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
