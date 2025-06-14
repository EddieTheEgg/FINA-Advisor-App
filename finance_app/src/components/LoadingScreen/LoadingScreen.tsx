import { Image, View, SafeAreaView } from 'react-native';
import styles from './LoadingScreen.styles';
import { LoadingDots } from '../LoadingDots/LoadingDots';

const LoadingScreen = () => {

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image source={require('../../assets/images/Loading_Pig.png')} style={styles.image} />
                <LoadingDots style ={styles.text} />
            </View>
        </SafeAreaView>
    );
};

export default LoadingScreen;
