import { Platform, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './CreateCategoryScreen.styles';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { fontSize } from '../../../../styles/fontSizes';
import { colors } from '../../../../styles/colors';
import { CategoryTypeCard } from '../../components/CategoryTypeCard/CategoryTypeCard';
import { CategoryNameCard } from '../../components/CategoryNameCard/CategoryNameCard';
import { CategoryIconCard } from '../../components/CategoryIconCard/CategoryIconCard';
import { CategoryColorCard } from '../../components/CategoryColorCard/CategoryColorCard';


export const CreateCategoryScreen = () => {
    const insets = useSafeAreaInsets();

    return (
        <View style = {[styles.container, {paddingTop: Platform.OS === 'ios' ? insets.top : insets.top + 10}]}>
            <View style = {styles.headerSection}>
                <BackButton />
                <Text style = {styles.title}>Create Category</Text>
                <FontAwesome6 name = "empty-space" size = {fontSize.lg} color = {colors.background} />
            </View>
            <CategoryTypeCard />
            <CategoryNameCard />
            <CategoryIconCard />
            <CategoryColorCard />
        </View>
    );
};
