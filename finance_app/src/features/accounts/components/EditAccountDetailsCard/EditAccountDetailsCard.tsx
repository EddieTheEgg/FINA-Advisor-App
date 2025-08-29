import {View, Text} from 'react-native';
import { AccountResponse, AccountType } from '../../types';
import { styles } from './EditAccountDetailsCard.styles';
import { EditAccountNameInput } from '../EditAccountNameInput/EditAccountNameInput';
import { formatAccountType } from '../../../../utils/textFormat';
import { EditAccountBankNameInput } from '../EditAccountBankNameInput/EditAccountBankNameInput';
import { EditAccountBalanceInput } from '../EditAccountBalanceInput/EditAccountBalanceInput';
import { EditAccountCreditInputs } from '../EditAccountCreditInputs/EditAccountCreditInputs';

type EditAccountDetailsCardProps = {
    accountDetails: AccountResponse;
}

export const EditAccountDetailsCard = ({accountDetails}: EditAccountDetailsCardProps) => {

    const accountType = accountDetails.accountType;

    return (
        <View style = {styles.cardContainer}>
            <Text style = {styles.cardTitle}>Account Details - {formatAccountType(accountDetails.accountType)}</Text>
            <EditAccountNameInput />
            <EditAccountBankNameInput />
            {accountType !== AccountType.CREDIT_CARD ? <EditAccountBalanceInput /> : <EditAccountCreditInputs />}
        </View>
    );
};
