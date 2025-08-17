import { View, Text, Image } from 'react-native';
import { useCategoryStore } from '../../store/useCategoryStore';
import { useGetSettingsCategories } from '../../hooks/useGetCategories';
import { styles } from './SettingsCategoryListCard.styles';
import { LoadingDots } from '../../../../components/LoadingDots/LoadingDots';

export const SettingsCategoryListCard = () => {

    const {categoryType} = useCategoryStore();

    const {data : categoryData, isPending, hasNextPage, fetchNextPage, isFetchingNextPage, error} = useGetSettingsCategories({transactionType: categoryType});

    if (isPending || !categoryData) {
        return (
            <View style = {styles.loadingContainer}>
                <View style = {styles.headerSection}>
                    <Text style = {styles.title}>{categoryType} Categories</Text>
                    <Text style = {styles.subTitle}> ? Categories</Text>
                </View>
                <View style = {styles.loadingIndicatorContainer}>
                    <Image source = {require('../../../../assets/images/Loading_Pig.png')} style = {styles.loadingImage} />
                    <LoadingDots  style = {styles.loadingText}loadingText = "Fetching categories..." />
                </View>
            </View>
        );
    }

    if (error) {
        return (
            <View style = {styles.loadingContainer}>
                <View style = {styles.headerSection}>
                    <Text style = {styles.title}>{categoryType} Categories</Text>
                    <Text style = {styles.subTitle}> ? Categories</Text>
                </View>
                <View style = {styles.loadingIndicatorContainer}>
                    <Text style = {styles.errorText}>Error fetching categories for settings</Text>
                    <Text style = {styles.errorSubText}>Error: {error.message}</Text>
                </View>
            </View>
        );
    }

    return (
        <View>
            <Text>Settings Category List Card Test</Text>
        </View>
    );
};
