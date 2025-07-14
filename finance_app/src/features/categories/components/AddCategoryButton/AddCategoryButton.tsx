import { Text } from 'react-native';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { styles } from './AddCategoryButton.styles';

type AddCategoryButtonProps = {
    onPress: () => void;
}

export const AddCategoryButton = ({ onPress }: AddCategoryButtonProps) => {
    return (
        <AnimatedPressable
            onPress={onPress}
            style={styles.addCategoryButton}
        >
            <Text style={styles.buttonText}>+ Create Category</Text>
        </AnimatedPressable>
    );
};

