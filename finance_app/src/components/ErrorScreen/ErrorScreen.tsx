import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './ErrorScreen.styles';

type ErrorScreenProps = {
    errorText : string,
    errorSubText: string | null,
    errorMessage: string
}

export const ErrorScreen = ({errorText, errorSubText, errorMessage} : ErrorScreenProps) => {
    const insets = useSafeAreaInsets();
    return (
        <View style = {[styles.container, {paddingTop: insets.top}]}>
            <View style = {styles.errorContainer}>
                <Text style = {styles.errorText}>{errorText}</Text>
                {errorSubText ? <Text style = {styles.errorSubText}>{errorSubText}</Text> : null}
                <Text style = {styles.errorSubText}> Error: {errorMessage}</Text>
            </View>
        </View>
    );
};
