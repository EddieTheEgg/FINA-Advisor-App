import { Text, View } from 'react-native';
import { AccountResponse } from '../../../accounts/types';
import { TransactionNavigatorProps } from '../../../../navigation/types/TransactionNavigatorTypes';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { styles } from './AccountSelectionCard.styles';
import { capitalizeFirstLetter, truncateText } from '../../../../utils/textFormat';
import { formatBalance } from '../../../../utils/balanceFormat';


type AccountSelectionCardProps = {
    accountItem : AccountResponse,
    navigation: TransactionNavigatorProps,
}

const handleNavToTransactionScreen = () => {
    console.log('Going to transction screen!');
}


export const AccountSelectionCard = ({accountItem, navigation} : AccountSelectionCardProps) => {
    return (
         <AnimatedPressable
            scaleValue={0.9}
            delay={200}
            style = {styles.AccountCardContainer}
            onPress = {handleNavToTransactionScreen}
        >
            <View style = {[styles.iconContainer ,{backgroundColor : accountItem.color}]}>
                <Text style = {styles.iconText}>{accountItem.icon}</Text>
            </View>
            <View style = {styles.accountInfoContainer}>
                <Text style = {styles.accountNameText}>{truncateText(accountItem.name, 13)}</Text>
                <Text style = {styles.accountSubInfoText}>{capitalizeFirstLetter(accountItem.accountType)}</Text>
            </View>
            <View>
                <Text style = {styles.accountBalanceText}>${formatBalance(accountItem.balance)}{'>'}</Text>
            </View>
        </AnimatedPressable>
    )
}