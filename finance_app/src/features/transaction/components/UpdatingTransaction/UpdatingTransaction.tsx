import { Image, View } from 'react-native';
import { LoadingDots } from '../../../../components/LoadingDots/LoadingDots';
import { styles } from './UpdatingTransaction.styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type UpdatingTransactionProps = {
    loadingText: string;
};

export const UpdatingTransaction = ({loadingText}: UpdatingTransactionProps) => {
    const insets = useSafeAreaInsets();
    return (
        <View style = {[styles.container, {paddingTop: insets.top}]}>
            <Image source={require('../../../../assets/images/Loading_Pig.png')} style={styles.image} />
            <LoadingDots style={styles.text} loadingText={loadingText} />
        </View>
    );
};
