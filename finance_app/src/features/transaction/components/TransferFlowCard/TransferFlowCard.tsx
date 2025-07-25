import { View, Text } from 'react-native';
import { TransactionResponse } from '../../types';
import { styles } from './TransferFlowCard.styles';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { colors } from '../../../../styles/colors';

type TransferFlowCardProps = {
    transactionDetails: TransactionResponse;
}

export const TransferFlowCard = ({transactionDetails}: TransferFlowCardProps) => {
    return (
        <View style={styles.transferFlowMainContainer}>
            <Text style={styles.transferFlowTitle}>🔄 Transfer Flow</Text>
            <View style={styles.transferFlowContainer}>
                <View style={styles.transferAccountContainer}>
                    <Text style={[styles.transferAccountIcon, {backgroundColor: transactionDetails.accountColor}]}>
                        {transactionDetails.accountIcon}
                    </Text>
                    <Text style={styles.transferAccountName}>{transactionDetails.accountName}</Text>
                </View>
                <View style={styles.arrowContainer}>
                    <FontAwesome6 name="arrow-right" size={24} color={colors.darkerBackground} iconStyle="solid" />
                </View>
                <View style={styles.transferAccountContainer}>
                    <Text style={[styles.transferAccountIcon, {backgroundColor: transactionDetails.toAccountColor || transactionDetails.accountColor}]}>
                        {transactionDetails.toAccountIcon || transactionDetails.accountIcon}
                    </Text>
                    <Text style={styles.transferAccountName}>{transactionDetails.toAccountName || 'Unknown Account'}</Text>
                </View>
            </View>
        </View>
    );
};
