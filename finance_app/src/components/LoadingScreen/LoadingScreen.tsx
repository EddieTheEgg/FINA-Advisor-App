import React, { useState, useEffect } from 'react';
import { Image, View, Text, SafeAreaView } from 'react-native';
import styles from './LoadingScreen.styles';

const LoadingScreen = () => {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => (prev.length < 3 ? prev + '.' : ''));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image source={require('../../assets/images/Loading_Pig.png')} style={styles.image} />
                <Text style={styles.text}>{`Loading${dots}`}</Text>
            </View>
        </SafeAreaView>
    );
};

export default LoadingScreen;
