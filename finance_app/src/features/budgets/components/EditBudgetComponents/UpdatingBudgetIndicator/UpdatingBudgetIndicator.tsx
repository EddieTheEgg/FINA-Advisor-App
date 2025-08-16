import {View, Image } from 'react-native';
import { LoadingDots } from '../../../../../components/LoadingDots/LoadingDots';
import { styles } from './UpdatingBudgetIndicator.styles';

export const UpdatingBudgetIndicator = () => {
    return (
        <View style = {styles.container}>
            <Image source = {require('../../../../../assets/images/Loading_Pig.png')} style = {styles.image} />
            <LoadingDots  style = {styles.text} loadingText = "Updating Budget" />
        </View>
    );
};
