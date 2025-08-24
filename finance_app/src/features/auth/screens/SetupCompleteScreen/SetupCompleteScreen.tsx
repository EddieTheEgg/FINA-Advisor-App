import { Dimensions, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './SetupCompleteScreen.styles';
import BackButton from '../../components/GoBackButton/GoBackButton';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { colors } from '../../../../styles/colors';
import { SetupDetailsCard } from '../../components/SetupComponents/SetupDetailsCard/SetupDetailsCard';

export const SetupCompleteScreen = () => {
    const insets = useSafeAreaInsets();
    const responsivePadding = Dimensions.get('window').height * 0.2;

    return (
        <View style = {[styles.container, { paddingTop: insets.top }]}>
            <ScrollView
                contentContainerStyle = {{paddingBottom: insets.bottom + responsivePadding}}
                showsVerticalScrollIndicator={false}
            >
            <View style = {styles.headerContainer}>
                <View style = {styles.headerTextContainer}>
                    <BackButton />
                    <Text style = {styles.headerText}>Setup Complete!</Text>
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
            </ScrollView>
        </View>
    );
};
