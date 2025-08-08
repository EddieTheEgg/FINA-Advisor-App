import { View, Text } from 'react-native';
import { styles } from './AILoadingCard.styles';
import { LoadingDots } from '../../../../components/LoadingDots/LoadingDots';

export const AILoadingCard = () => {
    return (
        <View style = {styles.container}>
            <View style = {styles.loadingContentContainer}>
                <Text style = {styles.aiIcon}>🤖</Text>
                <View>
                    <Text style = {styles.analyzingText}>Analyzing your spending<LoadingDots loadingText = ""/></Text>
                    <Text style = {styles.subAnalyzingText}>AI is generating personalized insights</Text>
                </View>
            </View>
        </View>
    );
};