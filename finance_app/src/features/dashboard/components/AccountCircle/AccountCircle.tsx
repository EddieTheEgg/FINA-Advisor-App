import { useEffect, useRef } from 'react';
import { View, Text, Easing, Animated, Pressable } from 'react-native';
import { PieChartPro } from 'react-native-gifted-charts';
import { AccountCircleProps } from '../../types';
import { styles } from './AccountCircle.styles';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

export default function AccountCircle({accounts}: AccountCircleProps) {

  //Need to add navigation to the accounts screen
  const navAccountsScreen = () => {
    console.log('Navigate to account screen');
  };


    let pieData = accounts?.accountInfos
      ? accounts.accountInfos.map(account => ({
          value: account.balance,
          color: account.color,
        }))
      : [];

    // If there is only one account, add a tiny invisible slice
    // since the pie chart requires at least two slices
    if (pieData.length === 1) {
      pieData.push({ value: 0.01, color: '#e0e0e0' });
    }


    console.log('pieData:', pieData);
    // Reference to the animated value, persists across renders
    // Initialize with 0, will be animated to 1
    const spinAnim = useRef(new Animated.Value(0)).current;

    // Animate the pie chart on mount
    useEffect(() => {
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }, [spinAnim]);

    // Input range from 0 to 1 into 360 degrees, one full rotation
    const spin = spinAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });


    return(
      <View style = {styles.accountCircleContainer}>
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <PieChartPro
                  isAnimated={false}
                  donut
                  radius={80}
                  innerRadius={60}
                  data={pieData}
              />
          </Animated.View>
          <View style={styles.innerCircleTextContainer}>
              <Text style={styles.innerCircleText}>Accounts: {accounts?.count}</Text>
              <View style={styles.separator} />
              <Pressable onPress={navAccountsScreen}>
                    <Text style={styles.innerCircleText}>View All <FontAwesome6 name = "arrow-right" /></Text>
              </Pressable>
          </View>
      </View>

    );
}
