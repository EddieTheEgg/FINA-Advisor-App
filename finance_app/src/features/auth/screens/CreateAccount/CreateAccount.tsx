import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { AuthNavigationProps } from '../../../../navigation/types/AuthNavigatorTypes';


const CreateAccountScreen = ({navigation}: AuthNavigationProps<'CreateAccount'>) => {

    return (
        <SafeAreaView>
            <View>
                <Text>Login Screen</Text>
            </View>
        </SafeAreaView>
    );
};


export default CreateAccountScreen;
