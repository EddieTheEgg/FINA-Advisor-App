import { View, Text } from 'react-native';
import { AccountResponse } from '../../types';
import { styles } from './EditAccountSummaryCard.styles';
import { formatBalance } from '../../../../utils/balanceFormat';
import { formatAccountType } from '../../../../utils/textFormat';

type EditAccountSummaryCardProps = {
    accountDetails: AccountResponse;
}
export const EditAccountSummaryCard = ({accountDetails}: EditAccountSummaryCardProps) => {
    return(
        <View style = {styles.cardContainer}>
            <Text style = {[styles.accountIcon, {backgroundColor: accountDetails.color}]}>{accountDetails.icon}</Text>
            <Text style = {styles.accountBalance}>${formatBalance(accountDetails.balance)}</Text>
            <Text style = {styles.accountTypeName}>{formatAccountType(accountDetails.accountType)} Account</Text>
        </View>
    );
};
