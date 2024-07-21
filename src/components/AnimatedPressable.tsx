import { PropsWithChildren } from 'react';
import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Animated, { withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

export type AnimatedPressableProps = PropsWithChildren<
  Omit<PressableProps, 'style'> & {
    containerStyle?: StyleProp<ViewStyle>;
  }
>;

const PressableAnimatedComponent = Animated.createAnimatedComponent(Pressable);

export const AnimatedPressable: React.FC<AnimatedPressableProps> = ({
  children,
  onPressIn,
  onPressOut,
  containerStyle,
  ...props
}) => {
  const opacityAnimated = useSharedValue(1);

  const fadeIn = () => {
    opacityAnimated.value = withTiming(0.6, { duration: 150 });
  };

  const fadeOut = () => {
    opacityAnimated.value = withTiming(1, { duration: 200 });
  };

  const handleOnPressIn = (event: GestureResponderEvent) => {
    fadeIn();
    onPressIn?.(event);
  };

  const handleOnPressOut = (event: GestureResponderEvent) => {
    fadeOut();
    onPressOut?.(event);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacityAnimated.value,
  }));

  return (
    <PressableAnimatedComponent
      onPressIn={handleOnPressIn}
      onPressOut={handleOnPressOut}
      {...props}
      style={[containerStyle, animatedStyle]}
    >
      {children}
    </PressableAnimatedComponent>
  );
};
