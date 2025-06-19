import React from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CreateAccountScreen = () => {
    const insets  = useSafeAreaInsets();
    return (
        <View style = {[{paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <View>
                <Text>Create Account Beginning Screen</Text>
            </View>
        </View>
    );
};


export default CreateAccountScreen;
