import React, { useState, useRef, useEffect } from 'react';
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
import Animated, { FadeInUp } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { CheckCircleIcon } from 'react-native-heroicons/solid';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'VerificacionCorreo'>;

export default function VerificacionCorreoScreen({ navigation, route }: Props) {
  const [code, setCode] = useState(['', '', '', '']);
  const [resendTimer, setResendTimer] = useState(60);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const { email } = route.params;

  // Timer para reenviar código
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleChangeText = (text: string, index: number) => {
    // Solo permitir números
    const numericText = text.replace(/[^0-9]/g, '');

    if (numericText.length > 1) {
      // Si se pegan múltiples dígitos, distribuirlos
      const digits = numericText.slice(0, 4).split('');
      const newCode = [...code];
      digits.forEach((digit, i) => {
        if (index + i < 4) {
          newCode[index + i] = digit;
        }
      });
      setCode(newCode);

      // Haptic feedback
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

      // Mover al último input llenado
      const nextIndex = Math.min(index + digits.length, 3);
      inputRefs.current[nextIndex]?.focus();
    } else if (numericText.length === 1) {
      const newCode = [...code];
      newCode[index] = numericText;
      setCode(newCode);

      // Haptic feedback al escribir
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

      // Mover al siguiente input
      if (index < 3) {
        inputRefs.current[index + 1]?.focus();
      } else {
        // Si es el último, quitar el foco
        inputRefs.current[index]?.blur();
      }
    } else if (numericText.length === 0) {
      // Borrar
      const newCode = [...code];
      newCode[index] = '';
      setCode(newCode);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && code[index] === '' && index > 0) {
      // Mover al input anterior si está vacío
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerificar = () => {
    const fullCode = code.join('');
    if (fullCode.length === 4) {
      // Haptic feedback de éxito
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      // Aquí iría la lógica de verificación
      Alert.alert(
        '¡Registro Exitoso! 🎉',
        'Tu cuenta ha sido verificada correctamente.',
        [
          {
            text: 'Continuar',
            onPress: () => {
              navigation.navigate('MainApp');
            },
          },
        ]
      );
    } else {
      // Haptic feedback de error
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert('Error', 'Por favor ingresa los 4 dígitos del código');
    }
  };

  const handleReenviar = () => {
    if (resendTimer === 0) {
      // Lógica para reenviar código
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setResendTimer(60);
      Alert.alert('Código Reenviado', `Se ha enviado un nuevo código a ${email}`);
    }
  };

  const isCodeComplete = code.every((digit) => digit !== '');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Espacio para imagen animada */}
        <View style={styles.headerContainer}>
          <View style={styles.avatarCircle}>
            <Image
              source={require('../../../assets/mascota/mascota-laptop.png')}
              style={styles.mascotaImage}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.content}>
          {/* Título */}
          <Text style={styles.title}>
            Verifica tu correo
          </Text>
          <Text style={styles.subtitle}>
            Hemos enviado un código de 4 dígitos a:
          </Text>
          <Text style={styles.email}>{email}</Text>

          {/* Instrucción */}
          <Text style={styles.instruction}>
            Ingresa el código de verificación
          </Text>

          {/* Inputs de código */}
          <Animated.View entering={FadeInUp.delay(300).duration(600)} style={styles.codeInputsContainer}>
            {code.map((digit, index) => (
              <View key={index} style={styles.codeInputWrapper}>
                <TextInput
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  value={digit}
                  onChangeText={(text) => handleChangeText(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  style={styles.codeInput}
                  placeholderTextColor="#cbd5e1"
                  selectTextOnFocus
                />
                {digit !== '' && (
                  <View style={styles.checkIcon}>
                    <CheckCircleIcon size={24} color="#006c4f" />
                  </View>
                )}
              </View>
            ))}
          </Animated.View>

          {/* Indicador visual de progreso */}
          <View style={styles.progressIndicatorContainer}>
            {code.map((digit, index) => (
              <View
                key={index}
                style={[
                  styles.progressIndicatorBar,
                  digit !== '' ? styles.progressIndicatorBarFilled : styles.progressIndicatorBarEmpty
                ]}
              />
            ))}
          </View>

          {/* Reenviar código */}
          <View style={styles.resendContainer}>
            {resendTimer > 0 ? (
              <Text style={styles.resendTimerText}>
                Reenviar código en{' '}
                <Text style={styles.resendTimerValue}>
                  {resendTimer}s
                </Text>
              </Text>
            ) : (
              <TouchableOpacity onPress={handleReenviar}>
                <Text style={styles.resendButton}>
                  Reenviar código
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Botones */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleVerificar}
              disabled={!isCodeComplete}
              style={[styles.button, isCodeComplete ? styles.buttonActive : styles.buttonDisabled]}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>
                Verificar
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
  scrollViewContent: {
    flexGrow: 1,
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
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 32,
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
    marginBottom: 8,
    fontFamily: 'System',
  },
  email: {
    color: '#006c4f',
    fontWeight: '600',
    marginBottom: 32,
    fontFamily: 'System',
  },
  instruction: {
    color: '#334155',
    fontWeight: '500',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'System',
  },
  codeInputsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 32,
  },
  codeInputWrapper: {
    position: 'relative',
  },
  codeInput: {
    width: 64,
    height: 80,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1e293b',
    outlineColor: '#006c4f',
    fontFamily: 'System',
  },
  checkIcon: {
    position: 'absolute',
    top: -8,
    right: -8,
  },
  progressIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 32,
  },
  progressIndicatorBar: {
    height: 8,
    width: 48,
    borderRadius: 9999,
  },
  progressIndicatorBarFilled: {
    backgroundColor: '#006c4f',
  },
  progressIndicatorBarEmpty: {
    backgroundColor: '#e2e8f0',
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  resendTimerText: {
    color: '#64748b',
    fontSize: 14,
    fontFamily: 'System',
  },
  resendTimerValue: {
    fontWeight: '600',
    color: '#006c4f',
    fontFamily: 'System',
  },
  resendButton: {
    color: '#006c4f',
    fontWeight: '600',
    fontFamily: 'System',
  },
  buttonContainer: {
    gap: 16,
    marginTop: 'auto',
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
