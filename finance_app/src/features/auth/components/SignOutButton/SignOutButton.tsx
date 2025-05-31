import { Pressable, Text } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { styles } from './SignOutButton.styles';

export const SignOutButton = () => {
    const {signOut} = useAuth();

    const handleSignOut = async() => {
        await signOut();
    };

    return (
        <Pressable style={styles.container} onPress={handleSignOut}>
            <Text style={styles.buttonText}>Sign Out</Text>
        </Pressable>
    );
};
