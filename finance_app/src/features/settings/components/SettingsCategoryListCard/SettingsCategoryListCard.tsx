import { View, Text, Image, FlatList, useWindowDimensions } from 'react-native';
import { useCategoryStore } from '../../store/useCategoryStore';
import { useGetSettingsCategories } from '../../hooks/useGetCategories';
import { styles } from './SettingsCategoryListCard.styles';
import { LoadingDots } from '../../../../components/LoadingDots/LoadingDots';
import { CategorySettingsDisplayCard } from '../CategorySettingsDisplayCard/CategorySettingsDisplayCard';

const seperator = () => {
    return <View style={styles.seperator} />;
};

export const SettingsCategoryListCard = () => {
    const height = useWindowDimensions().height;
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
                    <LoadingDots  style = {styles.loadingText}loadingText = "Fetching categories" />
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

    const categoryList = categoryData.pages.flatMap((page) => page.categories);
    const totalCategories = categoryData.pages[0].totalCategories;

    return (
        <View style = {styles.loadingContainer}>
            <View style = {styles.headerSection}>
                <Text style = {styles.title}>{categoryType} Categories</Text>
                <Text style = {styles.subTitle}> {totalCategories} Categories</Text>
            </View>
            <FlatList
                data = {categoryList}
                renderItem = {({item}) => (
                    <CategorySettingsDisplayCard categoryData = {item}/>
                )}
                keyExtractor = {(item) => item.categoryId}
                onEndReached = {() => {
                    if (hasNextPage && !isFetchingNextPage) {
                        fetchNextPage();
                    }
                }}
                onEndReachedThreshold = {0.5}
                ItemSeparatorComponent = {seperator}
                ListFooterComponent = {isFetchingNextPage ? <LoadingDots style = {styles.loadingMoreText} loadingText = "Loading more categories"/> : null}
                contentContainerStyle = {{paddingBottom: height * 0.5}}
                showsVerticalScrollIndicator = {false}
        />
        </View>
    );
};
