import { View, Text, ScrollView, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './AccountsListScreen.styles';
import { useGroupAccounts } from '../../hooks/useGroupAccounts';
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';
import { NetWorthCard } from '../../components/NetWorthCard/NetWorthCard';
import { GroupedAccountList } from '../../components/GroupedAccountList/GroupedAccountList';
import { AccountNavigatorProps } from '../../../../navigation/types/AccountNavigatorTypes';

export const AccountsListScreen = ({navigation} : {navigation: AccountNavigatorProps}) => {
    const insets = useSafeAreaInsets();
    const {data : groupedAccounts, isPending, error} = useGroupAccounts();

    const { height } = Dimensions.get('window');
    const responsivePadding = height * 0.2;

    if (error) {
        return (
            <ErrorScreen
            errorText = "Failed to load accounts"
            errorSubText = "Please try again later"
            errorMessage = {error.message}
             />
        );
    }

    if (isPending || !groupedAccounts) {
        return (<LoadingScreen />);
    }

    return (
        <ScrollView
            style={[styles.accountBackground, { paddingTop: insets.top }]}
            contentContainerStyle={{
                paddingBottom: insets.bottom + responsivePadding,
            }}
            showsVerticalScrollIndicator={false}
        >
            <View style = {styles.headerContainer}>
                <Text style = {styles.headerAccountTitle}>My Accounts</Text>
            </View>
            <View style = {styles.netWorthCardContainer}>
                <NetWorthCard
                totalNet = {groupedAccounts.totalNet}
                percentChange = {groupedAccounts.percentChange} />
            </View>
            <View style = {styles.accountListContainer}>
                {Object.entries(groupedAccounts.accountGroupsData).map(([accountGroupName, accounts]) => (
                    accounts.length > 0 &&
                        (<GroupedAccountList
                            key={accountGroupName}
                            accountGroupName = {accountGroupName}
                            accounts = {accounts}
                            navigation = {navigation}
                        />)
                ))}
            </View>
        </ScrollView>
    );
};
