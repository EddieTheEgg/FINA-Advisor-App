import { Text, View } from 'react-native';
import { truncateText } from '../../../../utils/textFormat';
import { formatBalance } from '../../../../utils/balanceFormat';
import {styles } from './SelectedAccountCard.styles';



type SelectedAccountCardProps = {
    emptyCard: boolean,
    accountColor?: string,
    accountIcon?: string,
    accountBalance?: number,
    accountName?: string,
}

export const SelectedAccountCard = ({accountColor, accountIcon, accountBalance, accountName, emptyCard} : SelectedAccountCardProps) => {
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
