import { Text, View, FlatList } from 'react-native';
import { AccountResponse } from '../../types';
import { AccountCard } from '../AccountCard/AccountCard';
import { styles } from './GroupedAccountList.styles';
import { AccountNavigatorProps } from '../../../../navigation/types/AccountNavigatorTypes';

type GroupedAccountListProps = {
    accountGroupName : string,
    accounts : AccountResponse[],
    navigation: AccountNavigatorProps,
}

const SeparatorComponent = () => <View style={styles.separator} />;

export const GroupedAccountList = ({accountGroupName, accounts, navigation} : GroupedAccountListProps) => {
    return (
        <View style = {styles.groupedAccountsContainer}>
            <Text style = {styles.accountGroupTitle}>{accountGroupName}</Text>
            <FlatList
                data = {accounts}
                renderItem = {({item}) => <AccountCard accountItem= {item} navigation = {navigation} />}
                keyExtractor = {(item) => item.accountId}
                showsVerticalScrollIndicator = {false}
                scrollEnabled = {false}
                ItemSeparatorComponent={SeparatorComponent}
            />
        </View>
    );
};
