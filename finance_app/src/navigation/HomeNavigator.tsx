import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../features/dashboard/screens/HomeScreen';

const Stack = createNativeStackNavigator();

export const HomeNavigator = () => {
    return (
        <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    );
};
