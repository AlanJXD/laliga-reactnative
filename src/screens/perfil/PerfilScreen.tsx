import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import {
  CameraIcon,
  DocumentTextIcon,
  ChartBarIcon,
  ClockIcon,
  TrophyIcon,
  Cog6ToothIcon,
  ChevronRightIcon,
} from 'react-native-heroicons/outline';

export default function PerfilScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header con foto de perfil */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>JD</Text>
            </View>
            <TouchableOpacity style={styles.cameraButton}>
              <CameraIcon size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text style={styles.playerName}>Juan Delgado</Text>
          <Text style={styles.playerPosition}>Delantero • #10</Text>

          <View style={styles.playerBadges}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>⭐ Jugador Destacado</Text>
            </View>
          </View>
        </View>

        {/* Estadísticas Principales */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mis Estadísticas</Text>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Text style={styles.statEmoji}>⚽</Text>
              </View>
              <Text style={styles.statValue}>24</Text>
              <Text style={styles.statLabel}>Goles</Text>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Text style={styles.statEmoji}>🎯</Text>
              </View>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Asistencias</Text>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Text style={styles.statEmoji}>🟨</Text>
              </View>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Amarillas</Text>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Text style={styles.statEmoji}>🟥</Text>
              </View>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Rojas</Text>
            </View>
          </View>

          <View style={styles.statsDetails}>
            <View style={styles.statsDetailRow}>
              <Text style={styles.statsDetailLabel}>Partidos Jugados</Text>
              <Text style={styles.statsDetailValue}>45</Text>
            </View>
            <View style={styles.statsDetailRow}>
              <Text style={styles.statsDetailLabel}>Minutos Jugados</Text>
              <Text style={styles.statsDetailValue}>3,240</Text>
            </View>
            <View style={styles.statsDetailRow}>
              <Text style={styles.statsDetailLabel}>Promedio de Gol</Text>
              <Text style={styles.statsDetailValue}>0.53 / partido</Text>
            </View>
          </View>
        </View>

        {/* Información Personal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información Personal</Text>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Fecha de Nacimiento</Text>
              <Text style={styles.infoValue}>15 Marzo 1998</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Edad</Text>
              <Text style={styles.infoValue}>26 años</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Posición</Text>
              <Text style={styles.infoValue}>Delantero</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Pie Hábil</Text>
              <Text style={styles.infoValue}>Derecho</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Altura</Text>
              <Text style={styles.infoValue}>1.78 m</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.documentButton}>
            <DocumentTextIcon size={20} color="#006c4f" />
            <Text style={styles.documentButtonText}>Ver Documentos</Text>
            <ChevronRightIcon size={20} color="#64748b" />
          </TouchableOpacity>
        </View>

        {/* Historial de Partidos Recientes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Historial de Partidos</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Ver todos</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.matchesHistory}>
            {[
              {
                date: '10 Nov',
                result: 'Victoria',
                score: '3-1',
                goals: 2,
                assists: 1,
                league: 'Liga Premier',
              },
              {
                date: '3 Nov',
                result: 'Empate',
                score: '2-2',
                goals: 1,
                assists: 0,
                league: 'Liga Premier',
              },
              {
                date: '27 Oct',
                result: 'Derrota',
                score: '0-2',
                goals: 0,
                assists: 0,
                league: 'Copa Regional',
              },
            ].map((match, index) => (
              <TouchableOpacity key={index} style={styles.historyCard}>
                <View style={styles.historyLeft}>
                  <View
                    style={[
                      styles.resultBadge,
                      match.result === 'Victoria' && styles.resultWin,
                      match.result === 'Empate' && styles.resultDraw,
                      match.result === 'Derrota' && styles.resultLoss,
                    ]}
                  >
                    <Text
                      style={[
                        styles.resultText,
                        match.result === 'Victoria' && styles.resultTextWin,
                        match.result === 'Empate' && styles.resultTextDraw,
                        match.result === 'Derrota' && styles.resultTextLoss,
                      ]}
                    >
                      {match.result.charAt(0)}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.historyDate}>{match.date}</Text>
                    <Text style={styles.historyScore}>{match.score}</Text>
                  </View>
                </View>

                <View style={styles.historyStats}>
                  <Text style={styles.historyStatText}>⚽ {match.goals}</Text>
                  <Text style={styles.historyStatText}>🎯 {match.assists}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Logros y Reconocimientos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Logros y Reconocimientos</Text>

          <View style={styles.achievementsGrid}>
            {[
              { icon: '🏆', title: 'Campeón', subtitle: 'Temporada 2023-2024' },
              { icon: '👟', title: 'Goleador', subtitle: 'Liga Premier 2024' },
              { icon: '⭐', title: 'MVP', subtitle: 'Jornada 10' },
              { icon: '🎯', title: 'Hat-trick', subtitle: '3 Goles en un partido' },
            ].map((achievement, index) => (
              <View key={index} style={styles.achievementCard}>
                <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementSubtitle}>{achievement.subtitle}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Opciones de Configuración */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configuración</Text>

          <View style={styles.settingsCard}>
            {[
              { icon: <Cog6ToothIcon size={24} color="#006c4f" />, label: 'Configuración General' },
              { icon: <DocumentTextIcon size={24} color="#006c4f" />, label: 'Editar Información' },
              { icon: <ChartBarIcon size={24} color="#006c4f" />, label: 'Privacidad' },
            ].map((setting, index) => (
              <TouchableOpacity key={index} style={styles.settingRow}>
                <View style={styles.settingLeft}>
                  <View style={styles.settingIcon}>{setting.icon}</View>
                  <Text style={styles.settingLabel}>{setting.label}</Text>
                </View>
                <ChevronRightIcon size={20} color="#94a3b8" />
              </TouchableOpacity>
            ))}
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 60,
  },
  profileHeader: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 32,
    backgroundColor: '#fff',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#006c4f',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#fff',
  },
  avatarText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  cameraButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#006c4f',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  playerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  playerPosition: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 16,
  },
  playerBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeText: {
    color: '#d97706',
    fontSize: 12,
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statEmoji: {
    fontSize: 24,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#006c4f',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  statsDetails: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statsDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  statsDetailLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  statsDetailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
  },
  documentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  documentButtonText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#006c4f',
  },
  matchesHistory: {
    gap: 12,
  },
  historyCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  historyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  resultBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultWin: {
    backgroundColor: '#dcfce7',
  },
  resultDraw: {
    backgroundColor: '#fef3c7',
  },
  resultLoss: {
    backgroundColor: '#fee2e2',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultTextWin: {
    color: '#16a34a',
  },
  resultTextDraw: {
    color: '#d97706',
  },
  resultTextLoss: {
    color: '#dc2626',
  },
  historyDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  historyScore: {
    fontSize: 12,
    color: '#64748b',
  },
  historyStats: {
    flexDirection: 'row',
    gap: 12,
  },
  historyStatText: {
    fontSize: 14,
    color: '#64748b',
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  achievementCard: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  achievementIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
    textAlign: 'center',
  },
  achievementSubtitle: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  settingsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
  },
});
