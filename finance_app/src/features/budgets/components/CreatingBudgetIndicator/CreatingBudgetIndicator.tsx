import { View, Image } from 'react-native';
import { styles } from './CreatingBudgetIndicator.styles';
import { LoadingDots } from '../../../../components/LoadingDots/LoadingDots';

export const CreatingBudgetIndicator = () => {
    return (
        <View style = {styles.container}>
            <Image source = {require('../../../../assets/images/Loading_Pig.png')} style = {styles.image} />
            <LoadingDots  style = {styles.text} loadingText = "Creating Budget" />
        </View>
    );
};
