import { Pressable, View } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { styles } from './SignOutButton.styles';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

export const SignOutButton = () => {
    const {signOut} = useAuth();

    const handleSignOut = async() => {
        await signOut();
    };

    return (
        <Pressable onPress={handleSignOut}>
            <View style={styles.signOutContainer}>
                <FontAwesome6 name="right-from-bracket" size={30} color="black" solid />
            </View>
        </Pressable>
    );
};
