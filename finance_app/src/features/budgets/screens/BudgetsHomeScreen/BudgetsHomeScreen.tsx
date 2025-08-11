import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './BudgetsHomeScreen.styles';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { BudgetsNavigatorProps } from '../../../../navigation/types/BudgetsNavigatorTypes';

type BudgetsHomeScreenProps = {
    navigation: BudgetsNavigatorProps;
};

export const BudgetsHomeScreen = ({navigation}: BudgetsHomeScreenProps) => {

    const insets = useSafeAreaInsets();
    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={{ paddingTop: insets.top, paddingBottom: insets.bottom + 80 }}
            >
                <Text>Budgets Home Placeholder</Text>
            </ScrollView>
            <AnimatedPressable
                onPress = {() => navigation.navigate('CreateBudget')}
                style={[styles.createBudgetButton]}
            >
                <Text style = {styles.createBudgetButtonText}>Create Budget</Text>
            </AnimatedPressable>
        </View>
    );
};
