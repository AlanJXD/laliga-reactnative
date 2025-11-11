import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {
  CalendarIcon,
  ClockIcon,
  BellAlertIcon,
  PlayIcon,
} from 'react-native-heroicons/outline';

export default function InicioScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hola, Jugador</Text>
          <Text style={styles.subtitle}>Bienvenido de nuevo</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <BellAlertIcon size={24} color="#006c4f" />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Partido en Curso */}
        <View style={styles.liveMatchCard}>
          <View style={styles.liveHeader}>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>EN VIVO</Text>
            </View>
            <Text style={styles.liveTime}>23:45</Text>
          </View>

          <View style={styles.matchContent}>
            <View style={styles.teamContainer}>
              <View style={styles.teamLogo}>
                <Text style={styles.teamLogoText}>⚽</Text>
              </View>
              <Text style={styles.teamName}>Tigres FC</Text>
              <Text style={styles.teamScore}>2</Text>
            </View>

            <Text style={styles.vsText}>VS</Text>

            <View style={styles.teamContainer}>
              <View style={styles.teamLogo}>
                <Text style={styles.teamLogoText}>🔵</Text>
              </View>
              <Text style={styles.teamName}>Águilas United</Text>
              <Text style={styles.teamScore}>1</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.accessButton}>
            <PlayIcon size={20} color="#fff" />
            <Text style={styles.accessButtonText}>Acceder al Partido</Text>
          </TouchableOpacity>
        </View>

        {/* Mis Próximos Partidos */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mis Próximos Partidos</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Ver todos</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.upcomingMatches}>
            {[1, 2, 3].map((_, index) => (
              <TouchableOpacity key={index} style={styles.matchCard}>
                <View style={styles.matchDate}>
                  <CalendarIcon size={16} color="#64748b" />
                  <Text style={styles.matchDateText}>Sáb 15 Nov</Text>
                </View>
                <View style={styles.matchTime}>
                  <ClockIcon size={16} color="#64748b" />
                  <Text style={styles.matchTimeText}>16:00</Text>
                </View>
                <View style={styles.matchTeams}>
                  <Text style={styles.matchTeamsText}>Tigres FC vs Leones</Text>
                </View>
                <View style={styles.matchLeague}>
                  <Text style={styles.matchLeagueText}>Liga Premier Nayarit</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Noticias y Anuncios */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Noticias y Anuncios</Text>

          <View style={styles.newsContainer}>
            {[
              {
                title: 'Nueva Jornada de Liga',
                description: 'Comienza la jornada 10 este fin de semana',
                time: 'Hace 2 horas',
              },
              {
                title: 'Inscripciones Abiertas',
                description: 'Torneo de Copa Regional abre inscripciones',
                time: 'Hace 5 horas',
              },
              {
                title: 'Actualización de Reglamento',
                description: 'Nuevas normas para la temporada 2024-2025',
                time: 'Hace 1 día',
              },
            ].map((news, index) => (
              <TouchableOpacity key={index} style={styles.newsCard}>
                <View style={styles.newsIcon}>
                  <BellAlertIcon size={20} color="#006c4f" />
                </View>
                <View style={styles.newsContent}>
                  <Text style={styles.newsTitle}>{news.title}</Text>
                  <Text style={styles.newsDescription}>{news.description}</Text>
                  <Text style={styles.newsTime}>{news.time}</Text>
                </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ef4444',
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  liveMatchCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#006c4f',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  liveHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
    marginRight: 6,
  },
  liveText: {
    color: '#ef4444',
    fontSize: 12,
    fontWeight: 'bold',
  },
  liveTime: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  matchContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  teamContainer: {
    flex: 1,
    alignItems: 'center',
  },
  teamLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  teamLogoText: {
    fontSize: 30,
  },
  teamName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 4,
  },
  teamScore: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#006c4f',
  },
  vsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#94a3b8',
    marginHorizontal: 16,
  },
  accessButton: {
    flexDirection: 'row',
    backgroundColor: '#006c4f',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  accessButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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
  },
  seeAll: {
    fontSize: 14,
    color: '#006c4f',
    fontWeight: '600',
  },
  upcomingMatches: {
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
  matchDate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  matchDateText: {
    fontSize: 14,
    color: '#64748b',
  },
  matchTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  matchTimeText: {
    fontSize: 14,
    color: '#64748b',
  },
  matchTeams: {
    marginBottom: 4,
  },
  matchTeamsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
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
  newsContainer: {
    gap: 12,
  },
  newsCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  newsIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ecfdf5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  newsContent: {
    flex: 1,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  newsDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 6,
  },
  newsTime: {
    fontSize: 12,
    color: '#94a3b8',
  },
});
