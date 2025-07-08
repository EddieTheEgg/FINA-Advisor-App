import { View, Text } from 'react-native';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { styles } from './TransactionSubmissionBar.styles';

export const TransactionSubmissionBar = () => {

    const handleTransactionSubmission = () => {
        console.log('Transaction Submitted!');
    };

    return (
          <View style={styles.transactionSubmissionBar}>
            <AnimatedPressable
                style={styles.completeTransactionButton}
                onPress={handleTransactionSubmission}
                scaleValue={0.9}
            >
                <Text style={styles.completeTransactionButtonText}>Create Transaction</Text>
            </AnimatedPressable>
        </View>
    );
};
