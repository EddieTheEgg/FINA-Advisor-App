import { Dimensions, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GoBackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { AccountNavigatorParamList, AccountNavigatorProps } from '../../../../navigation/types/AccountNavigatorTypes';
import { RouteProp } from '@react-navigation/native';
import { useGroupAccounts } from '../../hooks/useGroupAccounts';
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';
import { GroupedAccountList } from '../../components/GroupedAccountList/GroupedAccountList';
import { styles } from './TransferAccountSelectionScreen.styles';

type TransferAccountSelectionScreenProps = {
    route: RouteProp<AccountNavigatorParamList, 'TransferAccountSelection'>
    navigation: AccountNavigatorProps
}

export const TransferAccountSelectionScreen = ({route, navigation} : TransferAccountSelectionScreenProps) => {
    const insets = useSafeAreaInsets();
    const {selectionType} = route.params;

    const { height } = Dimensions.get('window');
    const responsivePadding = height * 0.2;

    const  {data: groupedAccounts, isPending, error} = useGroupAccounts();


    if(isPending || !groupedAccounts) {
        return (
            <LoadingScreen />
        );
    }

    if (error) {
        return(
            <ErrorScreen
                errorText={'Error fetching grouped accounts!'}
                errorSubText={'Please try again later or refresh the app!'}
                errorMessage={error.message}
            />
        );
    }



    return (
        <ScrollView
            style = {[styles.transferAccountBackground, {paddingTop: insets.top}]}
            contentContainerStyle = {{paddingBottom: insets.bottom + responsivePadding}}
            showsVerticalScrollIndicator = {false}
        >
            <View style = {styles.headerSection}>
                <GoBackButton />
                {selectionType === 'from' && (
                    <Text style = {styles.headerText}>Source Account</Text>
                )}
                {selectionType === 'to' && (
                    <Text style = {styles.headerText}>Recipient Account</Text>
                )}
            </View>
            <View style = {styles.accountListContainer}>
                {Object.entries(groupedAccounts.accountGroupsData).map(([accountGroupName, accounts]) => {
                    return (
                        <GroupedAccountList
                            key={accountGroupName}
                            accountGroupName = {accountGroupName}
                            accounts = {accounts}
                            navigation = {navigation}
                            transferAccountCard = {true}
                            selectionType = {selectionType}
                        />
                    );
                })}
            </View>
        </ScrollView>
    );
};


