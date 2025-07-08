import { useNavigation } from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';

const BackButton = () => {
    const navigation = useNavigation();

    return (
        <AnimatedPressable
            scaleValue={0.8}
            delay={200}
            onPress={() => navigation.goBack()}>
            <FontAwesome6 name="arrow-left" size={24} color="black" solid />
        </AnimatedPressable>
    );
};

export default BackButton;

