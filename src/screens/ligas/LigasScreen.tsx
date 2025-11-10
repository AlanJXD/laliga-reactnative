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
    <View className="flex-1 bg-background p-4">
      <Text className="text-2xl font-semibold mb-3">Ligas</Text>
      <FlatList
        data={ligas}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="p-4 rounded-lg border border-gray-300 bg-white"
            onPress={() => navigation.navigate('DetalleLiga', { id: item.id })}
          >
            <Text>{item.nombre}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View className="h-2" />}
      />
    </View>
  );
}