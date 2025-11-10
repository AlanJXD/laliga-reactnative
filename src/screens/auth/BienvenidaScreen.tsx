import React from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Bienvenida'>;

export default function BienvenidaScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Mascota principal */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../assets/mascota/mascota-base.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Contenido inferior */}
      <View style={styles.content}>
        {/* Título */}
        <Text style={styles.title}>
          MayaSports
        </Text>

        {/* Descripción */}
        <Text style={styles.description}>
          Gestión de ligas, equipos, jugadores y partidos.
        </Text>

        {/* Botones */}
        <View style={styles.buttonsContainer}>
          {/* Botón Empezar Registro */}
          <TouchableOpacity
            onPress={() => navigation.navigate('RegistroIdentidad')}
            style={styles.primaryButton}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Empezar Registro</Text>
          </TouchableOpacity>

          {/* Botón Ya tengo cuenta */}
          <TouchableOpacity
            onPress={() => navigation.navigate('InicioSesion')}
            style={styles.secondaryButton}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Ya tengo una cuenta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 140,
  },
  image: {
    width: 350,
    height: 350,
  },
  content: {
    paddingHorizontal: 32,
    paddingBottom: 48,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#006c4f',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'System',
  },
  description: {
    color: '#64748b',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 16,
    paddingHorizontal: 16,
    fontFamily: 'System',
  },
  buttonsContainer: {
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#006c4f',
    borderRadius: 16,
    paddingVertical: 20,
  },
  primaryButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'System',
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#006c4f',
    borderRadius: 16,
    paddingVertical: 20,
  },
  secondaryButtonText: {
    color: '#006c4f',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'System',
  },
});
