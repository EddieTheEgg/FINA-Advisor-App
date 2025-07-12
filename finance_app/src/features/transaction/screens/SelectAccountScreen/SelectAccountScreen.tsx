import { Dimensions, ScrollView, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';

export const SelectAccountScreen = () => {
    const { height } = Dimensions.get('window');
    const responsivePadding = height * 0.2;
     const insets = useSafeAreaInsets();

    return (
        <ScrollView
         style = {[ {paddingTop: insets.top}]}
         showsVerticalScrollIndicator = {false}
         contentContainerStyle = {{paddingBottom: insets.bottom + responsivePadding}}
        >
            <BackButton />
            <Text> Select Account</Text>
        </ScrollView>
    );
};
