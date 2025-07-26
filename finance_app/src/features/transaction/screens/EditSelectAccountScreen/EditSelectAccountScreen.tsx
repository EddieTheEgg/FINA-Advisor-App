import { View, Text, Dimensions, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './EditSelectAccountScreen.styles';
import { useGroupAccounts } from '../../../accounts/hooks/useGroupAccounts';
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { RootNavigationProps } from '../../../../navigation/types/RootNavigatorTypes';
import { EditAccountSelectionList } from '../../components/EditTransactionComponents/EditAccountSelectionList/EditAccountSelectionList';


type EditSelectAccountScreenProps = {
    navigation : RootNavigationProps;
}


export const EditSelectAccountScreen = ({navigation} : EditSelectAccountScreenProps) => {

    const { height } = Dimensions.get('window');
    const responsivePadding = height * 0.2;
    const insets = useSafeAreaInsets();

    const {data: groupedAccounts, isPending, error} = useGroupAccounts();

    if (isPending || !groupedAccounts) {
        return <LoadingScreen />
    };

    if (error) {
        return (
            <ErrorScreen
                errorText="Failed to load accounts"
                errorSubText = "Please try again later"
                errorMessage = {error.message}
            />
        );
    };

    
    return (
        <ScrollView
        style = {[styles.screenContainer, {paddingTop: insets.top}]}
        showsVerticalScrollIndicator = {false}
        contentContainerStyle = {{paddingBottom: insets.bottom + responsivePadding}}
        >
            <View style = {styles.selectAccountHeader}>
                <BackButton />
                <Text style = {styles.selectAccountTitle}> Select Account</Text>
            </View>
            <View style = {styles.groupedAccountListContainer}>
                {Object.entries(groupedAccounts.accountGroupsData ).map(([accountGroupName, accounts]) => (
                    accounts.length > 0 &&
                    (<EditAccountSelectionList
                        key = {accountGroupName}
                        accountGroupName = {accountGroupName}
                        accounts = {accounts}
                        navigation = {navigation}
                    />)
                ))}
            </View>
        </ScrollView>
    );
};

