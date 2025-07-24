import { View, Text } from 'react-native';
import { TransactionResponse } from '../../types';
import { styles } from './TransactionSubscriptionCard.styles';

type SubscriptionCardProps = {
    transactionDetails: TransactionResponse;
};

export const TransactionSubscriptionCard = ({transactionDetails}: SubscriptionCardProps) => {

    const formatDateToDisplay = (dateToFormat: Date | null) => {
        if (!dateToFormat) {
            return 'None';
        }

        return dateToFormat.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };


    return (
       <View style = {styles.subscriptionContainer}>
            <Text style = {styles.subscriptionTitle}> 🔄 Recurring Transaction</Text>
            <View style = {styles.subscriptionDetailsContainer}>
                <Text style = {styles.subscriptionFrequencyText}>{transactionDetails.subscriptionFrequency} Subscription</Text>
                <Text style = {styles.subDescription}>Start Date: {formatDateToDisplay(transactionDetails.subscriptionStartDate)}</Text>
                <Text style = {styles.subDescription}>End Date: {formatDateToDisplay(transactionDetails.subscriptionEndDate)}</Text>
                <Text style = {styles.subDescription}>Next: {formatDateToDisplay(transactionDetails.subscriptionNextPaymentDate)}</Text>
            </View>
       </View>
    );
};
