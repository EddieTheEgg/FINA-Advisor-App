import React, { useState } from 'react';
import { Pressable, SafeAreaView, Text, TextInput, View } from 'react-native';
import { AuthNavigationProps } from '../../../../navigation/types/AuthNavigatorTypes';
import { styles } from './LoginScreen.styles';
import SignInButton from '../../components/SignInButton/SignInButton';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const LoginScreen = ({navigation}: AuthNavigationProps<'Login'>) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);

    const handleLogin = () => {
        console.log('Login pressed!');
    };

    const handleForgotPass = () => {
        console.log('Password forgotten text clicked!');
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View>
                <Text style={styles.title}>Sign in</Text>
            </View>
            <View style={styles.inputsContainer}>
                <TextInput
                    placeholder="Your Email"
                    style={styles.input}
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
                        keyboardType="visible-password"
                    />
                    <Pressable onPress= {() => setShowPassword(!showPassword)}>
                        {showPassword ?
                            <FontAwesome6 name="eye-slash" solid style = {styles.eyeIcon}/> :
                            <FontAwesome6 name="eye" solid style = {styles.eyeIcon}/>
                        }
                    </Pressable>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <SignInButton onPress={handleLogin} />
                <Pressable onPress={handleForgotPass}>
                    <Text style = {styles.forgotPasswordText}>Forgot password?</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;


