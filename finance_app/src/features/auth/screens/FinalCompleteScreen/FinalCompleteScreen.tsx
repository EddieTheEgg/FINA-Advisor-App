import {View, Text, ScrollView} from 'react-native';
import { styles } from './FinalCompleteScreen.styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { RootNavigationProps } from '../../../../navigation/types/RootNavigatorTypes';
import { useAuth } from '../../hooks/useAuth';


type FinalCompleteScreenProps = {
    navigation: RootNavigationProps
}

export const FinalCompleteScreen = ({navigation} : FinalCompleteScreenProps) => {
    const insets = useSafeAreaInsets();
    const { clearFirstTimeUser } = useAuth();

    const handleGoToDashboard = () => {
        // Clear the first-time user flag so they don't see this screen again
        clearFirstTimeUser();
        // Navigate to the main dashboard
        navigation.navigate('Home');
    };

    return (
        <View style = {styles.mainContainer}>
            <ScrollView
                contentContainerStyle = {[styles.scrollContainer, {paddingTop: insets.top}]}
                showsVerticalScrollIndicator = {false}
            >
                <Text style = {styles.partyEmoji}>🎉</Text>
                <Text style = {styles.welcomeText}>Welcome to Your Finance App!</Text>
                <Text style = {styles.welcomeTextSubDescription}>Your account is ready. Start tracking your finances and get AI-powered insights.</Text>
                <View style = {styles.nextDetailsContainer}>
                    <Text style = {styles.nextDetailsTitle}>What's Next?</Text>
                    <Text style = {styles.nextDetailsSubDescription}>• Add your first transaction</Text>
                    <Text style = {styles.nextDetailsSubDescription}>• Set up budgets for your categories</Text>
                    <Text style = {styles.nextDetailsSubDescription}>• Check out AI insights as you spend</Text>
                    <Text style = {styles.nextDetailsSubDescription}>• Explore your financial dashboard</Text>

                </View>
                <AnimatedPressable
                    style = {styles.goToDashboardButton}
                    onPress = {handleGoToDashboard}
                >
                    <Text style = {styles.goToDashboardButtonText}>Start Using App</Text>
                </AnimatedPressable>
            </ScrollView>
        </View>
    );
};
