import { View, Text } from 'react-native';
import { styles } from './AppSettingsCard.styles';
import { colors } from '../../../../styles/colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { fontSize } from '../../../../styles/fontSizes';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { DashboardNavigationProps } from '../../../../navigation/types/DashboardNavigatorTypes';

type AppSettingsCardProps = {
    navigation: DashboardNavigationProps;
};

export const AppSettingsCard = ({navigation}: AppSettingsCardProps) => {
    return (
        <View style = {styles.container}>
            <Text style = {styles.title}>APP SETTINGS</Text>
                <View style = {styles.tabsContainer}>
                    <AnimatedPressable
                        style = {styles.tab}
                        onPress = {() => navigation.navigate('ManageCategories')}
                    >
                        <Text style = {[styles.icon, {backgroundColor: colors.yellow}]}>📂</Text>
                        <View style = {styles.tabContent}>
                            <Text style = {styles.tabTitle}>Manage Categories</Text>
                            <Text style = {styles.tabSubtitle}>Add, edit, or delete categories</Text>
                        </View>
                        <FontAwesome6 name = "chevron-right" size = {fontSize.sm} color = {colors.gray[500]} />
                    </AnimatedPressable>
                </View>
                <View style = {styles.divider} />
                <View style = {styles.tabsContainer}>
                    <AnimatedPressable
                        style = {styles.tab}
                    >
                        <Text style = {[styles.icon, {backgroundColor: colors.lighterRed}]}>🔔</Text>
                        <View style = {styles.tabContent}>
                            <Text style = {styles.tabTitle}>Notifications</Text>
                            <Text style = {styles.tabSubtitle}>Alerts and reminders</Text>
                        </View>
                        <FontAwesome6 name = "chevron-right" size = {fontSize.sm} color = {colors.gray[500]} />
                    </AnimatedPressable>
                </View>
                <View style = {styles.divider} />
                <View style = {styles.bottomTabsContainer}>
                    <AnimatedPressable
                        style = {styles.tab}
                    >
                        <Text style = {[styles.icon, {backgroundColor: colors.lighterGreen}]}>📤</Text>
                        <View style = {styles.tabContent}>
                            <Text style = {styles.tabTitle}>Export Data</Text>
                            <Text style = {styles.tabSubtitle}>Download your financial data</Text>
                        </View>
                        <FontAwesome6 name = "chevron-right" size = {fontSize.sm} color = {colors.gray[500]} />
                    </AnimatedPressable>
                </View>
        </View>
    );
};
