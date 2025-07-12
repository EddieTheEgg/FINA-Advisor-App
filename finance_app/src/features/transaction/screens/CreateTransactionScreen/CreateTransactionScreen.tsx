import { Dimensions, ScrollView, Text, View } from 'react-native';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './CreateTransactionScreen.styles';
import { TransactionTypeCard } from '../../components/TransactionTypeCard/TransactionTypeCard';
import { useCreateTransactionStore } from '../../store/useTransactionStore';
import { AccountSelector } from '../../components/AccountSelector/AccountSelector';
import { TransactionNavigatorProps } from '../../../../navigation/types/TransactionNavigatorTypes';
import { AmountCard } from '../../components/AmountCard/AmountCard';

type CreateTransactionScreenProps = {
    navigation : TransactionNavigatorProps;
}

export const CreateTransactionScreen = ( { navigation }: CreateTransactionScreenProps) => {
    const insets = useSafeAreaInsets();
    const height = Dimensions.get('window').height;
    const canvasPadding = height * 0.02;

    const {transactionType} = useCreateTransactionStore();
    return (
        <ScrollView
        showsVerticalScrollIndicator = {false}
        contentContainerStyle = {{paddingBottom: insets.bottom + canvasPadding}}
        style = {[styles.backgroundContainer,{paddingTop: insets.top + canvasPadding, paddingBottom: insets.bottom}]}>
            <View style = {styles.header}>
                <BackButton />
                <Text style = {styles.title}>Create Transaction</Text>
            </View>
            <View style = {styles.transactionTypeContainer}>
                <TransactionTypeCard />
            </View>
            {transactionType === 'EXPENSE' && (
                <View style = {styles.expenseSection}>
                    <AccountSelector navigation = {navigation} />
                    <AmountCard />
                </View>
            )}
            {transactionType === 'INCOME' && (
                <View style = {styles.expenseSection}>
                    <AccountSelector navigation = {navigation} />
                    <AmountCard />
                </View>
            )}
        </ScrollView>
    );
};
