import React from 'react';
import "./global.css";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import BottomTabs from './src/components/BottomTabs';
import type { RootStackParamList } from './src/types/navigation';

// Pantallas de autenticación
import BienvenidaScreen from './src/screens/auth/BienvenidaScreen';
import RegistroIdentidadScreen from './src/screens/auth/RegistroIdentidadScreen';
import RegistroContactoScreen from './src/screens/auth/RegistroContactoScreen';
import RegistroPasswordScreen from './src/screens/auth/RegistroPasswordScreen';
import VerificacionCorreoScreen from './src/screens/auth/VerificacionCorreoScreen';
import InicioSesionScreen from './src/screens/auth/InicioSesionScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: '#eaeaea' }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Bienvenida"
          screenOptions={{
            headerShown: false,
            animation: 'default', // Usa animaciones nativas de iOS/Android
          }}
        >
          {/* Pantallas de autenticación */}
          <Stack.Screen name="Bienvenida" component={BienvenidaScreen} />
          <Stack.Screen name="RegistroIdentidad" component={RegistroIdentidadScreen} />
          <Stack.Screen name="RegistroContacto" component={RegistroContactoScreen} />
          <Stack.Screen name="RegistroPassword" component={RegistroPasswordScreen} />
          <Stack.Screen name="VerificacionCorreo" component={VerificacionCorreoScreen} />
          <Stack.Screen name="InicioSesion" component={InicioSesionScreen} />

          {/* App principal */}
          <Stack.Screen name="MainApp" component={BottomTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
