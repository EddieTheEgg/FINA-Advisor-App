import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './ManageCategoriesScreen.styles';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { colors } from '../../../../styles/colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { ChooseCategoryCard } from '../../components/ChooseCategoryCard/ChooseCategoryCard';
import { SettingsCategoryListCard } from '../../components/SettingsCategoryListCard/SettingsCategoryListCard';
import { DashboardNavigationProps } from '../../../../navigation/types/DashboardNavigatorTypes';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { fontSize } from '../../../../styles/fontSizes';


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
                <AnimatedPressable onPress = {() => navigation.navigate('CreateCategory')}>
                    <FontAwesome6 style = {styles.addCategoryIcon} name = "plus" size = {fontSize.lg} color = {colors.white} />
                </AnimatedPressable>
            </View>
            <ChooseCategoryCard />
            <SettingsCategoryListCard navigation = {navigation} />
        </View>
    );
};
