import { View, Text } from 'react-native';
import { styles } from './UserCardPreview.styles';
import { useDashboardQuery } from '../../../dashboard/hooks/useDashboard';
import { LoadingDots } from '../../../../components/LoadingDots/LoadingDots';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';
import { DashboardNavigationProps } from '../../../../navigation/types/DashboardNavigatorTypes';
import { useEditProfileStore } from '../../store/useEditProfileStore';

type UserCardPreviewProps = {
    navigation: DashboardNavigationProps;
}

export const UserCardPreview = ({navigation}: UserCardPreviewProps) => {

    const todayDate = new Date();
    const {data, isPending, error} = useDashboardQuery(todayDate.getMonth(), todayDate.getFullYear());
    const {initializeEditProfile} = useEditProfileStore();

    if (isPending || !data) {
        return (
            <View style = {styles.cardContainer}>
                <LoadingDots loadingText = "Loading user data..."/>
            </View>
        );
    }

    if (error) {
        return (
            <ErrorScreen
                errorText = "Error loading user data"
                errorSubText = "Please try again later"
                errorMessage = {error.message || 'An error occurred while loading user data'}
            />
        );
    }

    const handleNavToEditProfile = () => {
        initializeEditProfile(data.user)
        navigation.navigate('EditProfile');
    }

    return (
        <View style = {styles.cardContainer}>
            <Text style = {styles.nameText}>{data.user.firstName} {data.user.lastName}</Text>
            <Text style = {styles.emailText}>{data.user.email}</Text>
            <AnimatedPressable
                style = {styles.editProfileContainer}
                onPress = {handleNavToEditProfile}
            >
                <Text style = {styles.editProfileText}>Edit Profile</Text>
            </AnimatedPressable>
        </View>
    );
};
