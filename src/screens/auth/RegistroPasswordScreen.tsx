import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import Animated, { FadeInUp, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import {
  CheckCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from 'react-native-heroicons/solid';
import { XCircleIcon } from 'react-native-heroicons/outline';
import * as Haptics from 'expo-haptics';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'RegistroPassword'>;

export default function RegistroPasswordScreen({ navigation, route }: Props) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState({
    password: false,
    confirmPassword: false,
    acceptTerms: false,
  });

  const progressWidth = useSharedValue(0);

  useEffect(() => {
    progressWidth.value = withTiming(100, { duration: 800 });
  }, []);

  const animatedProgressStyle = useAnimatedStyle(() => {
    return {
      width: `${progressWidth.value}%`,
    };
  });

  // Validaciones de contraseña simplificadas
  const hasMinLength = password.length >= 8;
  const hasNumber = /[0-9]/.test(password);

  const isPasswordValid = hasMinLength && hasNumber;
  const passwordsMatch = password === confirmPassword && password.length > 0;

  const isValid = isPasswordValid && passwordsMatch && acceptTerms;

  const handleContinuar = () => {
    const newErrors = {
      password: !isPasswordValid,
      confirmPassword: !passwordsMatch,
      acceptTerms: !acceptTerms,
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error);

    if (hasErrors) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    navigation.navigate('VerificacionCorreo', {
      ...route.params,
      password,
    });
  };

  const ValidationItem = ({
    isValid,
    text,
  }: {
    isValid: boolean;
    text: string;
  }) => (
    <View style={styles.validationItem}>
      {isValid ? (
        <CheckCircleIcon size={18} color="#006c4f" />
      ) : (
        <XCircleIcon size={18} color="#94a3b8" />
      )}
      <Text style={isValid ? styles.validationTextValid : styles.validationTextInvalid}>
        {text}
      </Text>
    </View>
  );

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
            <Text style={styles.emoji}>🔐</Text>
          </View>
        </View>

        <View style={styles.content}>
          {/* Barra de progreso */}
          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressText}>
                Paso 3 de 3
              </Text>
            </View>
            <View style={styles.progressBarBackground}>
              <Animated.View style={[styles.progressBarFilled, animatedProgressStyle]} />
            </View>
          </View>

          {/* Título */}
          <Text style={styles.title}>
            Protege tu cuenta
          </Text>
          <Text style={styles.subtitle}>
            Crea una contraseña segura
          </Text>

          {/* Formulario */}
          <Animated.View entering={FadeInUp.delay(300).duration(600)} style={styles.formContainer}>
            {/* Contraseña */}
            <View>
              <View style={styles.labelRow}>
                <Text style={styles.label}>
                  Contraseña <Text style={styles.required}>*</Text>
                </Text>
              </View>
              <View style={styles.passwordContainer}>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Mínimo 8 caracteres"
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

              {/* Validaciones de contraseña */}
              {password.length > 0 && (
                <View style={styles.validationBox}>
                  <ValidationItem
                    isValid={hasMinLength}
                    text="Mínimo 8 caracteres"
                  />
                  <ValidationItem isValid={hasNumber} text="Un número" />
                </View>
              )}
            </View>

            {/* Confirmar Contraseña */}
            <View>
              <View style={styles.labelRow}>
                <Text style={styles.label}>
                  Confirmar Contraseña <Text style={styles.required}>*</Text>
                </Text>
                {passwordsMatch && (
                  <View>
                    <CheckCircleIcon size={20} color="#006c4f" />
                  </View>
                )}
              </View>
              <View style={styles.passwordContainer}>
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Repite tu contraseña"
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  style={[styles.passwordInput, errors.confirmPassword && styles.inputError]}
                  placeholderTextColor="#94a3b8"
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeIcon}
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon size={24} color="#64748b" />
                  ) : (
                    <EyeIcon size={24} color="#64748b" />
                  )}
                </TouchableOpacity>
              </View>
              {confirmPassword.length > 0 && !passwordsMatch && (
                <Text style={styles.errorText}>
                  Las contraseñas no coinciden
                </Text>
              )}
            </View>

            {/* Términos y condiciones */}
            <View>
              <TouchableOpacity
                onPress={() => setAcceptTerms(!acceptTerms)}
                style={styles.termsContainer}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.checkbox,
                    acceptTerms ? styles.checkboxChecked : styles.checkboxUnchecked,
                    errors.acceptTerms && styles.checkboxError
                  ]}
                >
                  {acceptTerms && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.termsText}>
                  Acepto los{' '}
                  <Text style={styles.termsLink}>
                    Términos y Condiciones
                  </Text>{' '}
                  y la{' '}
                  <Text style={styles.termsLink}>
                    Política de Privacidad
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

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
  validationBox: {
    marginTop: 12,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  validationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  validationTextValid: {
    color: '#006c4f',
    fontSize: 14,
    fontFamily: 'System',
  },
  validationTextInvalid: {
    color: '#94a3b8',
    fontSize: 14,
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
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: '#006c4f',
    borderColor: '#006c4f',
  },
  checkboxUnchecked: {
    backgroundColor: '#ffffff',
    borderColor: '#cbd5e1',
  },
  checkboxError: {
    borderColor: '#ef4444',
    borderWidth: 2,
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  termsText: {
    flex: 1,
    color: '#334155',
    lineHeight: 20,
    fontFamily: 'System',
  },
  termsLink: {
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
