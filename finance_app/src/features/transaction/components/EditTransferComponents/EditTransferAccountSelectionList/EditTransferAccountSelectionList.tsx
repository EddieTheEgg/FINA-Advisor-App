import { FlatList, Text, View } from 'react-native';
import { AccountResponse } from '../../../../accounts/types';
import { styles } from './EditTransferAccountSelection.styles';
import { EditTransferAccountSelectionCard } from '../EditTransferAccountSelectionCard/EditTransferAccountSelectionCard';
import { RootNavigationProps } from '../../../../../navigation/types/RootNavigatorTypes';



type EditTransferAccountSelectionListProps = {
    accountGroupName : string,
    accounts : AccountResponse[],
    navigation : RootNavigationProps,
    accountType : 'source' | 'to',
}

const SeparatorComponent = () => <View style={styles.separator} />;
export const EditTransferAccountSelectionList = ({accountGroupName, accounts, navigation, accountType} : EditTransferAccountSelectionListProps) => {
    return  (
         <View style = {styles.groupedAccountsContainer}>
            <Text style = {styles.accountGroupTitle}>{accountGroupName}</Text>
            <FlatList
                data = {accounts}
                renderItem = {({item}) => (
                    <EditTransferAccountSelectionCard
                        accountItem = {item}
                        navigation = {navigation}
                        accountType = {accountType}
                    />
                )}
                keyExtractor = {(item) => item.accountId}
                showsVerticalScrollIndicator = {false}
                scrollEnabled = {false}
                ItemSeparatorComponent={SeparatorComponent}
            />
        </View>
    );
};

