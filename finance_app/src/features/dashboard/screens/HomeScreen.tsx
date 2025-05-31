import { View, Text, SafeAreaView } from 'react-native';
import { SignOutButton } from '../../auth/components/SignOutButton/SignOutButton';
import { useEffect, useState, useCallback } from 'react';
import api from '../../../api/axios';

export const HomeScreen = () => {
    const [username, setUsername] = useState('');

    const getUsername = useCallback(async() => {
        try{
            const response = await api.get('/users/me');
            setUsername(response.data.first_name);
        } catch (error) {
            console.error('Error fetching username:', error);
        }
    }, []);

    useEffect(() => {
        getUsername();
    }, [getUsername]);

    return (
        <SafeAreaView>
            <View>
                <Text>Home</Text>
                <Text>{username}</Text>
                {/* <SignOutButton />  For testing purposes*/}
            </View>
        </SafeAreaView>
    );
};
