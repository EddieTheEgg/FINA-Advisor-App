import { View, Text, ScrollView } from 'react-native';
import { styles } from './AccountTypeCard.styles';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { AccountType } from '../../types';
import { useAddAccountStore } from '../../store/useAddAccountStore';
import { ACCOUNT_TYPE_ICONS } from '../../../auth/types';

export const AccountTypeCard = () => {
    const { accountType, setAccountType, resetAccountDetailsExceptType } = useAddAccountStore();

    const accountTypes = [
        { type: AccountType.CHECKING, name: 'Checking' },
        { type: AccountType.SAVINGS, name: 'Savings' },
        { type: AccountType.CREDIT_CARD, name: 'Credit Card' },
        { type: AccountType.CASH, name: 'Cash' },
        { type: AccountType.INVESTMENT, name: 'Investment' },
        { type: AccountType.LOAN, name: 'Loan' },
        { type: AccountType.OTHER, name: 'Other' },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Account Type</Text>
                <Text style={styles.scrollText}>Scroll right to see more</Text>
            </View>
            <ScrollView
                horizontal
                contentContainerStyle={styles.accountTypeContainer}
            >
                {accountTypes.map((account) => (
                    <AnimatedPressable
                        key={account.type}
                        style={[
                            styles.accountTypeItem,
                            accountType === account.type && styles.selectedAccountType,
                        ]}
                        onPress={() => {
                            setAccountType(account.type);
                            resetAccountDetailsExceptType();
                        }}
                    >
                        <Text style={styles.accountTypeIcon}>
                            {ACCOUNT_TYPE_ICONS[account.type]}
                        </Text>
                        <Text style={styles.accountTypeName}>{account.name}</Text>
                    </AnimatedPressable>
                ))}
            </ScrollView>
        </View>
    );
};
