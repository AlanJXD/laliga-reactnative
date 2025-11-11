import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  TextInput,
} from 'react-native';
import {
  UserGroupIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  ShareIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from 'react-native-heroicons/outline';
import { CheckCircleIcon } from 'react-native-heroicons/solid';

export default function EquiposScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mis Equipos</Text>
        <TouchableOpacity style={styles.addButton}>
          <PlusCircleIcon size={28} color="#006c4f" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Búsqueda */}
        <View style={styles.searchContainer}>
          <MagnifyingGlassIcon size={20} color="#64748b" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Buscar equipos..."
            placeholderTextColor="#94a3b8"
            style={styles.searchInput}
          />
        </View>

        {/* Mis Equipos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Equipos Activos</Text>

          <View style={styles.teamsGrid}>
            {[
              {
                name: 'Tigres FC',
                logo: '🐯',
                role: 'Capitán',
                members: 15,
                league: 'Liga Premier',
              },
              {
                name: 'Águilas United',
                logo: '🦅',
                role: 'Jugador',
                members: 18,
                league: 'Copa Regional',
              },
              {
                name: 'Leones FC',
                logo: '🦁',
                role: 'Jugador',
                members: 14,
                league: 'Liga Premier',
              },
            ].map((team, index) => (
              <TouchableOpacity key={index} style={styles.teamCard}>
                <View style={styles.teamHeader}>
                  <View style={styles.teamLogo}>
                    <Text style={styles.teamLogoText}>{team.logo}</Text>
                  </View>
                  {team.role === 'Capitán' && (
                    <View style={styles.captainBadge}>
                      <Text style={styles.captainBadgeText}>Capitán</Text>
                    </View>
                  )}
                </View>

                <Text style={styles.teamName}>{team.name}</Text>
                <Text style={styles.teamLeague}>{team.league}</Text>

                <View style={styles.teamStats}>
                  <View style={styles.teamStat}>
                    <UserGroupIcon size={16} color="#64748b" />
                    <Text style={styles.teamStatText}>{team.members}</Text>
                  </View>
                </View>

                <View style={styles.teamActions}>
                  <TouchableOpacity style={styles.teamActionButton}>
                    <ClipboardDocumentListIcon size={18} color="#006c4f" />
                    <Text style={styles.teamActionText}>Plantilla</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.teamActionButton}>
                    <ChartBarIcon size={18} color="#006c4f" />
                    <Text style={styles.teamActionText}>Stats</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Solicitudes Pendientes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Solicitudes Pendientes</Text>
            <View style={styles.pendingBadge}>
              <Text style={styles.pendingBadgeText}>2</Text>
            </View>
          </View>

          <View style={styles.requestsContainer}>
            {[
              {
                name: 'Carlos Méndez',
                position: 'Delantero',
                age: 24,
                team: 'Tigres FC',
              },
              {
                name: 'Juan Rodríguez',
                position: 'Defensa',
                age: 22,
                team: 'Tigres FC',
              },
            ].map((request, index) => (
              <View key={index} style={styles.requestCard}>
                <View style={styles.requestAvatar}>
                  <Text style={styles.requestAvatarText}>
                    {request.name.split(' ').map(n => n[0]).join('')}
                  </Text>
                </View>

                <View style={styles.requestInfo}>
                  <Text style={styles.requestName}>{request.name}</Text>
                  <Text style={styles.requestDetails}>
                    {request.position} • {request.age} años
                  </Text>
                  <Text style={styles.requestTeam}>{request.team}</Text>
                </View>

                <View style={styles.requestActions}>
                  <TouchableOpacity style={styles.acceptButton}>
                    <CheckCircleIcon size={20} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.rejectButton}>
                    <Text style={styles.rejectButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Código de Invitación */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Invitar Jugadores</Text>

          <View style={styles.inviteCard}>
            <View style={styles.inviteIcon}>
              <ShareIcon size={32} color="#006c4f" />
            </View>
            <Text style={styles.inviteTitle}>Código de Invitación</Text>
            <Text style={styles.inviteDescription}>
              Comparte este código para que otros jugadores se unan a tu equipo
            </Text>

            <View style={styles.codeContainer}>
              <Text style={styles.codeText}>TIG-2024-FC</Text>
            </View>

            <TouchableOpacity style={styles.shareButton}>
              <Text style={styles.shareButtonText}>Compartir Código</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Espacio para el tab bar */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 24,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  pendingBadge: {
    backgroundColor: '#ef4444',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pendingBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  teamsGrid: {
    gap: 16,
  },
  teamCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  teamHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  teamLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamLogoText: {
    fontSize: 40,
  },
  captainBadge: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  captainBadgeText: {
    color: '#d97706',
    fontSize: 12,
    fontWeight: 'bold',
  },
  teamName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  teamLeague: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
  },
  teamStats: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  teamStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  teamStatText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '600',
  },
  teamActions: {
    flexDirection: 'row',
    gap: 12,
  },
  teamActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  teamActionText: {
    color: '#006c4f',
    fontSize: 14,
    fontWeight: '600',
  },
  requestsContainer: {
    gap: 12,
  },
  requestCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  requestAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#006c4f',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  requestAvatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  requestInfo: {
    flex: 1,
  },
  requestName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  requestDetails: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 2,
  },
  requestTeam: {
    fontSize: 12,
    color: '#94a3b8',
  },
  requestActions: {
    flexDirection: 'row',
    gap: 8,
  },
  acceptButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#006c4f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rejectButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fee2e2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rejectButtonText: {
    color: '#ef4444',
    fontSize: 20,
    fontWeight: 'bold',
  },
  inviteCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  inviteIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ecfdf5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  inviteTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  inviteDescription: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 20,
  },
  codeContainer: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderStyle: 'dashed',
    marginBottom: 20,
  },
  codeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#006c4f',
    letterSpacing: 2,
  },
  shareButton: {
    backgroundColor: '#006c4f',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
