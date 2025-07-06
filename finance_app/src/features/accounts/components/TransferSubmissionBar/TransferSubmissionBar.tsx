import { Pressable, Text, View } from 'react-native';
import { styles } from './TransferSubmissionBar.styles';

export const TransferSubmissionBar = () => {
    return (
        <View style={styles.transferSubmissionBar}>
            <Pressable style={styles.completeTransferButton}>
                <Text style={styles.completeTransferButtonText}>Complete Transfer</Text>
            </Pressable>
        </View>
    );
};
