import React from 'react';
import { View, ViewStyle } from 'react-native';

type Props = {
  children: React.ReactNode;
  duration?: number;
  style?: ViewStyle;
  routeName: string;
};

export default function TabSlideWrapper({ children, style }: Props) {
  return (
    <View style={[{ flex: 1 }, style]}>
      {children}
    </View>
  );
}
