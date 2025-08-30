import { View, Text, Image, ScrollView, Dimensions } from 'react-native';
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
import { DashboardNavigationProps } from '../../../../navigation/types/DashboardNavigatorTypes';

type SettingsScreenProps = {
    navigation: DashboardNavigationProps;
};

export const SettingsScreen = ({navigation}: SettingsScreenProps) => {
    const height = Dimensions.get('window').height;

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
        <ScrollView
        style = {[styles.container, {paddingTop: insets.top}]}
        showsVerticalScrollIndicator = {false}
        contentContainerStyle = {{paddingBottom: insets.bottom + height * 0.2}}
        >
            <View style = {styles.headerSection}>
                <BackButton />
                <Text style = {styles.title}>Settings</Text>
                <FontAwesome6 name = "empty-space" size = {39} color = {colors.background} />
            </View>
            <UserCardPreview navigation = {navigation} />
            <AppSettingsCard navigation = {navigation} />
            <AccountSettingsCard navigation = {navigation} />
        </ScrollView>
    );
};
