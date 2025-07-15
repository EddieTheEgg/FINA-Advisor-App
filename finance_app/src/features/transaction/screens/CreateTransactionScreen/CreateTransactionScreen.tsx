import { Dimensions, ScrollView, Text, View } from 'react-native';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './CreateTransactionScreen.styles';
import { TransactionTypeCard } from '../../components/TransactionTypeCard/TransactionTypeCard';
import { useCreateTransactionStore } from '../../store/useTransactionStore';
import { AccountSelector } from '../../components/AccountSelector/AccountSelector';
import { TransactionNavigatorProps } from '../../../../navigation/types/TransactionNavigatorTypes';
import { AmountCard } from '../../components/AmountCard/AmountCard';
import { CategorySelector } from '../../components/CategorySelector/CategorySelector';
import { TitleCard } from '../../components/TitleCard/TitleCard';
import { DateCard } from '../../components/DateCard/DateCard';
import { OptionalDetailsCard } from '../../components/OptionalDetailsCard/OptionalDetailsCard';

type CreateTransactionScreenProps = {
    navigation : TransactionNavigatorProps;
}

export const CreateTransactionScreen = ( { navigation }: CreateTransactionScreenProps) => {
    const insets = useSafeAreaInsets();
    const height = Dimensions.get('window').height;
    const canvasPadding = height * 0.04;

    const {transactionType} = useCreateTransactionStore();
    return (
        <ScrollView
        showsVerticalScrollIndicator = {false}
        contentContainerStyle = {{paddingBottom: insets.bottom + canvasPadding}}
        style = {[styles.backgroundContainer,{paddingTop: insets.top + canvasPadding }]}>
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
                    <CategorySelector navigation = {navigation} />
                    <AmountCard />
                    <TitleCard />
                    <DateCard />
                    <OptionalDetailsCard />
                </View>
            )}
            {transactionType === 'INCOME' && (
                <View style = {styles.expenseSection}>
                    <AccountSelector navigation = {navigation} />
                    <CategorySelector navigation = {navigation} />
                    <AmountCard />
                    <TitleCard />
                    <DateCard />
                    <OptionalDetailsCard />
                </View>
            )}
        </ScrollView>
    );
};
