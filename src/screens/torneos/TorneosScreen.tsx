import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {
  TrophyIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  PlusIcon,
} from 'react-native-heroicons/outline';

export default function TorneosScreen() {
  const [selectedTab, setSelectedTab] = useState<'activas' | 'disponibles'>('activas');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Torneos</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'activas' && styles.tabActive]}
          onPress={() => setSelectedTab('activas')}
        >
          <Text style={[styles.tabText, selectedTab === 'activas' && styles.tabTextActive]}>
            Mis Ligas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'disponibles' && styles.tabActive]}
          onPress={() => setSelectedTab('disponibles')}
        >
          <Text style={[styles.tabText, selectedTab === 'disponibles' && styles.tabTextActive]}>
            Disponibles
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {selectedTab === 'activas' ? (
          <>
            {/* Ligas Activas */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Ligas Activas</Text>

              <View style={styles.ligasContainer}>
                {[
                  {
                    name: 'Liga Premier Nayarit',
                    logo: '🏆',
                    season: 'Temporada 2024-2025',
                    teams: 12,
                    matches: 22,
                  },
                  {
                    name: 'Copa Regional',
                    logo: '🥇',
                    season: 'Torneo Apertura 2024',
                    teams: 16,
                    matches: 15,
                  },
                ].map((liga, index) => (
                  <TouchableOpacity key={index} style={styles.ligaCard}>
                    <View style={styles.ligaHeader}>
                      <View style={styles.ligaLogo}>
                        <Text style={styles.ligaLogoText}>{liga.logo}</Text>
                      </View>
                      <View style={styles.ligaBadge}>
                        <View style={styles.activeDot} />
                        <Text style={styles.ligaBadgeText}>Activa</Text>
                      </View>
                    </View>

                    <Text style={styles.ligaName}>{liga.name}</Text>
                    <Text style={styles.ligaSeason}>{liga.season}</Text>

                    <View style={styles.ligaStats}>
                      <View style={styles.ligaStat}>
                        <Text style={styles.ligaStatValue}>{liga.teams}</Text>
                        <Text style={styles.ligaStatLabel}>Equipos</Text>
                      </View>
                      <View style={styles.ligaStatDivider} />
                      <View style={styles.ligaStat}>
                        <Text style={styles.ligaStatValue}>{liga.matches}</Text>
                        <Text style={styles.ligaStatLabel}>Partidos</Text>
                      </View>
                    </View>

                    <View style={styles.ligaActions}>
                      <TouchableOpacity style={styles.ligaActionButton}>
                        <ChartBarIcon size={18} color="#006c4f" />
                        <Text style={styles.ligaActionText}>Tabla</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.ligaActionButton}>
                        <CalendarDaysIcon size={18} color="#006c4f" />
                        <Text style={styles.ligaActionText}>Calendario</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Tabla de Posiciones */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Tabla de Posiciones</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAll}>Ver completa</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.tableCard}>
                <Text style={styles.tableTitle}>Liga Premier Nayarit</Text>

                <View style={styles.tableHeader}>
                  <Text style={[styles.tableHeaderText, { flex: 0.5 }]}>#</Text>
                  <Text style={[styles.tableHeaderText, { flex: 2 }]}>Equipo</Text>
                  <Text style={[styles.tableHeaderText, { flex: 0.5, textAlign: 'center' }]}>PJ</Text>
                  <Text style={[styles.tableHeaderText, { flex: 0.5, textAlign: 'center' }]}>Pts</Text>
                </View>

                {[
                  { position: 1, team: 'Tigres FC', logo: '🐯', played: 9, points: 24 },
                  { position: 2, team: 'Águilas United', logo: '🦅', played: 9, points: 21 },
                  { position: 3, team: 'Leones FC', logo: '🦁', played: 9, points: 19 },
                  { position: 4, team: 'Pumas FC', logo: '🐾', played: 9, points: 17 },
                  { position: 5, team: 'Jaguares', logo: '🐆', played: 9, points: 15 },
                ].map((row, index) => (
                  <View
                    key={index}
                    style={[
                      styles.tableRow,
                      index < 3 && styles.tableRowHighlight,
                    ]}
                  >
                    <Text style={[styles.tableCell, { flex: 0.5, fontWeight: 'bold' }]}>
                      {row.position}
                    </Text>
                    <View style={[styles.tableTeam, { flex: 2 }]}>
                      <Text style={styles.tableTeamLogo}>{row.logo}</Text>
                      <Text style={styles.tableTeamName}>{row.team}</Text>
                    </View>
                    <Text style={[styles.tableCell, { flex: 0.5, textAlign: 'center' }]}>
                      {row.played}
                    </Text>
                    <Text style={[styles.tableCell, { flex: 0.5, textAlign: 'center', fontWeight: 'bold' }]}>
                      {row.points}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Próximos Partidos */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Próximos Partidos</Text>

              <View style={styles.matchesContainer}>
                {[
                  {
                    date: 'Sáb 15 Nov',
                    time: '16:00',
                    home: { name: 'Tigres FC', logo: '🐯' },
                    away: { name: 'Leones FC', logo: '🦁' },
                    league: 'Liga Premier',
                  },
                  {
                    date: 'Dom 16 Nov',
                    time: '18:00',
                    home: { name: 'Águilas United', logo: '🦅' },
                    away: { name: 'Pumas FC', logo: '🐾' },
                    league: 'Copa Regional',
                  },
                ].map((match, index) => (
                  <TouchableOpacity key={index} style={styles.matchCard}>
                    <View style={styles.matchHeader}>
                      <Text style={styles.matchDate}>{match.date}</Text>
                      <Text style={styles.matchTime}>{match.time}</Text>
                    </View>

                    <View style={styles.matchTeams}>
                      <View style={styles.matchTeam}>
                        <Text style={styles.matchTeamLogo}>{match.home.logo}</Text>
                        <Text style={styles.matchTeamName}>{match.home.name}</Text>
                      </View>

                      <Text style={styles.matchVs}>VS</Text>

                      <View style={styles.matchTeam}>
                        <Text style={styles.matchTeamLogo}>{match.away.logo}</Text>
                        <Text style={styles.matchTeamName}>{match.away.name}</Text>
                      </View>
                    </View>

                    <View style={styles.matchLeague}>
                      <Text style={styles.matchLeagueText}>{match.league}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        ) : (
          <>
            {/* Torneos Disponibles */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Torneos Disponibles</Text>

              <View style={styles.availableContainer}>
                {[
                  {
                    name: 'Torneo Clausura 2025',
                    logo: '🏅',
                    startDate: '15 Enero 2025',
                    inscriptionEnd: '10 Diciembre 2024',
                    teams: '8/16',
                    price: '$2,500',
                  },
                  {
                    name: 'Copa de Verano 2025',
                    logo: '☀️',
                    startDate: '1 Junio 2025',
                    inscriptionEnd: '15 Mayo 2025',
                    teams: '2/12',
                    price: '$1,800',
                  },
                  {
                    name: 'Liga de Otoño',
                    logo: '🍂',
                    startDate: '1 Septiembre 2025',
                    inscriptionEnd: '20 Agosto 2025',
                    teams: '0/10',
                    price: '$2,000',
                  },
                ].map((torneo, index) => (
                  <View key={index} style={styles.availableCard}>
                    <View style={styles.availableLogo}>
                      <Text style={styles.availableLogoText}>{torneo.logo}</Text>
                    </View>

                    <Text style={styles.availableName}>{torneo.name}</Text>

                    <View style={styles.availableInfo}>
                      <View style={styles.availableInfoRow}>
                        <Text style={styles.availableInfoLabel}>Inicio:</Text>
                        <Text style={styles.availableInfoValue}>{torneo.startDate}</Text>
                      </View>
                      <View style={styles.availableInfoRow}>
                        <Text style={styles.availableInfoLabel}>Inscripción hasta:</Text>
                        <Text style={styles.availableInfoValue}>{torneo.inscriptionEnd}</Text>
                      </View>
                      <View style={styles.availableInfoRow}>
                        <Text style={styles.availableInfoLabel}>Equipos:</Text>
                        <Text style={styles.availableInfoValue}>{torneo.teams}</Text>
                      </View>
                      <View style={styles.availableInfoRow}>
                        <Text style={styles.availableInfoLabel}>Precio:</Text>
                        <Text style={[styles.availableInfoValue, { fontWeight: 'bold' }]}>
                          {torneo.price}
                        </Text>
                      </View>
                    </View>

                    <TouchableOpacity style={styles.registerButton}>
                      <PlusIcon size={20} color="#fff" />
                      <Text style={styles.registerButtonText}>Inscribir Equipo</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}

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
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#006c4f',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
  },
  tabTextActive: {
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  seeAll: {
    fontSize: 14,
    color: '#006c4f',
    fontWeight: '600',
  },
  ligasContainer: {
    gap: 16,
  },
  ligaCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  ligaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ligaLogo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ligaLogoText: {
    fontSize: 35,
  },
  ligaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dcfce7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 6,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16a34a',
  },
  ligaBadgeText: {
    color: '#16a34a',
    fontSize: 12,
    fontWeight: 'bold',
  },
  ligaName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  ligaSeason: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
  },
  ligaStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  ligaStat: {
    flex: 1,
    alignItems: 'center',
  },
  ligaStatDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e2e8f0',
  },
  ligaStatValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#006c4f',
    marginBottom: 4,
  },
  ligaStatLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  ligaActions: {
    flexDirection: 'row',
    gap: 12,
  },
  ligaActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  ligaActionText: {
    color: '#006c4f',
    fontSize: 14,
    fontWeight: '600',
  },
  tableCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#e2e8f0',
    marginBottom: 8,
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#64748b',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  tableRowHighlight: {
    backgroundColor: '#f0fdf4',
  },
  tableCell: {
    fontSize: 14,
    color: '#1e293b',
  },
  tableTeam: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tableTeamLogo: {
    fontSize: 20,
  },
  tableTeamName: {
    fontSize: 14,
    color: '#1e293b',
    fontWeight: '500',
  },
  matchesContainer: {
    gap: 12,
  },
  matchCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  matchDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  matchTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#006c4f',
  },
  matchTeams: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  matchTeam: {
    flex: 1,
    alignItems: 'center',
  },
  matchTeamLogo: {
    fontSize: 30,
    marginBottom: 8,
  },
  matchTeamName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
  },
  matchVs: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#94a3b8',
    marginHorizontal: 16,
  },
  matchLeague: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  matchLeagueText: {
    fontSize: 12,
    color: '#64748b',
  },
  availableContainer: {
    gap: 16,
  },
  availableCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  availableLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    alignSelf: 'center',
  },
  availableLogoText: {
    fontSize: 40,
  },
  availableName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 20,
  },
  availableInfo: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    gap: 10,
  },
  availableInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  availableInfoLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  availableInfoValue: {
    fontSize: 14,
    color: '#1e293b',
    fontWeight: '500',
  },
  registerButton: {
    flexDirection: 'row',
    backgroundColor: '#006c4f',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
