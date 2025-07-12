import { FlatList, Text, View } from 'react-native';
import { TransactionNavigatorProps } from '../../../../navigation/types/TransactionNavigatorTypes';
import { AccountResponse } from '../../../accounts/types';
import { styles } from './AccountSelectionList.styles';
import { AccountSelectionCard } from '../AccountSelectionCard/AccountSelectionCard';



type AccountSelectionListProps = {
    accountGroupName : string,
    accounts : AccountResponse[],
    navigation : TransactionNavigatorProps,
}

const SeparatorComponent = () => <View style={styles.separator} />;
export const AccountSelectionList = ({accountGroupName, accounts, navigation} : AccountSelectionListProps) => {
    return  (
         <View style = {styles.groupedAccountsContainer}>
            <Text style = {styles.accountGroupTitle}>{accountGroupName}</Text>
            <FlatList
                data = {accounts}
                renderItem = {({item}) => (
                    <AccountSelectionCard accountItem = {item} navigation = {navigation} />
                )}
                keyExtractor = {(item) => item.accountId}
                showsVerticalScrollIndicator = {false}
                scrollEnabled = {false}
                ItemSeparatorComponent={SeparatorComponent}
            />
        </View>
    );
};

