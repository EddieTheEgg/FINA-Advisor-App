import { Dimensions, Image, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './SetupCompleteScreen.styles';
import BackButton from '../../components/GoBackButton/GoBackButton';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { colors } from '../../../../styles/colors';
import { SetupDetailsCard } from '../../components/SetupComponents/SetupDetailsCard/SetupDetailsCard';
import { SetupNoteCard } from '../../components/SetupComponents/SetupNoteCard/SetupNoteCard';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { useSignUp } from '../../hooks/useSignUp';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';
import { LoadingDots } from '../../../../components/LoadingDots/LoadingDots';

export const SetupCompleteScreen = () => {
    const insets = useSafeAreaInsets();
    const responsivePadding = Dimensions.get('window').height * 0.2;
    const { mutate: signUpUser, isPending, error } = useSignUp();

    const handleCreateAccount = async () => {
        // Don't need to validate since by the time user gets to this screen, they have already validated their data
        signUpUser();
    };

    if (isPending) {
        return (
            <View style={[styles.loadingContainer, {paddingTop: insets.top, paddingBottom: insets.bottom}]}>
                <View>
                    <Image source={require('../../../../assets/images/Loading_Pig.png')} style={styles.image} />
                    <LoadingDots style ={styles.text} loadingText = "Setting up your account..." />
                </View>
            </View>
        );
    }

    if (error) {
        return <ErrorScreen
            errorText = "Signup Failed"
            errorSubText = "An error occurred while signing up"
            errorMessage = {error.message}
        />;
    }

    return (
        <View style = {[styles.container, { paddingTop: insets.top }]}>
            <ScrollView
                contentContainerStyle = {{paddingBottom: insets.bottom + responsivePadding}}
                showsVerticalScrollIndicator={false}
            >
                <View style = {styles.headerContainer}>
                    <View style = {styles.headerTextContainer}>
                        <BackButton />
                        <Text style = {styles.headerText}>Setup Review</Text>
                        <FontAwesome6 name="empty-space" size={24} color= {colors.background} solid />
                    </View>
                    <Text style = {styles.subHeaderText}>Step 3 of 3</Text>
                    <View style = {styles.dotProgressContainer}>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <View key = {index} style = {[styles.dotProgress, index === 2 && styles.activeDot, index < 2 && styles.completedDot]}/>
                        ))}
                    </View>
                </View>
                <SetupDetailsCard/>
                <SetupNoteCard/>
                <AnimatedPressable
                    style = {styles.finishButton}
                    onPress = {handleCreateAccount}
                >
                    <Text style = {styles.finishButtonText}>Finish Setup</Text>
                </AnimatedPressable>
            </ScrollView>
        </View>
    );
};
