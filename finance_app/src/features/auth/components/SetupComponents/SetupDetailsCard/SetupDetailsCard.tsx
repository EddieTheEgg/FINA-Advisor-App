import { View, Text } from 'react-native';
import { styles } from './SetupDetailsCard.styles';
import { useAccountInfoStore, useSignupStore } from '../../../store/useSignupStore';


export const SetupDetailsCard = () => {


    const {accountName, accountBalance} = useAccountInfoStore();
    const {firstName, lastName, email} = useSignupStore();
    return (
        <View style = {styles.container}>
            <Text style = {styles.headerText}>🎉 You're All Set!</Text>
            <View style = {styles.subHeaderContainer}>
                <Text style = {styles.subHeaderText}>Your finance tracker is almost ready!</Text>
                <Text style = {styles.subHeaderText}>We will set up your account with defaults.</Text>
            </View>
            <View style = {styles.detailsContainer}>
                <Text style = {styles.detailsHeader}>✅ What We Will Set Up:</Text>
                <Text style = {styles.detailsText}><Text style = {styles.detailsTextBold}>Your Profile: </Text>{firstName} {lastName} ({email})</Text>
                <Text style = {styles.detailsText}><Text style = {styles.detailsTextBold}>Your Account: </Text>{accountName} (${accountBalance.toFixed(2)})</Text>
                <Text style = {styles.detailsText}><Text style = {styles.detailsTextBold}>11 Expense Categories: </Text>Food & Dining, Transportation, Shopping, Housing, Utilities, Healthcare, and more</Text>
                <Text style = {styles.detailsText}><Text style = {styles.detailsTextBold}>7 Income Categories: </Text>Salary, Investments, Interest Income, Bonuses, and more</Text>
                <Text style = {styles.detailsText}><Text style = {styles.detailsTextBold}>AI Insights: </Text>Ready to analyze your spending</Text>
                <Text style = {styles.detailsText}><Text style = {styles.detailsTextBold}>Budget Tools: </Text>Set limits and track progress</Text>
            </View>
        </View>
    );
};
