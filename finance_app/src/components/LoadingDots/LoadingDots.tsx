import { StyleProp, Text, TextStyle } from 'react-native';
import { useEffect, useState } from 'react';

type LoadingDotsProps = {
    style?: StyleProp<TextStyle>;
}

export const LoadingDots = ({ style }: LoadingDotsProps) => {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => (prev.length < 3 ? prev + '.' : ''));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <Text style={style}>{`Loading${dots}`}</Text>
    );
};
