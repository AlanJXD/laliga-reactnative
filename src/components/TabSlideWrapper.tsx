import React, { useEffect, useState, useRef } from 'react';
import { ViewStyle, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { useIsFocused, useNavigationState } from '@react-navigation/native';

type Props = {
  children: React.ReactNode;
  duration?: number;
  style?: ViewStyle;
  routeName: string;
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Orden de las tabs para detectar dirección
const TAB_ORDER = ['Partidos', 'Ligas', 'Perfil'];

export default function TabSlideWrapper({ children, duration = 300, style, routeName }: Props) {
  const isFocused = useIsFocused();

  // Obtener el índice actual de navegación
  const currentTabIndex = useNavigationState(state => {
    const tabState = state.routes[0]?.state;
    return tabState?.index ?? 0;
  });

  // Índice de esta ruta específica
  const routeIndex = TAB_ORDER.indexOf(routeName);

  // Guardar el índice previo para detectar dirección
  const prevTabIndexRef = useRef(currentTabIndex);

  // Valores animados
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(isFocused ? 1 : 0);

  // Oculta realmente tras el slide-out
  const [hidden, setHidden] = useState(!isFocused);

  useEffect(() => {
    if (isFocused) {
      // Esta tab está entrando
      if (hidden) setHidden(false);

      // Detectar de dónde viene: comparar índice previo con índice actual
      const fromIndex = prevTabIndexRef.current;
      const toIndex = currentTabIndex;

      // LÓGICA INVERTIDA: coincide con la posición física de las tabs
      // Si vamos de Partidos (0) → Ligas (1): viene desde la IZQUIERDA (movimiento hacia derecha)
      // Si vamos de Ligas (1) → Partidos (0): viene desde la DERECHA (movimiento hacia izquierda)
      let slideDirection = -1; // Por defecto desde la izquierda
      if (fromIndex < toIndex) {
        // Navegando hacia adelante (Partidos→Ligas→Perfil): viene desde la IZQUIERDA
        slideDirection = -1;
      } else if (fromIndex > toIndex) {
        // Navegando hacia atrás (Perfil→Ligas→Partidos): viene desde la DERECHA
        slideDirection = 1;
      }

      // Iniciar desde fuera de la pantalla
      translateX.value = SCREEN_WIDTH * slideDirection;
      opacity.value = 0;

      // Animación de entrada con spring para efecto natural
      translateX.value = withSpring(0, {
        damping: 20,
        stiffness: 90,
        mass: 0.8,
      });

      opacity.value = withTiming(1, {
        duration: duration - 50,
        easing: Easing.out(Easing.cubic),
      });

      // Actualizar el índice previo
      prevTabIndexRef.current = currentTabIndex;
    } else {
      // Esta tab está saliendo
      const toIndex = currentTabIndex;

      // LÓGICA INVERTIDA para la salida
      // Si vamos de Partidos (0) → Ligas (1): sale hacia la DERECHA
      // Si vamos de Ligas (1) → Partidos (0): sale hacia la IZQUIERDA
      let slideDirection = 1; // Por defecto hacia la derecha
      if (prevTabIndexRef.current < toIndex) {
        // Navegando hacia adelante: esta tab sale hacia la DERECHA
        slideDirection = 1;
      } else if (prevTabIndexRef.current > toIndex) {
        // Navegando hacia atrás: esta tab sale hacia la IZQUIERDA
        slideDirection = -1;
      }

      translateX.value = withSpring(SCREEN_WIDTH * slideDirection, {
        damping: 20,
        stiffness: 90,
        mass: 0.8,
      });

      opacity.value = withTiming(
        0,
        {
          duration: duration - 50,
          easing: Easing.in(Easing.cubic)
        },
        (finished) => {
          if (finished) runOnJS(setHidden)(true);
        }
      );

      // Actualizar el índice previo
      prevTabIndexRef.current = currentTabIndex;
    }
  }, [isFocused, currentTabIndex]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        { flex: 1 },
        animatedStyle,
        hidden
          ? { position: 'absolute', inset: 0, zIndex: -1 }
          : { position: 'relative', zIndex: 0 },
        style,
      ]}
      pointerEvents={hidden ? 'none' : 'auto'}
      collapsable={false}
      removeClippedSubviews
    >
      {children}
    </Animated.View>
  );
}
