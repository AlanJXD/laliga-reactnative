import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { PartidosStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<PartidosStackParamList, 'DetallePartido'>;

export default function DetallePartidoScreen({ route }: Props) {
  const { id } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle del partido {id}</Text>
      <Text>Estadio, fecha, árbitro, etc…</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 6 },
});
