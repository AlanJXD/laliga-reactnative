import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { LigasStackParamList } from '../../types/navigation';

import LigasScreen from '../../screens/ligas/LigasScreen';
import DetalleLigaScreen from '../../screens/ligas/DetalleLigaScreen';

const Stack = createNativeStackNavigator<LigasStackParamList>();

export default function LigasStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LigasMain"
        component={LigasScreen}
        options={{ title: 'Ligas' }}
      />
      <Stack.Screen
        name="DetalleLiga"
        component={DetalleLigaScreen}
        options={{ title: 'Detalle de la liga' }}
      />
    </Stack.Navigator>
  );
}
