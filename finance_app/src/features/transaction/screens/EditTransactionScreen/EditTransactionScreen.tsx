import { View, Text, ScrollView } from 'react-native';
import { useEffect } from 'react';
import { RootNavigationProps, RootStackParamList } from '../../../../navigation/types/RootNavigatorTypes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import { styles } from './EditTransactionScreen.styles';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { EditTransactionTypeCard } from '../../components/EditTransactionComponents/EditTransactionTypeCard/EditTransactionTypeCard';
import { useEditTransactionStore } from '../../store/useEditTransactionStore';
import { EditAccountSelector } from '../../components/EditTransactionComponents/EditAccountSelector/EditAccountSelector';
import { RouteProp } from '@react-navigation/native';

type EditTransactionScreenNavigationProps = {
    navigation: RootNavigationProps;
    route: RouteProp<RootStackParamList, 'EditTransaction'>;
}
    
export const EditTransactionScreen = ({route, navigation}: EditTransactionScreenNavigationProps) => {
    const { transactionId, transactionDetails } = route.params;
    const insets = useSafeAreaInsets();
    const canvasPadding = Dimensions.get('window').height * 0.02;


    const { transactionTypeDraft, initializeDraftFromTransaction } = useEditTransactionStore();

    useEffect(() => {
        initializeDraftFromTransaction(transactionDetails);
    }, [transactionDetails, initializeDraftFromTransaction]);

    return (
        <ScrollView
        showsVerticalScrollIndicator = {false}
        contentContainerStyle = {{paddingBottom: insets.bottom + canvasPadding}}
        style = {[styles.container, {paddingTop: insets.top + canvasPadding}]}
        >
            <View style = {styles.header}>
                <BackButton />
                <Text style = {styles.headerTitle}>Edit Transaction</Text>
                <Text>    </Text>
            </View>
            <EditTransactionTypeCard />
            {(transactionTypeDraft === 'EXPENSE' || transactionTypeDraft === 'INCOME') && (
                <View style = {styles.expenseIncomeContainer}>
                    <EditAccountSelector navigation = {navigation} />
                </View>
            )}
        </ScrollView>
    );
};
