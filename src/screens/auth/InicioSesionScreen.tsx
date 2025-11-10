import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
  StyleSheet,
} from 'react-native';
import { EyeIcon, EyeSlashIcon } from 'react-native-heroicons/solid';
import * as Haptics from 'expo-haptics';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'InicioSesion'>;

export default function InicioSesionScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);
  const isValid = isEmailValid && password.length >= 6;

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (text.length > 0) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  const handleLogin = () => {
    // Redirigir directamente a la app principal (partidos)
    navigation.navigate('MainApp');
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
              source={require('../../../assets/mascota/mascota-abrazo.png')}
              style={styles.mascotaImage}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.content}>
          {/* Título */}
          <Text style={styles.title}>
            ¡Bienvenido de vuelta!
          </Text>
          <Text style={styles.subtitle}>
            Inicia sesión para continuar
          </Text>

          {/* Formulario */}
          <View style={styles.formContainer}>
            {/* Email */}
            <View>
              <Text style={styles.label}>
                Correo Electrónico
              </Text>
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
            </View>

            {/* Contraseña */}
            <View>
              <Text style={styles.label}>Contraseña</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  value={password}
                  onChangeText={handlePasswordChange}
                  placeholder="Tu contraseña"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  style={[styles.passwordInput, errors.password && styles.inputError]}
                  placeholderTextColor="#94a3b8"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  {showPassword ? (
                    <EyeSlashIcon size={24} color="#64748b" />
                  ) : (
                    <EyeIcon size={24} color="#64748b" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Olvidé mi contraseña */}
            <View>
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>
                  ¿Olvidaste tu contraseña?
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Botones */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleLogin}
              style={[styles.button, styles.buttonActive]}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>
                Iniciar Sesión
              </Text>
            </TouchableOpacity>

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>¿No tienes cuenta?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('RegistroIdentidad')}>
                <Text style={styles.signupLink}>Regístrate</Text>
              </TouchableOpacity>
            </View>

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
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eaeaea',
    paddingTop: 60,
  },
  avatarCircle: {
    width: 192,
    height: 192,
    backgroundColor: 'rgba(0, 108, 79, 0.1)',
    borderRadius: 96,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mascotaImage: {
    width: 150,
    height: 150,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 32,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
    fontFamily: 'System',
  },
  subtitle: {
    color: '#64748b',
    marginBottom: 40,
    fontFamily: 'System',
  },
  formContainer: {
    gap: 20,
  },
  label: {
    color: '#334155',
    fontWeight: '500',
    marginBottom: 8,
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
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingRight: 48,
    color: '#1e293b',
    fontSize: 16,
    outlineColor: '#006c4f',
    fontFamily: 'System',
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  inputError: {
    borderColor: '#ef4444',
    borderWidth: 2,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    color: '#006c4f',
    fontWeight: '600',
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
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  signupText: {
    color: '#64748b',
    fontFamily: 'System',
  },
  signupLink: {
    color: '#006c4f',
    fontWeight: '600',
    fontFamily: 'System',
  },
  backButton: {
    paddingVertical: 8,
  },
  backButtonText: {
    color: '#64748b',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'System',
  },
});
