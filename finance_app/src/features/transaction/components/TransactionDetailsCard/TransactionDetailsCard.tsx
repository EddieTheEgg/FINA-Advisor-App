import { View, Text } from 'react-native';
import { TransactionResponse } from '../../types';
import { styles } from './TransactionDetailsCard.styles';

export type TransactionDetailsCardProps = {
    transactionDetails: TransactionResponse;
};

const lineSeperator = () => {
    return (
        <View style = {styles.lineSeperator}/>
    );
};

const formatDateToDisplay = (dateToFormat: Date) => {
    return dateToFormat.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const TransactionDetailsCard = ({transactionDetails}: TransactionDetailsCardProps) => {
    return (
        <View style = {styles.transactionDetailsCardContainer}>
            <Text style = {styles.transactionDetailsTitle}>📋 Transaction Details</Text>
            <View style = {styles.transactionDetailContainer}>
                <Text style = {styles.transactionDetailsLabel}>Account</Text>
                <View style = {styles.accountDetailsContainer}>
                    <Text style = {[styles.iconStyling, {backgroundColor: transactionDetails.sourceAccount.color}]}>{transactionDetails.sourceAccount.icon}</Text>
                    <Text style = {styles.transactionDetailInfoText}>{transactionDetails.sourceAccount.name}</Text>
                </View>
            </View>
            {lineSeperator()}
            <View style = {styles.transactionDetailContainer}>
                <Text style = {styles.transactionDetailsLabel}>Category</Text>
                <View style = {styles.accountDetailsContainer}>
                    <Text style = {[styles.iconStyling, {backgroundColor: transactionDetails.category.color}]}>{transactionDetails.category.icon}</Text>
                    <Text style = {styles.transactionDetailInfoText}>{transactionDetails.category.categoryName}</Text>
                </View>
            </View>
            {lineSeperator()}
            <View style = {styles.transactionDetailContainer}>
                <Text style = {styles.transactionDetailsLabel}>Date</Text>
                <Text style = {styles.transactionDetailInfoText}>{formatDateToDisplay(new Date(transactionDetails.transactionDate))}</Text>
            </View>
            {lineSeperator()}
            <View style = {styles.transactionDetailContainer}>
                <Text style = {styles.transactionDetailsLabel}>Merchant</Text>
                <Text style = {styles.transactionDetailInfoText}>{transactionDetails.merchant || ''}</Text>
            </View>
            {lineSeperator()}
            <View style = {styles.transactionDetailContainer}>
                <Text style = {styles.transactionDetailsLabel}>Location</Text>
                <Text style = {styles.transactionDetailInfoText}>{transactionDetails.location || ''}</Text>
            </View>
        </View>
    );
};
