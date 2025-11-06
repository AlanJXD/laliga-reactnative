import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { PartidosStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<PartidosStackParamList, 'PartidosMain'>;

type Partido = { id: string; local: string; visita: string };

const mock: Partido[] = [
  { id: '101', local: 'Tepic FC', visita: 'Coras' },
  { id: '102', local: 'Los Pumas', visita: 'Tigres Nayarit' },
];

export default function PartidosScreen({ navigation }: Props) {
  return (
    <View className="flex-1 bg-background">
      <FlatList
        data={mock}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12, gap: 12 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-background rounded-xl border border-background px-4 py-3"
            activeOpacity={0.7}
            onPress={() => navigation.navigate('DetallePartido', { id: item.id })}
          >
            <Text className="text-base font-semibold">
              {item.local} vs {item.visita}
            </Text>
            <Text className="text-neutral-700">ID: {item.id}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
