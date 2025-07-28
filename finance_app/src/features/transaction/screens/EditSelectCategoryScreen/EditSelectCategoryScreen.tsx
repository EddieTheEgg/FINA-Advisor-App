import { Dimensions, FlatList, Platform, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './EditSelectCategoryScreen.styles';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { useGetUserCategories } from '../../hooks/useGetUserCategories';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';
import { RootNavigationProps } from '../../../../navigation/types/RootNavigatorTypes';
import { LoadingDots } from '../../../../components/LoadingDots/LoadingDots';
import { spacing } from '../../../../styles/spacing';
import { CategoryResponse } from '../../types';
import { AddCategoryButton } from '../../../categories/components/AddCategoryButton/AddCategoryButton';
import { useEditTransactionStore } from '../../store/useEditTransactionStore.ts';
import { EditCategorySelectionCard } from '../../components/EditTransactionComponents/EditCategorySelectionCard/EditCategorySelectionCard.tsx';

type EditSelectCategoryScreenProps = {
  navigation: RootNavigationProps;
};

const seperator = () => {
  return <View style={{height: spacing.md}} />;
};

export const EditSelectCategoryScreen = ({ navigation }: EditSelectCategoryScreenProps) => {
  const insets = useSafeAreaInsets();
  const height = Dimensions.get('window').height;
  const canvasPadding = height * 0.4;

  const { transactionTypeDraft } = useEditTransactionStore();

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, error } = useGetUserCategories(transactionTypeDraft);

  if (error) {
    return (
      <ErrorScreen
        errorText="Failed to load categories"
        errorSubText="Please try again later"
        errorMessage={error.message}
      />
    );
  }

  if (!data) {
    return <LoadingScreen />;
  }

  const categories = data.pages.flatMap((page) => page?.categories || []);

  const navigateToEditTransactionScreen = () => {
    navigation.navigate('CreateCategory');
  };

  return (
    <View style={[styles.categoryScreenContainer, { paddingTop: insets.top }]}>
      <View style={styles.headerSection}>
        <BackButton />
        <Text style={styles.title}>Select Category</Text>
      </View>
      <View style = {styles.categoryListContainer}>
          <FlatList
            contentContainerStyle={[{ paddingBottom: insets.bottom + canvasPadding }]}
            showsVerticalScrollIndicator={false}
            data={categories}
            keyExtractor={(item : CategoryResponse) => item.categoryId.toString()}
            renderItem={({ item } : {item : CategoryResponse}) => (
                <EditCategorySelectionCard categoryItem={item} navigation={navigation} />
            )}
            ItemSeparatorComponent={seperator}
            onEndReached={() => {
                console.log('onEndReached triggered', { hasNextPage, isFetchingNextPage });
                if (hasNextPage && !isFetchingNextPage) {
                  console.log('Fetching next page...');
                  fetchNextPage();
                }
            }}
            onEndReachedThreshold={0.1}
            ListFooterComponent={isFetchingNextPage ? <LoadingDots /> : null}
        />
      </View>
      <View style={[styles.addCategoryButtonContainer, { bottom: Platform.OS === 'android' ? insets.bottom + spacing.md : insets.bottom}]}>
        <AddCategoryButton onPress={navigateToEditTransactionScreen} />
      </View>
    </View>
  );
};
