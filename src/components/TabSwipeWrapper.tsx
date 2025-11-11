import React from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
  children: React.ReactNode;
  currentTab: string;
};

export default function TabSwipeWrapper({ children }: Props) {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
