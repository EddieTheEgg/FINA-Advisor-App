import { View, Text, ScrollView } from 'react-native';
import { styles } from './AddAccountScreen.styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { colors } from '../../../../styles/colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { AccountTypeCard } from '../../components/AccountTypeCard/AccountTypeCard';
import { AddAccountDetailsCard } from '../../components/AddAccountDetailsCard/AddAccountDetailsCard';


export const AddAccountScreen = () => {
    const insets = useSafeAreaInsets();
    return (
        <View style = {[styles.container, { paddingTop: insets.top }]}>
            <ScrollView
                showsVerticalScrollIndicator = {false}
                contentContainerStyle = {styles.scrollViewContent}
            >
                <View style = {styles.headerContainer}>
                    <BackButton />
                    <Text style = {styles.headerText}>Create Account</Text>
                    <FontAwesome6 name = "empty-space" size = {30} color = {colors.background} />
                </View>
                <AccountTypeCard />
                <AddAccountDetailsCard />
            </ScrollView>
        </View>
    );
};
