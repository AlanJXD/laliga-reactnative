import React from 'react';
import "./global.css";
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import BottomTabs from './src/components/BottomTabs';

export default function App() {
  return (
    <View className="flex-1 bg-background">
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
    </View>
  );
}
