import { Image, View } from 'react-native';
import styles from './LoadingScreen.styles';
import { LoadingDots } from '../LoadingDots/LoadingDots';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const LoadingScreen = () => {
    const insets = useSafeAreaInsets();
    return (
        <View style={[styles.container, {paddingTop: insets.top, paddingBottom: insets.bottom}]}>
            <View>
                <Image source={require('../../assets/images/Loading_Pig.png')} style={styles.image} />
                <LoadingDots style ={styles.text} />
            </View>
        </View>
    );
};

export default LoadingScreen;
