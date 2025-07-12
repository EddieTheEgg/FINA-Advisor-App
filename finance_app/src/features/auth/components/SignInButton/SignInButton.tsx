import { styles } from './SignInButton.styles';
import { Text, View } from 'react-native';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';

export default function SignInButton({ onPress, disabled }: { onPress: () => void, disabled: boolean }) {


    return (
        <View style={styles.wrapper}>
            <AnimatedPressable
                scaleValue={0.9}
                delay={200}
                style={[styles.container]}
                onPress={onPress}
                disabled={disabled}
            >
                <Text style={styles.buttonText}>Sign In</Text>
            </AnimatedPressable>
        </View>
    );
}

