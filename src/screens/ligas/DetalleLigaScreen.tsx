import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { LigasStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<LigasStackParamList, 'DetalleLiga'>;

export default function DetalleLigaScreen({ route }: Props) {
  const { id } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle de liga: {id.toUpperCase()}</Text>
      <Text>Equipos, tabla, calendario…</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 6, fontFamily: 'System' },
});
