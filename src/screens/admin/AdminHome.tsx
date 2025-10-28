import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { setAuth } from '../../utils/storage';
import CustomDrawer from '../../components/CustomDrawer';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function AdminHome({ navigation }: any) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const insets = useSafeAreaInsets();

  const handleNavigate = (route: string) => {
    if (route === 'Logout') {
      setAuth(null).then(() => navigation.replace('Login'));
      return;
    }
    navigation.navigate(route);
  };

  return (
    <SafeAreaView style={[styles.container]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setDrawerOpen(true)} style={styles.menuBtn}>
          <Icon name="menu" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Admin</Text>
        <TouchableOpacity onPress={() => handleNavigate('Logout')}>
          <Icon name="logout" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner Section */}
        <ImageBackground
          source={require('../../assets/Image/AdminHomeBanner.jpg')}
          style={styles.banner}
          imageStyle={styles.bannerImage}
        >
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>Hello Admin</Text>
            <Text style={styles.bannerSubtitle}>Manage employees with ease</Text>
          </View>
        </ImageBackground>

        {/* Action Cards */}
        <View style={styles.cardsContainer}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ViewEmployees')}
          >
            <Icon name="people" size={32} color="#fff" />
            <Text style={styles.cardTitle}>View Employees</Text>
            <Text style={styles.cardSubtitle}>See all registered staff</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('CreateEmployee')}
          >
            <Icon name="person-add" size={32} color="#fff" />
            <Text style={styles.cardTitle}>Add New Employee</Text>
            <Text style={styles.cardSubtitle}>Add new team members</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Custom Drawer */}
      <CustomDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onNavigate={(r) => {
          setDrawerOpen(false);
          handleNavigate(r);
        }}
        role="admin"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  menuBtn: { padding: 8 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#111827' },

  // Banner
  banner: {
    height: 200,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    objectFit:'contain'
  },
  bannerImage: {
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
  },
  bannerOverlay: {
    backgroundColor: 'rgba(0,0,0,0.45)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  bannerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
  },
  bannerSubtitle: {
    color: '#e5e5e5',
    fontSize: 14,
    marginTop: 6,
  },

  // Cards
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingHorizontal: 12,
  },
  card: {
    width: width * 0.42,
    backgroundColor: '#1e3a8a',
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  cardTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
    marginTop: 10,
  },
  cardSubtitle: {
    color: '#cbd5e1',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 3,
  },
});
