import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { LigasStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<LigasStackParamList, 'LigasMain'>;

type Liga = { id: string; nombre: string };

const ligas: Liga[] = [
  { id: 'mx', nombre: 'Liga MX' },
  { id: 'prem', nombre: 'Premier League' },
];

export default function LigasScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ligas</Text>
      <FlatList
        data={ligas}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('DetalleLiga', { id: item.id })}
          >
            <Text>{item.nombre}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 12 },
  item: { padding: 16, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
});
