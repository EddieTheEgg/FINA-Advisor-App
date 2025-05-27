import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { NavigationProps } from '../../../../navigation/types/AuthNavigatorTypes';
import { styles } from './LoginScreen.styles';

const LoginScreen = ({navigation}: NavigationProps<'Login'>) => {
    return (
        <SafeAreaView style = {styles.mainContainer}>
            <View>
                <Text>Login</Text>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;
