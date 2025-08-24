import { View, Text, ScrollView, Dimensions, Platform } from 'react-native';
import { AuthNavigationProps } from '../../../../navigation/types/AuthNavigatorTypes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './SingleAccountSetupScreen.styles';
import BackButton from '../../components/GoBackButton/GoBackButton';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { colors } from '../../../../styles/colors';
import { MainAccountInfoCard } from '../../components/SingleAccountSetupComponents/MainAccountInfoCard/MainAccountInfoCard';
import { MainAccountTypeCard } from '../../components/SingleAccountSetupComponents/MainAccountTypeCard/MainAccountTypeCard';
import { useAccountInfoStore } from '../../store/useSignupStore';
import { MainAccountDetailsCard } from '../../components/SingleAccountSetupComponents/MainAccountDetailsCard/MainAccountDetailsCard';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';

type SingleAccountSetupScreenProps = {
    navigation: AuthNavigationProps;
}

export const SingleAccountSetupScreen = ({ navigation }: SingleAccountSetupScreenProps) => {
    const insets  = useSafeAreaInsets();
    const { height } = Dimensions.get('window');
    const responsivePadding = height * 0.2;
    const { validateAccountName } = useAccountInfoStore();

    const handleContinueToStep3 = () => {
        if (validateAccountName()) {
            navigation.navigate('SetupComplete');
        }
    };

    return (
        <View style = {[ styles.container,{paddingTop: Platform.OS === 'ios' ? insets.top : insets.top + 10, paddingBottom: insets.bottom }]}>
            <ScrollView
                contentContainerStyle = {{paddingBottom: insets.bottom + responsivePadding}}
                showsVerticalScrollIndicator = {false}
            >
                <View style = {styles.headerContainer}>
                    <View style = {styles.headerTextContainer}>
                        <BackButton />
                        <Text style = {styles.headerText}>Create Your First Account</Text>
                        <FontAwesome6 name="empty-space" size={24} color= {colors.background} solid />
                    </View>
                    <Text style = {styles.subHeaderText}>Step 2 of 3</Text>
                    <View style = {styles.dotProgressContainer}>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <View key = {index} style = {[styles.dotProgress, index === 1 && styles.activeDot, index < 1 && styles.completedDot]}/>
                            ))}
                        </View>
                </View>
                <MainAccountInfoCard/>
                <MainAccountTypeCard/>
                <MainAccountDetailsCard/>
                <AnimatedPressable
                    style = {[
                        styles.continueButton,
                    ]}
                    onPress = {handleContinueToStep3}
                >
                    <Text style = {styles.continueButtonText}>
                        Continue
                    </Text>
                </AnimatedPressable>
            </ScrollView>
        </View>
    );
};
