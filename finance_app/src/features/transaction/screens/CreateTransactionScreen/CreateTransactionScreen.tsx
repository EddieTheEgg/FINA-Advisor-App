import { Dimensions, ScrollView, Text, View } from 'react-native';
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
import { RecurringTransactionCard } from '../../components/RecurringTransactionCard/RecurringTransactionCard';
import { useNavigation } from '@react-navigation/native';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

type CreateTransactionScreenProps = {
    navigation : TransactionNavigatorProps;
}

const DashboardBackButton = () => {
    const navigation = useNavigation();

    const navigateToDashboard = () => {
        const parent = navigation.getParent();
        if (parent) {
            parent.navigate('Dashboard');
        }
    };

    return (
        <AnimatedPressable
            scaleValue={0.8}
            delay={200}
            onPress={navigateToDashboard}>
            <FontAwesome6 name="arrow-left" size={24} color="black" solid />
        </AnimatedPressable>
    );
};

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
                <DashboardBackButton />
                <Text style = {styles.title}>Create Transaction</Text>
            </View>
            <View style = {styles.transactionTypeContainer}>
                <TransactionTypeCard />
            </View>
            {(transactionType === 'EXPENSE' || transactionType === 'INCOME') && (
                <View style = {styles.expenseSection}>
                    <AccountSelector navigation = {navigation} />
                    <CategorySelector navigation = {navigation} />
                    <AmountCard />
                    <TitleCard />
                    <DateCard />
                    <OptionalDetailsCard />
                    <RecurringTransactionCard />
                </View>
            )}
        </ScrollView>
    );
};
