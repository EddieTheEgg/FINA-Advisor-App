import { Text, View } from 'react-native';
import { truncateText } from '../../../../../utils/textFormat';
import { formatBalance } from '../../../../../utils/balanceFormat';
import {styles } from './EditSelectedAccountCard.styles';
import { SimpleAccountInfo } from '../../../types';



type SelectedAccountCardProps = {
    accountItem: SimpleAccountInfo | null;
}

export const EditSelectedAccountCard = ({accountItem} : SelectedAccountCardProps) => {

    if (!accountItem) {
        return (
            <View style = {styles.emptyAccountCardContainer}>
                <Text style = {[styles.emptyAccountIcon]}>  ?  </Text>
                    <View style = {styles.accountInfoContainer}>
                        <Text style = {styles.accountName}>Choose An Account</Text>
                        <Text style = {styles.accountBalance}>Avaliable: ???</Text>
                    </View>
                <Text style = {styles.arrowIcon}> {'>'}</Text>
         </View>
        );
    }

  return (
    <View style = {styles.accountCardContainer}>
        <Text style = {[styles.accountIcon, {backgroundColor: accountItem.accountColor}]}>{accountItem.accountIcon}</Text>
        <View style = {styles.accountInfoContainer}>
          <Text style = {styles.accountName}>{truncateText(accountItem.accountName, 15)}</Text>
          <Text style = {styles.accountBalance}>Avaliable: ${formatBalance(accountItem.accountBalance)}</Text>
        </View>
        <Text style = {styles.arrowIcon}> {'>'}</Text>
    </View>
  );
};
