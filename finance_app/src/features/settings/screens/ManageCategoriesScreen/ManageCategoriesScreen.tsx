import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './ManageCategoriesScreen.styles';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { colors } from '../../../../styles/colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { ChooseCategoryCard } from '../../components/ChooseCategoryCard/ChooseCategoryCard';
import { SettingsCategoryListCard } from '../../components/SettingsCategoryListCard/SettingsCategoryListCard';
import { DashboardNavigationProps } from '../../../../navigation/types/DashboardNavigatorTypes';


type ManageCategoriesScreenProps = {
    navigation: DashboardNavigationProps;
}
export const ManageCategoriesScreen = ({navigation}: ManageCategoriesScreenProps) => {
    const insets = useSafeAreaInsets();
    return (
        <View
            style = {[styles.container, {paddingTop: insets.top}]}
        >
            <View style = {styles.headerSection}>
                <BackButton />
                <Text style = {styles.title}>Manage Categories</Text>
                <FontAwesome6 name = "empty-space" size = {39} color = {colors.background} />
            </View>
            <ChooseCategoryCard />
            <SettingsCategoryListCard navigation = {navigation} />
        </View>
    );
};
