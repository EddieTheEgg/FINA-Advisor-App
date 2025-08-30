import { View, Text } from 'react-native';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { styles } from './AccountSettingsCard.styles';
import { colors } from '../../../../styles/colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { fontSize } from '../../../../styles/fontSizes';
import { useAuth } from '../../../auth/hooks/useAuth';
import { DashboardNavigationProps } from '../../../../navigation/types/DashboardNavigatorTypes';

type AccountSettingsCardProps = {
    navigation: DashboardNavigationProps;
};


export const AccountSettingsCard = ({navigation}: AccountSettingsCardProps) => {
    const {signOut, isLoading} = useAuth();

    return (
        <View style = {styles.container}>
        <Text style = {styles.title}>ACCOUNT</Text>
            <View style = {styles.tabsContainer}>
                <AnimatedPressable
                    style = {styles.tab}
                    onPress = {() => navigation.navigate('Security')}
                >
                    <Text style = {[styles.icon, {backgroundColor: colors.lightBlue}]}>🔐</Text>
                    <View style = {styles.tabContent}>
                        <Text style = {styles.tabTitle}>Security</Text>
                        <Text style = {styles.tabSubtitle}>Password and privacy settings</Text>
                    </View>
                    <FontAwesome6 name = "chevron-right" size = {fontSize.sm} color = {colors.gray[500]} />
                </AnimatedPressable>
            </View>
            <View style = {styles.divider} />
            <View style = {styles.bottomTabsContainer}>
                <AnimatedPressable
                    onPress = {signOut}
                    disabled = {isLoading}
                    style = {styles.tab}
                >
                    <Text style = {[styles.icon, {backgroundColor: colors.gray[100]}]}>🚪</Text>
                    <View style = {styles.tabContent}>
                        <Text style = {styles.tabTitle}>Sign Out</Text>
                        <Text style = {styles.tabSubtitle}>Log out of your account</Text>
                    </View>
                    <FontAwesome6 name = "chevron-right" size = {fontSize.sm} color = {colors.gray[500]} />
                </AnimatedPressable>
            </View>
    </View>
    );
};
