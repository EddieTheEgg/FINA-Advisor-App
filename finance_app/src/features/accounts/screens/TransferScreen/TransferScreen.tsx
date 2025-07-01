import { View, Text, useWindowDimensions, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { AccountNavigatorParamList } from '../../../../navigation/types/AccountNavigatorTypes';
import { RouteProp } from '@react-navigation/native';
import { styles } from './TransferScreen.styles';
import GoBackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { TransferAccountCard } from '../../components/TransferAccountCard/TransferAccountCard';


export const TransferScreen = () => {
    const { fromAccountDetails, toAccountDetails } = useRoute<RouteProp<AccountNavigatorParamList, 'Transfer'>>().params;

    const insets = useSafeAreaInsets();

    const dimensions = useWindowDimensions();
    const { height } = dimensions;
    const responsivePaddingTop = insets.top + (height * 0.02);

    return (
        <View style = {[styles.transferScreenContainer,{paddingTop: responsivePaddingTop}]}>
            <View style = {styles.headerSection}>
                <GoBackButton />
                <Text style = {styles.headerTitle}>Transfer Money</Text>
            </View>
            <ScrollView>
                <View style = {styles.fromAccountContainer}>
                    <Text style = {styles.fromAccountTitle}>From</Text>
                    <Pressable>
                        {fromAccountDetails ? (
                           <TransferAccountCard
                                emptyCard={false}
                                accountColor = {fromAccountDetails.color}
                                accountIcon = {fromAccountDetails.icon ?? undefined}
                                accountBalance = {fromAccountDetails.balance}
                                accountName = {fromAccountDetails.name}
                           />
                        ) : (
                           <TransferAccountCard emptyCard={true} />
                        )}
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
};
