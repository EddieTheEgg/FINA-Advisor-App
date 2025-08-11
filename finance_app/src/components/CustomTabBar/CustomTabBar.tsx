import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useEffect, useRef } from 'react';
import { Pressable, useWindowDimensions, View, Animated } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { styles } from './CustomTabBar.styles';
import { colors } from '../../styles/colors';
import { TransferSubmissionBar } from '../../features/accounts/components/TransferSubmissionBar/TransferSubmissionBar';
import { TransactionSubmissionBar } from '../../features/transaction/components/TransactionSubmissionBar/TransactionSubmissionBar';
import { useCreateTransactionStore } from '../../features/transaction/store/useTransactionStore';
import { useTransferStore } from '../../features/accounts/store/useTransferStore';

// Displays the tab bar icons, if transaction tab adjust the transaction button icon differently
const getTabBarIcon = ({ route, size, focused }: any) => {

    let iconName: string = 'help-outline';

    if (route.name === 'Dashboard') {
      iconName = 'house';
    } else if (route.name === 'Accounts') {
      iconName = 'wallet';
    } else if (route.name === 'Transactions') {
      iconName = 'plus';
    } else if (route.name === 'Insights') {
      iconName = 'chart-line';
    } else if (route.name === 'Budgets') {
      iconName = 'list-check';
    }

    const isTransactionsTab = route.name === 'Transactions';

    return (
      <View style={isTransactionsTab ? styles.transactionAddButton : null}>
        <FontAwesome6
          name={iconName}
          size={isTransactionsTab ? size + 5 : size}
          color={focused && !isTransactionsTab ? colors.darkerBackground : isTransactionsTab ? colors.white : colors.gray[600]}
        />
      </View>
    );
  };

export const CustomTabBar = ({state, navigation}: BottomTabBarProps) => {
    const { isTransactionProcessing } = useCreateTransactionStore();
    const { isTransferProcessing } = useTransferStore();

    const { width } = useWindowDimensions();
    const TAB_COUNT = 5;
    const TAB_WIDTH = width / TAB_COUNT;
    const indicatorPos = useRef(new Animated.Value(0)).current;

    // Animates/moves the indicator position based on the current state index
    useEffect(() => {
        Animated.timing(indicatorPos, {
            toValue: state.index * TAB_WIDTH,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [state.index, TAB_WIDTH, indicatorPos]);


    // Get the current route (active navigator tab of HomeNavigator)
    // via state.index (number) of all active routes/tabs of HomeNavigator
    const currentRoute = state.routes[state.index];

    // Check if we're currently on the Transfer screen within the Accounts stack
    const isOnTransferScreen = currentRoute.name === 'Accounts' &&
        currentRoute.state &&
        typeof currentRoute.state.index === 'number' &&
        currentRoute.state.routes[currentRoute.state.index].name === 'Transfer';

    if (isOnTransferScreen && !isTransferProcessing) {
      return (
        <TransferSubmissionBar />
      );
    }

    if (isOnTransferScreen && isTransferProcessing) {
      return(
        <View />
      );
    }



    // Check if we're currently on the TransferAccountSelection screen within the Accounts stack
    const isOnTransferAccountSelectionScreen = currentRoute.name === 'Accounts' &&
        currentRoute.state &&
        typeof currentRoute.state.index === 'number' &&
        currentRoute.state.routes[currentRoute.state.index].name === 'TransferAccountSelection';

    if (isOnTransferAccountSelectionScreen) {
      return (
        //Nothing
        <View />
      );
    }


    const isOnAccountSelectionScreen = currentRoute.name === 'Transactions' &&
        currentRoute.state &&
        typeof currentRoute.state.index === 'number' &&
        currentRoute.state.routes[currentRoute.state.index].name === 'SelectAccount';

    const isOnCategorySelectionScreen = currentRoute.name === 'Transactions' &&
        currentRoute.state &&
        typeof currentRoute.state.index === 'number' &&
        currentRoute.state.routes[currentRoute.state.index].name === 'SelectCategory';

    if (isOnAccountSelectionScreen || isOnCategorySelectionScreen) {
      return (
        <View />
      );
    }



    // Check if we're currently on the CreateTransaction screen within the Transactions stack
    const isOnTransactionCreationScreen = currentRoute.name === 'Transactions' && (
        currentRoute.state &&
        typeof currentRoute.state.index === 'number' &&
        currentRoute.state.routes &&
        currentRoute.state.routes[currentRoute.state.index].name === 'CreateTransaction'
        ||
        !currentRoute.state // If no state, we're on the initial screen (CreateTransaction)
        //React Navigation doesn't have a state for the initial screen (CreateTransaction)
    );

      if (isOnTransactionCreationScreen && !isTransactionProcessing) {
        return (
          <TransactionSubmissionBar />
        );
      } else if (isOnTransactionCreationScreen && isTransactionProcessing) {
        return (
          <View />
        );
      }


      return (
        <View style={[styles.tabBarContainer]}>
           <Animated.View
            style={state.index === 2 ?
                null :
                [styles.indicator, {
                    transform: [{ translateX: indicatorPos }],
                    width: TAB_WIDTH - 10,
                }]}
           />
           {state.routes.map((route, index) => {
             const isFocused = state.index === index;

             return (
               <Pressable
                 key={route.key}
                 onPress={() => navigation.navigate(route.name)}
                 style={styles.iconPressables}
               >
                 {getTabBarIcon({ route, size: 20, focused: isFocused })}
               </Pressable>
             );
           })}
        </View>
      );
};


