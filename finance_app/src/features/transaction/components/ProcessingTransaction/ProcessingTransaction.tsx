import { Image, View } from 'react-native';
import { LoadingDots } from '../../../../components/LoadingDots/LoadingDots';
import { styles } from './ProcessingTransaction.styles.ts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const ProcessingTransaction = () => {
    const insets = useSafeAreaInsets();
    return (
        <View style = {[styles.container, {paddingTop: insets.top}]}>
            <Image source={require('../../../../assets/images/Loading_Pig.png')} style={styles.image} />
            <LoadingDots style={styles.text} loadingText="Processing Transaction" />
        </View>
    );
};
