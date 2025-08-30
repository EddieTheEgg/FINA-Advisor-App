import { Dimensions, ScrollView, Text, View } from 'react-native';
import { styles } from './EditProfileScreen.styles';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { colors } from '../../../../styles/colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { fontSize } from '../../../../styles/fontSizes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PersonalInfoCard } from '../../components/PersonalInfoCard/PersonalInfoCard';

export const EditProfileScreen = () => {
    const insets = useSafeAreaInsets();
    const height = Dimensions.get('window').height;

    return (
        <View style = {[styles.container, {paddingTop: insets.top}]}>
            <ScrollView
            showsVerticalScrollIndicator = {false}
            contentContainerStyle = {[styles.scrollViewContent, {paddingBottom: insets.bottom + height * 0.5}]}
            >
                <View style = {styles.headerSection}>
                    <BackButton />
                    <Text style = {styles.title}>Edit Profile</Text>
                    <FontAwesome6 name = "empty" size = {fontSize.xxl + 6} color = {colors.background} />
                </View>
                <PersonalInfoCard />
            </ScrollView>
        </View>
    );
};
