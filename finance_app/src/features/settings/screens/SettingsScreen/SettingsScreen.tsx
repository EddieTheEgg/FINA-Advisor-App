import { View, Text } from 'react-native';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './SettingScreen.styles';
import { colors } from '../../../../styles/colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { UserCardPreview } from '../../components/UserCardPreview/UserCardPreview';

export const SettingsScreen = () => {

    const insets = useSafeAreaInsets();
    return (
        <View style = {[styles.container, {paddingTop: insets.top}]}>
            <View style = {styles.headerSection}>
                <BackButton />
                <Text style = {styles.title}>Settings</Text>
                <FontAwesome6 name = "empty-space" size = {39} color = {colors.background} />
            </View>
            <UserCardPreview />
        </View>
    );
};
