import {View, Text} from 'react-native';
import { AccountResponse } from '../../types';
import { formatAccountType } from '../../../../utils/textFormat';
import { styles } from './EditAccountTypeCard.styles';

type EditAccountTypeCardProps = {
    accountDetails: AccountResponse;
}

export const EditAccountTypeCard = ({accountDetails}: EditAccountTypeCardProps) => {
    return (
        <View style = {styles.container}>
            <Text style = {styles.accountTypeTitle}>Account Type</Text>
            <View style = {styles.accountTypeContainer}>
                <Text style = {[styles.accountTypeIcon, {backgroundColor: accountDetails.color}]}>{accountDetails.icon}</Text>
                <View style = {styles.accountTypeTextContainer}>
                    <Text style = {styles.accountTypeText}>{formatAccountType(accountDetails.accountType)}</Text>
                    <Text style = {styles.accountSubTypeText}>Cannot be changed</Text>
                </View>
                <Text style = {styles.accountTypeLockIcon}>🔒</Text>
            </View>
            <Text style = {styles.accountTypeDescription}>Account type is locked to preserve transaction categorizaiton and financial calculations.</Text>
        </View>
    );
};
