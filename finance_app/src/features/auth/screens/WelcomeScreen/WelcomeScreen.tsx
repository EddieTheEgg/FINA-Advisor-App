import React from 'react';
import { View, Image, Text, SafeAreaView } from 'react-native';
import { WelcomeScreenStyles } from './WelcomeScreen.styles';
import SignInButton from '../../components/SignInButton/SignInButton';
import CreateAccountButton from '../../components/CreateAccountButton/CreateAccountButton';

const WelcomeScreen = () => {
  const navLoginScreen = () => {
    console.log('Login pressed!');
    // We'll add navigation later
  };

  const navCreateAccScreen = () => {
    console.log('Sign up pressed!');
    // We'll add navigation later
  };

  return (
    <SafeAreaView style={WelcomeScreenStyles.container}>
      <View style={WelcomeScreenStyles.centerContent}>
        <Image
          source={require('../../assets/images/finance_friend_icon.png')}
          style={WelcomeScreenStyles.imageContainer}
          resizeMode="contain"
        />
        <Text style={WelcomeScreenStyles.appTitle}>Finance Friend</Text>
        <Text style={WelcomeScreenStyles.tagline}>
          Your Personal Financial Tracking Advisor
        </Text>

        {/* Buttons */}
        <Image
            source={require('../../assets/images/button_rectangle.png')}
            style={WelcomeScreenStyles.imageBackground}
        />
        <View style={WelcomeScreenStyles.buttonContainer}>
         <SignInButton onPress={navLoginScreen}/>
         <CreateAccountButton onPress={navCreateAccScreen} />
        </View>
        </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
