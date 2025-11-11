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
  StyleSheet,
  Image,
  Animated,
} from 'react-native';
import { CheckCircleIcon } from 'react-native-heroicons/solid';
import * as Haptics from 'expo-haptics';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'RegistroContacto'>;

export default function RegistroContactoScreen({ navigation, route }: Props) {
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({
    telefono: false,
    email: false,
  });

  const progressWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressWidth, {
      toValue: 66.66,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, []);

  // Validación de email simple
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);

  // Validación de teléfono (10 dígitos)
  const telefonoRegex = /^\d{10}$/;
  const isTelefonoValid = telefonoRegex.test(telefono);

  const isValid = isEmailValid && isTelefonoValid;

  const handleContinuar = () => {
    const newErrors = {
      telefono: !telefonoRegex.test(telefono),
      email: !emailRegex.test(email),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error);

    if (hasErrors) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    navigation.navigate('RegistroPassword', {
      ...route.params,
      telefono,
      email,
    });
  };

  const formatTelefono = (text: string) => {
    // Solo números
    const cleaned = text.replace(/\D/g, '');
    // Limitar a 10 dígitos
    const limited = cleaned.slice(0, 10);
    setTelefono(limited);
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
              source={require('../../../assets/mascota/mascota-telefono.png')}
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
                Paso 2 de 3
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
            ¿Cómo te contactamos?
          </Text>
          <Text style={styles.subtitle}>
            Vincula tu teléfono y correo electrónico
          </Text>

          {/* Formulario */}
          <View style={styles.formContainer}>
            {/* Teléfono */}
            <View>
              <View style={styles.labelRow}>
                <Text style={styles.label}>
                  Teléfono <Text style={styles.required}>*</Text>
                </Text>
                {isTelefonoValid && (
                  <View>
                    <CheckCircleIcon size={20} color="#006c4f" />
                  </View>
                )}
              </View>
              <TextInput
                value={telefono}
                onChangeText={formatTelefono}
                placeholder="10 dígitos"
                keyboardType="phone-pad"
                maxLength={10}
                style={[styles.input, errors.telefono && styles.inputError]}
                placeholderTextColor="#94a3b8"
              />
              {telefono.length > 0 && !isTelefonoValid && (
                <Text style={styles.errorText}>
                  Debe contener 10 dígitos
                </Text>
              )}
            </View>

            {/* Email */}
            <View>
              <View style={styles.labelRow}>
                <Text style={styles.label}>
                  Correo Electrónico <Text style={styles.required}>*</Text>
                </Text>
                {isEmailValid && (
                  <View>
                    <CheckCircleIcon size={20} color="#006c4f" />
                  </View>
                )}
              </View>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="ejemplo@correo.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                style={[styles.input, errors.email && styles.inputError]}
                placeholderTextColor="#94a3b8"
              />
              {email.length > 0 && !isEmailValid && (
                <Text style={styles.errorText}>
                  Ingresa un correo válido
                </Text>
              )}
            </View>

            {/* Info adicional */}
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                💡 Estos datos serán utilizados para recuperar tu cuenta y
                enviarte notificaciones importantes.
              </Text>
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
  emoji: {
    fontSize: 60,
    fontFamily: 'System',
  },
  mascotaImage: {
    width: 140,
    height: 140,
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
    fontFamily: 'System',
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
    fontFamily: 'System',
  },
  subtitle: {
    color: '#64748b',
    marginBottom: 32,
    fontFamily: 'System',
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
    fontFamily: 'System',
  },
  required: {
    color: '#ef4444',
    fontFamily: 'System',
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
    fontFamily: 'System',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    marginTop: 4,
    marginLeft: 8,
    fontFamily: 'System',
  },
  inputError: {
    borderColor: '#ef4444',
    borderWidth: 2,
  },
  infoBox: {
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#bfdbfe',
    borderRadius: 12,
    padding: 16,
  },
  infoText: {
    color: '#1e40af',
    fontSize: 14,
    fontFamily: 'System',
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
    fontFamily: 'System',
  },
  backButton: {
    paddingVertical: 16,
  },
  backButtonText: {
    color: '#64748b',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'System',
  },
});
