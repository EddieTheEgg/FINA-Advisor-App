import { View, Text, ScrollView, Dimensions  } from 'react-native';
import { styles } from './SecurityScreen.styles';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { fontSize } from '../../../../styles/fontSizes';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { colors } from '../../../../styles/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChangePasswordCard } from '../../components/ChangePasswordCard/ChangePasswordCard';
import { DashboardNavigationProps } from '../../../../navigation/types/DashboardNavigatorTypes';

type SecurityScreenProps = {
    navigation: DashboardNavigationProps;
}

export const SecurityScreen = ({navigation}: SecurityScreenProps) => {
    const insets = useSafeAreaInsets();
    const height = Dimensions.get('window').height;

    return (
        <View style = {[styles.container, {paddingTop: insets.top}]}>
            <ScrollView
                showsVerticalScrollIndicator = {false}
                contentContainerStyle = {[styles.scrollViewContent, {paddingBottom: insets.bottom + height * 0.2}]}
            >

                <View style = {styles.headerSection}>
                    <BackButton />
                    <Text style = {styles.title}>Security</Text>
                    <FontAwesome6 name = "empty-space" size = {fontSize.xxl + 5} color = {colors.background} />
                </View>
                <ChangePasswordCard navigation = {navigation} />
            </ScrollView>
        </View>
    );
};
