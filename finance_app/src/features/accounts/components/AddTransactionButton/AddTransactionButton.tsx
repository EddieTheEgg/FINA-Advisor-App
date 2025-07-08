import { Text } from 'react-native';
import { styles } from './AddTransactionButton.styles';
import { AccountNavigatorProps } from '../../../../navigation/types/AccountNavigatorTypes';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { colors } from '../../../../styles/colors';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';


type AddTransactionButtonProps = {
    navigation: AccountNavigatorProps;
}

export const AddTransactionButton = ({navigation} : AddTransactionButtonProps) => {

    const navigateToCreateTransactionScreen = () => {
      navigation.getParent()?.navigate('Transactions');
    };

    return (
        <AnimatedPressable
            scaleValue={0.9}
            delay={200}
            style={styles.actionButton}
            onPress={navigateToCreateTransactionScreen}
        >
            <FontAwesome6 name="plus" size={20} color={colors.gray[700]} />
            <Text style={styles.actionText}>Add{'\n'}Transaction</Text>
        </AnimatedPressable>
    );
};
