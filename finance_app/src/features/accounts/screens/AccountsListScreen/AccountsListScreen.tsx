import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './AccountsListScreen.styles';
import { useGroupAccounts } from '../../hooks/useGroupAccounts';
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';

export const AccountsListScreen = () => {
    const insets = useSafeAreaInsets();
    const {data : groupedAccounts, isPending, error} = useGroupAccounts();

    if (isPending || !groupedAccounts) {
        return (<LoadingScreen />);
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
        <ScrollView style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
            <Text>💳 My Accounts</Text>
            <View style = {styles.totalNetContainer}>
                <Text>Total Net Worth : {groupedAccounts.totalNet}</Text>
            </View>
        </ScrollView>
    );
};
