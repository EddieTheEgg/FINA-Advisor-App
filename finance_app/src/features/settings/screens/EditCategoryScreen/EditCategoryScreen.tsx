import { View, Text } from 'react-native';
import { DashboardNavigationProps, DashboardStackParamList } from '../../../../navigation/types/DashboardNavigatorTypes';
import { RouteProp } from '@react-navigation/native';
import { styles } from './EditCategoryScreen.styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { colors } from '../../../../styles/colors';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { fontSize } from '../../../../styles/fontSizes';
import { CategoryActivityCard } from '../../components/CategoryActivityCard/CategoryActivityCard';
import { CategoryTypeCard } from '../../components/CategoryTypeCard/CategoryTypeCard';


type EditCategoryScreenProps = {
    navigation: DashboardNavigationProps;
    route: RouteProp<DashboardStackParamList, 'EditCategory'>;
}

export const EditCategoryScreen = ({navigation, route}: EditCategoryScreenProps) => {
    const {categoryData} = route.params;
    const insets = useSafeAreaInsets();

    return (
        <View style = {[styles.container, {paddingTop: insets.top}]}>
            <View style = {styles.headerSection}>
                <BackButton />
                <Text style = {styles.title}>Edit Category</Text>
                <FontAwesome6 name = "empty-space" size = {fontSize.xl} color = {colors.background} />
            </View>
            <CategoryActivityCard categoryData = {categoryData} />
            <CategoryTypeCard categoryType = {categoryData.categoryType}/>
        </View>
    );
};
