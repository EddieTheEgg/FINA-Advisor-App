import { Dimensions, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { useGroupAccounts } from '../../../accounts/hooks/useGroupAccounts';
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';
import { styles } from './EditSelectTransferAccountScreen.styles';
import { RouteProp } from '@react-navigation/native';
import { RootNavigationProps, RootStackParamList } from '../../../../navigation/types/RootNavigatorTypes';
import { EditTransferAccountSelectionList } from '../../components/EditTransferComponents/EditTransferAccountSelectionList/EditTransferAccountSelectionList';


type EditSelectTransferAccountScreenProps = {
    navigation : RootNavigationProps;
    route: RouteProp<RootStackParamList, 'EditSelectTransferAccount'>;
}

export const EditSelectTransferAccountScreen = ( {navigation, route} : EditSelectTransferAccountScreenProps) => {
    const {accountType} = route.params;

    const { height } = Dimensions.get('window');
    const responsivePadding = height * 0.2;
    const insets = useSafeAreaInsets();

    const {data : groupedAccounts, isPending, error} = useGroupAccounts();

    if (isPending || !groupedAccounts) {
        return <LoadingScreen />;
    }

    if (error) {
        return (
            <ErrorScreen
            errorText = "Failed to load accounts"
            errorSubText = "Please try again later"
            errorMessage = {error.message}
             />
        );
    }


    return (
        <ScrollView
         style = {[styles.screenContainer, {paddingTop: insets.top}]}
         showsVerticalScrollIndicator = {false}
         contentContainerStyle = {{paddingBottom: insets.bottom + responsivePadding}}
        >
            <View style = {styles.selectAccountHeader}>
                <BackButton />
                {accountType === 'source' && (
                    <Text style = {styles.selectAccountTitle}> Source Account</Text>
                )}
                {accountType === 'to' && (
                    <Text style = {styles.selectAccountTitle}> Recipient Account</Text>
                )}
            </View>
            <View
                style = {styles.groupedAccountListContainer}
            >
                {Object.entries(groupedAccounts.accountGroupsData ).map(([accountGroupName, accounts]) => (
                    accounts.length > 0 &&
                    (<EditTransferAccountSelectionList
                        key = {accountGroupName}
                        accountGroupName = {accountGroupName}
                        accounts = {accounts}
                        accountType = {accountType}
                        navigation = {navigation}
                        />
                    )
                ))}

            </View>
        </ScrollView>
    );
};

