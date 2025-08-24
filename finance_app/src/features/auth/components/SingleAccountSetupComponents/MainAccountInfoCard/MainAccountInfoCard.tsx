import { View, Text } from 'react-native';
import { styles } from './MainAccountInfoCard.styles';

export const MainAccountInfoCard = () => {
    return (
        <View style = {styles.container}>
            <Text style = {styles.title}>💡 Getting Started</Text>
            <Text style = {styles.description}>Start with your first account to begin tracking. You can add more accounts in the future.</Text>
        </View>
    );
};
