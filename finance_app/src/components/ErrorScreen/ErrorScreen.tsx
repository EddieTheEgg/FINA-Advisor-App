import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './ErrorScreen.styles';
import { AnimatedPressable } from '../AnimatedPressable/AnimatedPressable';

type ErrorScreenProps = {
    errorText : string,
    errorSubText: string | null,
    errorMessage: string,
    onRetry?: () => void
}

export const ErrorScreen = ({errorText, errorSubText, errorMessage, onRetry} : ErrorScreenProps) => {
    const insets = useSafeAreaInsets();
    return (
        <View style = {[styles.container, {paddingTop: insets.top}]}>
            <View style = {styles.errorContainer}>
                <Text style = {styles.errorText}>{errorText}</Text>
                {errorSubText ? <Text style = {styles.errorSubText}>{errorSubText}</Text> : null}
                <Text style = {styles.errorSubText}> Error: {errorMessage}</Text>
                {onRetry && (
                    <AnimatedPressable style={styles.retryButton} onPress={onRetry}>
                        <Text style={styles.retryButtonText}>Try Again</Text>
                    </AnimatedPressable>
                )}
            </View>
        </View>
    );
};
