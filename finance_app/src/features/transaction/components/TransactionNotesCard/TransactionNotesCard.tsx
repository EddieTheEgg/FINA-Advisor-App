import { View, Text } from 'react-native';
import { styles } from './TransactionNotesCard.styles';

export type TransactionNotesCardProps = {
    transactionNotes: string;
};

export const TransactionNotesCard = ({transactionNotes}: TransactionNotesCardProps) => {
    return (
        <View style = {styles.transactionNotesCardContainer}>
            <Text style = {styles.transactionNotesTitle}>📝 Notes</Text>
            <Text style = {styles.transactionNotesText}>{transactionNotes}</Text>
        </View>
    );
};
