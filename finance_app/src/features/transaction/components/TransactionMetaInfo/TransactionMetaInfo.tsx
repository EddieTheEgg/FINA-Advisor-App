import { View, Text } from 'react-native';
import { TransactionResponse } from '../../types';
import { styles } from './TransactionMetaInfo.styles';



type TransactionMetaInfoProps = {
    transactionDetails  : TransactionResponse;
    title : string;
}


export const TransactionMetaInfo = ({transactionDetails, title} : TransactionMetaInfoProps) => {
    const formatDateTimeToDisplay = (date: Date | null) => {
        if (!date) {
            return 'Never';
        }

        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <View style = {styles.transactionInfoContainer}>
            <Text style = {styles.transactionInfoTitle}>{title}</Text>
            <View style = {styles.divider} />
            <View style = {styles.transactionInfoRowContainer}>
                <Text style = {styles.transactionInfoLabel}>Created</Text>
                <Text style = {styles.transactionInfoValue}>{formatDateTimeToDisplay(transactionDetails.createdAt)}</Text>
            </View>
            <View style = {styles.transactionInfoRowContainer}>
                <Text style = {styles.transactionInfoLabel}>Last Modified</Text>
                <Text style = {styles.transactionInfoValue}>{formatDateTimeToDisplay(transactionDetails.updatedAt)}</Text>
            </View>
        </View>
    );
};
