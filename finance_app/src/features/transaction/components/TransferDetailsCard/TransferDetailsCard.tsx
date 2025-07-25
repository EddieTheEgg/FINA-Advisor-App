import { View, Text } from 'react-native';
import { TransactionResponse } from '../../types';
import { styles } from './TransferDetailsCard.styles';

type TransferDetailsCardProps = {
    transactionDetails: TransactionResponse;
}

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


export const TransferDetailsCard = ({transactionDetails}: TransferDetailsCardProps) => {
    return (
        <View style = {styles.transferDetailsCardContainer}>
            <Text style = {styles.transferDetailsTitle}>📋 Transfer Details</Text>
            <View style = {styles.transferDetailContainer}>
                <Text style = {styles.transferDetailsLabel}>Date</Text>
                <Text style = {styles.transferDetailInfoText}>{formatDateToDisplay(new Date(transactionDetails.transactionDate))}</Text>
            </View>
            {lineSeperator()}
            <View style = {styles.transferDetailContainer}>
                <Text style = {styles.transferDetailsLabel}>Category</Text>
                <Text style = {styles.transferDetailInfoText}>{transactionDetails.category.categoryName}</Text>
            </View>
            {lineSeperator()}
            <View style = {styles.transferDetailContainer}>
                <Text style = {styles.transferDetailsLabel}>Location</Text>
                <Text style = {styles.transferDetailInfoText}>{transactionDetails.location}</Text>
            </View>
        </View>
    );
};
