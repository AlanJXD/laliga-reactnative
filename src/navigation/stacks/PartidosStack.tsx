import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { PartidosStackParamList } from '../../types/navigation';

import PartidosScreen from '../../screens/partidos/PartidosScreen';
import DetallePartidoScreen from '../../screens/partidos/DetallePartidoScreen';

const Stack = createNativeStackNavigator<PartidosStackParamList>();

export default function PartidosStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#eaeaea', // fondo igual al de la app
        },
        headerTintColor: '#006c4f', // texto y flecha del header con tu color brand
        headerTitleAlign: 'center',
        contentStyle: {
          backgroundColor: '#eaeaea', // evita que se vea fondo blanco al navegar
        },
      }}
    >
      <Stack.Screen
        name="PartidosMain"
        component={PartidosScreen}
        options={{ title: 'Partidos' }}
      />
      <Stack.Screen
        name="DetallePartido"
        component={DetallePartidoScreen}
        options={{ title: 'Detalle del partido' }}
      />
    </Stack.Navigator>
  );
}
