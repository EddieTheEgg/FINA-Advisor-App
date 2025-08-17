import { View, Text, ScrollView, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './ManageCategoriesScreen.styles';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { colors } from '../../../../styles/colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { ChooseCategoryCard } from '../../components/ChooseCategoryCard/ChooseCategoryCard';
import { SettingsCategoryListCard } from '../../components/SettingsCategoryListCard/SettingsCategoryListCard';

export const ManageCategoriesScreen = () => {
    const height = Dimensions.get('window').height;
    const insets = useSafeAreaInsets();
    return (
        <ScrollView 
        style = {[styles.container, {paddingTop: insets.top}]}
        showsVerticalScrollIndicator = {false}
        contentContainerStyle = {{paddingBottom: insets.bottom + height * 0.2}}
        >
            <View style = {styles.headerSection}>
                <BackButton />
                <Text style = {styles.title}>Manage Categories</Text>
                <FontAwesome6 name = "empty-space" size = {39} color = {colors.background} />
            </View>
            <ChooseCategoryCard />
            <SettingsCategoryListCard />
        </ScrollView>
    );
};
