// src/navigation/BottomTabs.tsx
import React from "react";
import { Pressable, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";

import type { RootTabParamList } from "../types/navigation";
import PartidosStack from "../navigation/stacks/PartidosStack";
import LigasStack from "../navigation/stacks/LigasStack";
import PerfilScreen from "../screens/perfil/PerfilScreen";
import TabSlideWrapper from "../components/TabSlideWrapper";

import {
  CalendarDaysIcon,
  TrophyIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import {
  CalendarDaysIcon as CalendarDaysIconSolid,
  TrophyIcon as TrophyIconSolid,
  UserIcon as UserIconSolid,
} from "react-native-heroicons/solid";

const Tab = createBottomTabNavigator<RootTabParamList>();

/** Botón de tab personalizado — usa Pressable también en web (sin recarga) */
function TabButton(props: any) {
  const { children, onPress, onLongPress, accessibilityState, ...rest } = props;

  // En web prevenimos navegación dura y limpiamos props que puedan generar <a>
  const cleanRest = { ...rest };
  if (Platform.OS === "web") {
    delete (cleanRest as any).href;
    delete (cleanRest as any).to;
    delete (cleanRest as any).target;
  }

  const handlePress = (e: any) => {
    if (Platform.OS === "web") e?.preventDefault?.();
    onPress?.(e);
  };

  return (
    <Pressable
      {...cleanRest}
      onPress={handlePress}
      onLongPress={onLongPress}
      role="tab"
      accessibilityState={accessibilityState}
      style={({ pressed }) => [
        {
          // Ocupa toda la celda sin padding “fantasma”
          flex: 1,
          height: "100%",
          alignSelf: "stretch",
          padding: 0,
          margin: 0,
          alignItems: "center",
          justifyContent: "center",
          outlineStyle: "none" as any,
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      {children}
    </Pressable>
  );
}

/** Icono animado con zoom + fix de baseline para SVG en web */
function IconWithBounce({
  routeName,
  focused,
  color,
}: {
  routeName: keyof RootTabParamList;
  focused: boolean;
  color: string;
}) {
  const scale = useSharedValue(focused ? 1.15 : 1);
  React.useEffect(() => {
    scale.value = withTiming(focused ? 1.15 : 1, { duration: 150 });
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const iconProps = { width: 26, height: 26, color };
  let Icon: React.ComponentType<any>;
  if (routeName === "Partidos") Icon = focused ? CalendarDaysIconSolid : CalendarDaysIcon;
  else if (routeName === "Ligas") Icon = focused ? TrophyIconSolid : TrophyIcon;
  else Icon = focused ? UserIconSolid : UserIcon;

  // Quita espacio de baseline del <svg> en web
  const svgFix = Platform.OS === "web" ? { display: "block" } : undefined;

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          height: "100%",
          alignSelf: "stretch",
          alignItems: "center",
          justifyContent: "center",
        },
      ]}
    >
      <Icon {...iconProps} style={svgFix} />
    </Animated.View>
  );
}

// Wrappers con slide lateral del contenido
function PartidosTab() {
  return (
    <TabSlideWrapper routeName="Partidos">
      <PartidosStack />
    </TabSlideWrapper>
  );
}
function LigasTab() {
  return (
    <TabSlideWrapper routeName="Ligas">
      <LigasStack />
    </TabSlideWrapper>
  );
}
function PerfilTab() {
  return (
    <TabSlideWrapper routeName="Perfil">
      <PerfilScreen />
    </TabSlideWrapper>
  );
}

export default function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Partidos"
      sceneContainerStyle={{ backgroundColor: "transparent" }}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#006c4f",
        tabBarInactiveTintColor: "#1e293b",

        // Botón sin <a> en web → sin padding 5px
        tabBarButton: (p) => <TabButton {...p} />,

        // Asegura cero padding en todos los contenedores
        tabBarItemStyle: {
          height: 70,
          padding: 0,
          margin: 0,
          alignItems: "center",
          justifyContent: "center",
          minHeight: 0,
        },
        tabBarIconStyle: {
          marginTop: 0,
          marginBottom: 0,
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarStyle: {
          position: "absolute",
          left: 20,
          right: 20,
          bottom: 20,
          height: 70,
          borderRadius: 40,
          overflow: "hidden",
          backgroundColor: "transparent",
          borderTopWidth: 0,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 10,
          elevation: 6,
          paddingVertical: 0,
          paddingTop: 0,
          paddingBottom: 0,
        },
        tabBarBackground: () => (
          <BlurView
            tint="light"
            intensity={50}
            style={{
              flex: 1,
              borderRadius: 40,
              backgroundColor: "rgba(255,255,255,0.3)",
            }}
          />
        ),
        tabBarIcon: ({ focused, color }) => (
          <IconWithBounce
            routeName={route.name as keyof RootTabParamList}
            focused={focused}
            color={color}
          />
        ),
      })}
    >
      <Tab.Screen name="Partidos" component={PartidosTab} />
      <Tab.Screen name="Ligas" component={LigasTab} />
      <Tab.Screen name="Perfil" component={PerfilTab} />
    </Tab.Navigator>
  );
}
