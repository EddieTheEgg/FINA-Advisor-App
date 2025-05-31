import { View, Text, SafeAreaView } from 'react-native';
import { SignOutButton } from '../../auth/components/SignOutButton/SignOutButton';

export const HomeScreen = () => {
    return (
        <SafeAreaView>
            <View>
                <Text>Home</Text>
                {/* <SignOutButton />  For testing purposes*/}
            </View>
        </SafeAreaView>
    );
};
