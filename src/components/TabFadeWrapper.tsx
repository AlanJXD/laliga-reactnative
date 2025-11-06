import React, { useEffect, useState } from 'react';
import { ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { useIsFocused } from '@react-navigation/native';

type Props = { children: React.ReactNode; duration?: number; style?: ViewStyle };

export default function TabFadeWrapper({ children, duration = 180, style }: Props) {
  const isFocused = useIsFocused();

  // Evita "flash" inicial
  const opacity = useSharedValue(isFocused ? 1 : 0);

  // Oculta realmente tras el fade-out (sale del flujo y bloquea toques)
  const [hidden, setHidden] = useState(!isFocused);

  useEffect(() => {
    if (isFocused) {
      if (hidden) setHidden(false);
      opacity.value = withTiming(1, {
        duration,
        easing: Easing.out(Easing.cubic),
      });
    } else {
      opacity.value = withTiming(
        0,
        { duration, easing: Easing.in(Easing.cubic) },
        (finished) => {
          if (finished) runOnJS(setHidden)(true);
        }
      );
    }
  }, [isFocused]);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      style={[
        { flex: 1 },
        animatedStyle,
        hidden
          ? { position: 'absolute', inset: 0, zIndex: -1 }
          : { position: 'relative', zIndex: 0 },
        style,
      ]}
      pointerEvents={hidden ? 'none' : 'auto'}
      collapsable={false}
      removeClippedSubviews
    >
      {children}
    </Animated.View>
  );
}
