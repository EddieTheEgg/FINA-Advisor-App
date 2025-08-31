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
                <View style = {styles.bottomTabsContainer}>
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
                {/* TODO: FUTURE FEATURE - Notifications Settings
                    - Push notifications for budget alerts
                    - Reminders for recurring transactions
                    - Low balance warnings
                    - Monthly spending summaries
                */}
                {/*
                <View style = {styles.tabsContainer}>
                    <AnimatedPressable
                        style = {styles.tab}
                        onPress={() => {
                            // TODO: Navigate to NotificationSettingsScreen
                            console.log('Navigate to Notification Settings');
                        }}
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
                */}
                {/* TODO: FUTURE FEATURE - Export Data
                    - Export to CSV/Excel format
                    - Date range selection
                    - Filter by account/category
                    - Include charts/visualizations
                    - Email export option
                <View style = {styles.bottomTabsContainer}>
                    <AnimatedPressable
                        style = {styles.tab}
                        onPress={() => {
                            console.log('Export Data feature - Coming Soon!');
                        }}
                    >
                        <Text style = {[styles.icon, {backgroundColor: colors.lighterGreen}]}>📤</Text>
                        <View style = {styles.tabContent}>
                            <Text style = {styles.tabTitle}>Export Data</Text>
                            <Text style = {styles.tabSubtitle}>Download your financial data</Text>
                        </View>
                        <FontAwesome6 name = "chevron-right" size = {fontSize.sm} color = {colors.gray[500]} />
                    </AnimatedPressable>
                </View>
                */}
        </View>
    );
};
