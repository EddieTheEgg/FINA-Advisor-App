import { View, Text, SafeAreaView } from 'react-native';
import { SignOutButton } from '../../auth/components/SignOutButton/SignOutButton';
import { useUser } from '../../user/hooks/useUser';
import { styles } from './HomeScreen.styles';
import Greeting from '../components/Greeting/Greeting';

export const HomeScreen = () => {
    const {data: user} = useUser();

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <View>
                    <Greeting styles={styles.greetingText} />
                    <Text style={styles.nameText}> {user?.firstName}</Text>
                </View>
                <View>
                    <SignOutButton />
                </View>
            </View>
        </SafeAreaView>
    );
};
