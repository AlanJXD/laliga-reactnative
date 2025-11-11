// src/navigation/BottomTabs.tsx
import React from "react";
import { Pressable, Platform, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";

import type { RootTabParamList } from "../types/navigation";
import InicioScreen from "../screens/inicio/InicioScreen";
import EquiposScreen from "../screens/equipos/EquiposScreen";
import TorneosScreen from "../screens/torneos/TorneosScreen";
import PerfilScreen from "../screens/perfil/PerfilScreen";

import {
  HomeIcon,
  UserGroupIcon,
  TrophyIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import {
  HomeIcon as HomeIconSolid,
  UserGroupIcon as UserGroupIconSolid,
  TrophyIcon as TrophyIconSolid,
  UserIcon as UserIconSolid,
} from "react-native-heroicons/solid";

const Tab = createBottomTabNavigator<RootTabParamList>();

/** Botón de tab personalizado */
function TabButton(props: any) {
  const { children, onPress, onLongPress, accessibilityState, ...rest } = props;

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
        styles.tabButton,
        { opacity: pressed ? 0.8 : 1 },
      ]}
    >
      {children}
    </Pressable>
  );
}

/** Icono con estilo glass */
function IconWithBounce({
  routeName,
  focused,
  color,
}: {
  routeName: keyof RootTabParamList;
  focused: boolean;
  color: string;
}) {
  const iconProps = { width: 24, height: 24, color };
  let Icon: React.ComponentType<any>;
  
  if (routeName === "Inicio") Icon = focused ? HomeIconSolid : HomeIcon;
  else if (routeName === "Equipos") Icon = focused ? UserGroupIconSolid : UserGroupIcon;
  else if (routeName === "Torneos") Icon = focused ? TrophyIconSolid : TrophyIcon;
  else Icon = focused ? UserIconSolid : UserIcon;

  const svgFix = Platform.OS === "web" ? { display: "block" } : undefined;

  return (
    <Icon {...iconProps} style={svgFix} />
  );
}

// Screens directas sin wrappers
const InicioTab = InicioScreen;
const EquiposTab = EquiposScreen;
const TorneosTab = TorneosScreen;
const PerfilTab = PerfilScreen;

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    height: "100%",
    alignSelf: "stretch",
    padding: 0,
    margin: 0,
    alignItems: "center",
    justifyContent: "center",
    outlineStyle: "none",
  },
  tabBar: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 20,
    height: 70,
    borderRadius: 35,
    overflow: "hidden",
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 30,
    elevation: 10,
    paddingVertical: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  tabBarItem: {
    height: 70,
    padding: 0,
    margin: 0,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 0,
  },
  tabBarIcon: {
    marginTop: 0,
    marginBottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  blurBackground: {
    flex: 1,
    borderRadius: 35,
    backgroundColor: "rgba(255,255,255,0.15)",
    overflow: "hidden",
  },
});

export default function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      sceneContainerStyle={{ backgroundColor: "transparent" }}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#006c4f", // Verde brand para seleccionado
        tabBarInactiveTintColor: "#6b7280", // Gris para no seleccionados

        tabBarButton: (p) => <TabButton {...p} />,

        tabBarItemStyle: styles.tabBarItem,
        tabBarIconStyle: styles.tabBarIcon,
        tabBarStyle: styles.tabBar,
        
        tabBarBackground: () => (
          <BlurView
            tint="light"
            intensity={90}
            style={styles.blurBackground}
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
      <Tab.Screen name="Inicio" component={InicioTab} />
      <Tab.Screen name="Equipos" component={EquiposTab} />
      <Tab.Screen name="Torneos" component={TorneosTab} />
      <Tab.Screen name="Perfil" component={PerfilTab} />
    </Tab.Navigator>
  );
}