import React, { useRef } from 'react';
import { Pressable, PressableProps, Animated } from 'react-native';

type AnimatedPressableProps = Omit<PressableProps, 'onPressIn' | 'onPressOut'> & {
  scaleValue?: number; // The scale value to animate to (how small the component shrinks, default: 0.9)
  delay?: number; // Delay in ms before animating back to normal size on press out (default: 0)
  onPressIn?: () => void; // Custom onPressIn function
  onPressOut?: () => void; // Custom onPressOut function
  children: React.ReactNode;
}

// This component is used to animate the press of a component,
// so it shrinks when pressed and returns to normal size when released
export const AnimatedPressable = ({
  scaleValue = 0.9,
  delay = 0,
  onPressIn: customOnPressIn,
  onPressOut: customOnPressOut,
  children,
  style,
  ...pressableProps
}: AnimatedPressableProps) => {
  const animation = useRef(new Animated.Value(0)).current;

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, scaleValue],
  });

  const handlePressIn = () => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    customOnPressIn?.();
  };

  const handlePressOut = () => {
    const animateOut = () => {
      Animated.spring(animation, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    };

    // If there is a delay, set a timeout to animate out after the delay
    if (delay > 0) {
      setTimeout(animateOut, delay);
    } else {
      animateOut();
    }

    customOnPressOut?.();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={style}
        {...pressableProps}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
};
