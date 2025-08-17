import { View, Text, Image } from 'react-native';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './SettingScreen.styles';
import { colors } from '../../../../styles/colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { UserCardPreview } from '../../components/UserCardPreview/UserCardPreview';
import { AppSettingsCard } from '../../components/AppSettingsCard/AppSettingsCard';
import { AccountSettingsCard } from '../../components/AccountSettingsCard/AccountSettingsCard';
import { LoadingDots } from '../../../../components/LoadingDots/LoadingDots';
import { useAuth } from '../../../auth/hooks/useAuth';

export const SettingsScreen = () => {

    const insets = useSafeAreaInsets();
    const {isLoading} = useAuth();

    if (isLoading) {
        return (
            <View style={[styles.loadingContainer, {paddingTop: insets.top, paddingBottom: insets.bottom}]}>
            <View>
                <Image source={require('../../../../assets/images/Loading_Pig.png')} style={styles.image} />
                <LoadingDots style ={styles.text} loadingText = "Signing out..."/>
            </View>
        </View>
        );
    }

    return (
        <View style = {[styles.container, {paddingTop: insets.top}]}>
            <View style = {styles.headerSection}>
                <BackButton />
                <Text style = {styles.title}>Settings</Text>
                <FontAwesome6 name = "empty-space" size = {39} color = {colors.background} />
            </View>
            <UserCardPreview />
            <AppSettingsCard />
            <AccountSettingsCard />
        </View>
    );
};
