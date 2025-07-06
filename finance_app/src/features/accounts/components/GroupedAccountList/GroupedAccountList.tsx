import { Text, View, FlatList } from 'react-native';
import { AccountResponse } from '../../types';
import { AccountCard } from '../AccountCard/AccountCard';
import { styles } from './GroupedAccountList.styles';
import { AccountNavigatorProps } from '../../../../navigation/types/AccountNavigatorTypes';

type GroupedAccountListProps = {
    accountGroupName : string,
    accounts : AccountResponse[],
    navigation: AccountNavigatorProps,
    transferAccountCard: boolean,
    selectionType?: 'from' | 'to'
}

const SeparatorComponent = () => <View style={styles.separator} />;
export const GroupedAccountList = ({accountGroupName, accounts, navigation, transferAccountCard, selectionType} : GroupedAccountListProps) => {
    return accounts.length > 0 && (
        <View style = {styles.groupedAccountsContainer}>
            <Text style = {styles.accountGroupTitle}>{accountGroupName}</Text>
            <FlatList
                data = {accounts}
                renderItem = {({item}) => (
                    transferAccountCard ? (
                        <AccountCard accountItem= {item} navigation = {navigation} transferAccountCard = {true} selectionType = {selectionType} />
                    ) : (
                        <AccountCard accountItem= {item} navigation = {navigation} transferAccountCard = {false} />
                    )
                )}
                keyExtractor = {(item) => item.accountId}
                showsVerticalScrollIndicator = {false}
                scrollEnabled = {false}
                ItemSeparatorComponent={SeparatorComponent}
            />
        </View>
    );
};
