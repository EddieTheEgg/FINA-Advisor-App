import { Image, View } from 'react-native';
import { LoadingDots } from '../../../../components/LoadingDots/LoadingDots';
import { styles } from './ProcessingTransfer.styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const ProcessingTransfer = () => {
    const insets = useSafeAreaInsets();
    return (
        <View style = {[styles.container, {paddingTop: insets.top}]}>
            <Image source={require('../../../../assets/images/Loading_Pig.png')} style={styles.image} />
            <LoadingDots style={styles.text} loadingText="Processing Transfer" />
        </View>
    );
};
