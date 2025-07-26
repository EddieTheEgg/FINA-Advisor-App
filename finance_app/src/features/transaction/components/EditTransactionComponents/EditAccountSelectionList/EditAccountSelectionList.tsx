import { FlatList, Text, View } from 'react-native';
import { AccountResponse } from '../../../../accounts/types';
import { styles } from './EditAccountSelectionList.styles';
import { RootNavigationProps } from '../../../../../navigation/types/RootNavigatorTypes';
import { EditAccountSelectionCard } from '../EditAccountSelectionCard/EditAccountSelectionCard';



type EditAccountSelectionListProps = {
    accountGroupName : string,
    accounts : AccountResponse[],
    navigation : RootNavigationProps,
}

const SeparatorComponent = () => <View style={styles.separator} />;
export const EditAccountSelectionList = ({accountGroupName, accounts, navigation} : EditAccountSelectionListProps) => {
    return  (
         <View style = {styles.groupedAccountsContainer}>
            <Text style = {styles.accountGroupTitle}>{accountGroupName}</Text>
            <FlatList
                data = {accounts}
                renderItem = {({item}) => (
                    <EditAccountSelectionCard accountItem = {item} navigation = {navigation} />
                )}
                keyExtractor = {(item) => item.accountId}
                showsVerticalScrollIndicator = {false}
                scrollEnabled = {false}
                ItemSeparatorComponent={SeparatorComponent}
            />
        </View>
    );
};

