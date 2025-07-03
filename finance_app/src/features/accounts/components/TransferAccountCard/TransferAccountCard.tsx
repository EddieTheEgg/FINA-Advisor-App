import { View, Text } from 'react-native';
import { styles } from './TransferAccountCard.styles';
//The transfer account card will either display account info, or nothing which is when emptySelected is true
type TransferAccountCardProps = {
    emptyCard: boolean,
    accountColor?: string,
    accountIcon?: string,
    accountBalance?: number,
    accountName?: string,
}

export const TransferAccountCard = ({accountColor, accountIcon, accountBalance, accountName, emptyCard} : TransferAccountCardProps) => {

    const truncateText = (text: string | undefined, maxLength: number) => {
        if(text === undefined) {
            return;
        }

        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    };
    const formatBalance = (balance: number | undefined) => {
        if (balance === undefined) {
        return '0.00';
        }
    return balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });


};
  return emptyCard ? (
    <View style = {styles.emptyAccountCardContainer}>
       <Text style = {[styles.emptyAccountIcon]}>  ?  </Text>
        <View style = {styles.accountInfoContainer}>
          <Text style = {styles.accountName}>Choose An Account</Text>
          <Text style = {styles.accountBalance}>Avaliable: ???</Text>
        </View>
        <Text style = {styles.arrowIcon}> {'>'}</Text>
    </View>
  ) : (
    <View style = {styles.accountCardContainer}>
        <Text style = {[styles.accountIcon, {backgroundColor: accountColor}]}>{accountIcon}</Text>
        <View style = {styles.accountInfoContainer}>
          <Text style = {styles.accountName}>{truncateText(accountName, 15)}</Text>
          <Text style = {styles.accountBalance}>Avaliable: ${formatBalance(accountBalance)}</Text>
        </View>
        <Text style = {styles.arrowIcon}> {'>'}</Text>
    </View>
  );
};
