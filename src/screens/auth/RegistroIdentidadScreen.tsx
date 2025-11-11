import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Image,
  StyleSheet,
  Animated,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { CheckCircleIcon, ChevronDownIcon } from 'react-native-heroicons/solid';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'RegistroIdentidad'>;

export default function RegistroIdentidadScreen({ navigation }: Props) {
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [estado, setEstado] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [showEstadoPicker, setShowEstadoPicker] = useState(false);
  const [showCiudadPicker, setShowCiudadPicker] = useState(false);

  const [errors, setErrors] = useState({
    nombre: false,
    apellidoPaterno: false,
    apellidoMaterno: false,
    estado: false,
    ciudad: false,
  });

  const progressWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressWidth, {
      toValue: 33.33,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, []);

  const handleContinuar = () => {
    const newErrors = {
      nombre: nombre.trim().length < 2,
      apellidoPaterno: apellidoPaterno.trim().length < 2,
      apellidoMaterno: apellidoMaterno.trim().length < 2,
      estado: estado.trim().length < 2,
      ciudad: ciudad.trim().length < 2,
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error);

    if (hasErrors) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    navigation.navigate('RegistroContacto', {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      estado,
      ciudad,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Espacio para imagen animada */}
        <View style={styles.headerContainer}>
          <View style={styles.avatarCircle}>
            <Image
              source={require('../../../assets/mascota/mascota-identificacion.png')}
              style={styles.mascotaImage}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.content}>
          {/* Barra de progreso */}
          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressText}>
                Paso 1 de 3
              </Text>
            </View>
            <View style={styles.progressBarBackground}>
              <Animated.View
                style={[
                  styles.progressBarFilled,
                  { width: progressWidth.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%']
                  })}
                ]}
              />
            </View>
          </View>

          {/* Título */}
          <Text style={styles.title}>
            Cuéntanos sobre ti
          </Text>
          <Text style={styles.subtitle}>
            Empecemos con tu identidad
          </Text>

          {/* Formulario */}
          <View style={styles.formContainer}>
            {/* Nombre */}
            <View>
              <View style={styles.labelRow}>
                <Text style={styles.label}>
                  Nombre(s) <Text style={styles.required}>*</Text>
                </Text>
                {nombre.length >= 2 && (
                  <View>
                    <CheckCircleIcon size={20} color="#006c4f" />
                  </View>
                )}
              </View>
              <TextInput
                value={nombre}
                onChangeText={setNombre}
                placeholder="Ej: Juan Carlos"
                style={[styles.input, errors.nombre && styles.inputError]}
                placeholderTextColor="#94a3b8"
              />
            </View>

            {/* Apellido Paterno */}
            <View>
              <View style={styles.labelRow}>
                <Text style={styles.label}>
                  Apellido Paterno <Text style={styles.required}>*</Text>
                </Text>
                {apellidoPaterno.length >= 2 && (
                  <View>
                    <CheckCircleIcon size={20} color="#006c4f" />
                  </View>
                )}
              </View>
              <TextInput
                value={apellidoPaterno}
                onChangeText={setApellidoPaterno}
                placeholder="Ej: Pérez"
                style={[styles.input, errors.apellidoPaterno && styles.inputError]}
                placeholderTextColor="#94a3b8"
              />
            </View>

            {/* Apellido Materno */}
            <View>
              <View style={styles.labelRow}>
                <Text style={styles.label}>
                  Apellido Materno <Text style={styles.required}>*</Text>
                </Text>
                {apellidoMaterno.length >= 2 && (
                  <View>
                    <CheckCircleIcon size={20} color="#006c4f" />
                  </View>
                )}
              </View>
              <TextInput
                value={apellidoMaterno}
                onChangeText={setApellidoMaterno}
                placeholder="Ej: García"
                style={[styles.input, errors.apellidoMaterno && styles.inputError]}
                placeholderTextColor="#94a3b8"
              />
            </View>

            {/* Estado */}
            <View>
              <View style={styles.labelRow}>
                <Text style={styles.label}>
                  Estado <Text style={styles.required}>*</Text>
                </Text>
                {estado.length >= 2 && (
                  <View>
                    <CheckCircleIcon size={20} color="#006c4f" />
                  </View>
                )}
              </View>
              <TouchableOpacity
                onPress={() => {
                  setEstado('Nayarit');
                  setShowEstadoPicker(false);
                }}
                style={[styles.picker, errors.estado && styles.pickerError]}
              >
                <Text
                  style={estado ? styles.pickerTextFilled : styles.pickerTextPlaceholder}
                >
                  {estado || 'Selecciona un estado'}
                </Text>
                <ChevronDownIcon size={20} color="#64748b" />
              </TouchableOpacity>
            </View>

            {/* Ciudad */}
            <View>
              <View style={styles.labelRow}>
                <Text style={styles.label}>
                  Ciudad <Text style={styles.required}>*</Text>
                </Text>
                {ciudad.length >= 2 && (
                  <View>
                    <CheckCircleIcon size={20} color="#006c4f" />
                  </View>
                )}
              </View>
              <TouchableOpacity
                onPress={() => {
                  setCiudad('Tepic');
                  setShowCiudadPicker(false);
                }}
                style={[styles.picker, errors.ciudad && styles.pickerError]}
              >
                <Text
                  style={ciudad ? styles.pickerTextFilled : styles.pickerTextPlaceholder}
                >
                  {ciudad || 'Selecciona una ciudad'}
                </Text>
                <ChevronDownIcon size={20} color="#64748b" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Botones */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleContinuar}
              style={[styles.button, styles.buttonActive]}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>
                Continuar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
              activeOpacity={0.8}
            >
              <Text style={styles.backButtonText}>
                Volver
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
  },
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eaeaea',
    paddingTop: 60,
  },
  avatarCircle: {
    width: 160,
    height: 160,
    backgroundColor: 'rgba(0, 108, 79, 0.1)',
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mascotaImage: {
    width: 130,
    height: 130,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 32,
  },
  progressContainer: {
    marginBottom: 32,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  progressPercentage: {
    fontSize: 14,
    color: '#006c4f',
    fontWeight: '600',
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 9999,
    overflow: 'hidden',
  },
  progressBarFilled: {
    height: '100%',
    backgroundColor: '#006c4f',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    color: '#64748b',
    marginBottom: 32,
  },
  formContainer: {
    gap: 20,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    color: '#334155',
    fontWeight: '500',
  },
  required: {
    color: '#ef4444',
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: '#1e293b',
    fontSize: 16,
    outlineColor: '#006c4f',
  },
  picker: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    outlineColor: '#006c4f',
  },
  pickerTextFilled: {
    color: '#1e293b',
  },
  pickerTextPlaceholder: {
    color: '#94a3b8',
  },
  buttonContainer: {
    marginTop: 32,
    gap: 16,
  },
  button: {
    borderRadius: 16,
    paddingVertical: 20,
  },
  buttonActive: {
    backgroundColor: '#006c4f',
  },
  buttonDisabled: {
    backgroundColor: '#94a3b8',
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    paddingVertical: 16,
  },
  backButtonText: {
    color: '#64748b',
    textAlign: 'center',
    fontSize: 16,
  },
  inputError: {
    borderColor: '#ef4444',
    borderWidth: 2,
  },
  pickerError: {
    borderColor: '#ef4444',
    borderWidth: 2,
  },
});
