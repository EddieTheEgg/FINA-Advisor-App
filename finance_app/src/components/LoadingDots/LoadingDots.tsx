import { StyleProp, Text, TextStyle } from 'react-native';
import { useEffect, useState } from 'react';

type LoadingDotsProps = {
    style?: StyleProp<TextStyle>;
    loadingText?: string;
}

export const LoadingDots = ({ style, loadingText = 'Loading' }: LoadingDotsProps) => {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => (prev.length < 3 ? prev + '.' : ''));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <Text style={style}>{`${loadingText}${dots}`}</Text>
    );
};
