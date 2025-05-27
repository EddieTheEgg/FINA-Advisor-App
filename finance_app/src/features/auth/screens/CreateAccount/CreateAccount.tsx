import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { NavigationProps } from '../../../../navigation/types/AuthNavigatorTypes';


const CreateAccountScreen = ({navigation}: NavigationProps<'CreateAccount'>) => {

    return (
        <SafeAreaView>
            <View>
                <Text>Login Screen</Text>
            </View>
        </SafeAreaView>
    );
};


export default CreateAccountScreen;
