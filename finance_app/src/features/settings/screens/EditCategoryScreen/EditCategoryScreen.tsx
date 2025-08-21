import { View, Text, ScrollView, Dimensions } from 'react-native';
import { DashboardNavigationProps, DashboardStackParamList } from '../../../../navigation/types/DashboardNavigatorTypes';
import { RouteProp } from '@react-navigation/native';
import { styles } from './EditCategoryScreen.styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { colors } from '../../../../styles/colors';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { fontSize } from '../../../../styles/fontSizes';
import { EditCategoryActivityCard } from '../../components/EditCategoryComponents/EditCategoryActivityCard/EditCategoryActivityCard';
import { EditCategoryTypeCard } from '../../components/EditCategoryComponents/EditCategoryTypeCard/EditCategoryTypeCard';
import { EditCategoryNameCard } from '../../components/EditCategoryComponents/EditCategoryNameCard/EditCategoryNameCard';
import { EditCategoryIcon } from '../../components/EditCategoryIcon/EditCategoryIcon';
import { EditCategoryColor } from '../../components/EditCategoryColor/EditCategoryColor';


type EditCategoryScreenProps = {
    navigation: DashboardNavigationProps;
    route: RouteProp<DashboardStackParamList, 'EditCategory'>;
}

export const EditCategoryScreen = ({navigation, route}: EditCategoryScreenProps) => {
    const {categoryData} = route.params;
    const insets = useSafeAreaInsets();
    const height = Dimensions.get('window').height;

    return (
        <ScrollView
            style = {[styles.container, {paddingTop: insets.top}]}
            showsVerticalScrollIndicator = {false}
            contentContainerStyle = {[styles.contentContainer, {paddingBottom: insets.bottom + height * 0.5}]}
        >
            <View style = {styles.headerSection}>
                <BackButton />
                <Text style = {styles.title}>Edit Category</Text>
                <FontAwesome6 name = "empty-space" size = {fontSize.xl} color = {colors.background} />
            </View>
            <EditCategoryActivityCard categoryData = {categoryData} />
            <EditCategoryTypeCard categoryType = {categoryData.categoryType}/>
            <EditCategoryNameCard categoryType = {categoryData.categoryType}/>
            <EditCategoryIcon />
            <EditCategoryColor />
        </ScrollView>
    );
};
