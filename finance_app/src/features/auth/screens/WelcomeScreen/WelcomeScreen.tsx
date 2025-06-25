import React from 'react';
import { View, Image, Text } from 'react-native';
import { WelcomeScreenStyles } from './WelcomeScreen.styles';
import SignInButton from '../../components/SignInButton/SignInButton';
import CreateAccountButton from '../../components/CreateAccountButton/CreateAccountButton';
import { AuthNavigationProps } from '../../../../navigation/types/AuthNavigatorTypes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const WelcomeScreen = ({ navigation }: { navigation: AuthNavigationProps }) => {
  const insets = useSafeAreaInsets();

  const navLoginScreen = () => {
    navigation.navigate('Login');
  };

  const navCreateAccScreen = () => {
    console.log('Sign up pressed!');
    // We'll add navigation later
  };

  return (
    <View style={[WelcomeScreenStyles.container, {paddingTop: insets.top, paddingBottom: insets.bottom}]}>
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

          <View style={WelcomeScreenStyles.buttonContainer}>
          <SignInButton onPress={navLoginScreen} disabled={false}/>
          <CreateAccountButton onPress={navCreateAccScreen} />
          </View>
        </View>
    </View>
  );
};

export default WelcomeScreen;
