import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { styles } from './LoginScreen.styles';
import SignInButton from '../../components/SignInButton/SignInButton';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useLogin } from '../../hooks/useLogin';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { AuthNavigationProps } from '../../../../navigation/types/AuthNavigatorTypes';
import { colors } from '../../../../styles/colors';

type LoginScreenProps = {
    navigation: AuthNavigationProps
}

const LoginScreen = ({ navigation }: LoginScreenProps) => {
    const insets = useSafeAreaInsets();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);

    // Use the query login hook to login the user
    const {mutate: loginUser, error, isPending} = useLogin();

    const handleLogin = async () => {
        loginUser({email, password},);
    };

    const handleForgotPass = () => {
        console.log('Password forgotten text clicked!');
    };

    return (
        <View style={[styles.mainContainer, {paddingTop: insets.top, paddingBottom: insets.bottom}]}>
            <AnimatedPressable
                style = {styles.backButton}
                onPress = {() => navigation.navigate('Welcome')}
            >
                 <FontAwesome6 name="arrow-left" size={24} color="black" solid />
            </AnimatedPressable>
            <View>
                <Text style={styles.title}>Sign in</Text>
            </View>
            <View style={styles.inputsContainer}>
                <TextInput
                    placeholder="Your Email"
                    style={styles.input}
                    placeholderTextColor={colors.gray[400]}
                    value={email}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    onChangeText={setEmail}
                />
                <View>
                    <TextInput
                        placeholder="Password"
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={showPassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="default"
                    />
                    <Pressable onPress= {() => setShowPassword(!showPassword)}>
                        {showPassword ?
                            <FontAwesome6 name="eye-slash" solid style = {styles.eyeIcon}/> :
                            <FontAwesome6 name="eye" solid style = {styles.eyeIcon}/>
                        }
                    </Pressable>
                </View>
                {error && <Text style={styles.errorText}>Login failed</Text>}
            </View>
            <View style={styles.buttonContainer}>
                <SignInButton onPress={handleLogin} disabled={isPending} />
                <Pressable onPress={handleForgotPass}>
                    <Text style = {styles.forgotPasswordText}>Forgot password?</Text>
                </Pressable>
                {isPending && <Text style={styles.loadingText}>Loading...</Text>}
            </View>
        </View>
    );
};

export default LoginScreen;


