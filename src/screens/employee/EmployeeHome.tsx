import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import CustomDrawer from '../../components/CustomDrawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getAuth, getEmployees, setAuth } from '../../utils/storage';
import { Employee } from '../../types';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EmployeeHome({ navigation }: any) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [me, setMe] = useState<Employee | null>(null);

  useEffect(() => {
    (async () => {
      const a = await getAuth();
      if (a?.userId) {
        const list = await getEmployees();
        const found = list.find(i => i.id === a.userId) || null;
        setMe(found);
      }
    })();
  }, []);

  const handleNavigate = (route: string) => {
    if (route === 'Logout') {
      setAuth(null).then(() => navigation.replace('Login'));
      return;
    }
    navigation.navigate(route);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setDrawerOpen(true)}
          style={{ padding: 8 }}
        >
          <Icon name="menu" size={26} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Employee</Text>
        <TouchableOpacity onPress={() => handleNavigate('Logout')}>
          <Icon name="logout" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ImageBackground
        source={require('../../assets/Image/EmployeeHomeBanner.jpg')}
        style={styles.banner}
        imageStyle={styles.bannerImage}
      >
        <View style={styles.bannerOverlay}>
          <Text style={styles.bannerTitle}>Hello {me?.firstName}</Text>
          <Text style={styles.bannerSubtitle}>What's up</Text>
        </View>
      </ImageBackground>

      <CustomDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onNavigate={r => {
          setDrawerOpen(false);
          handleNavigate(r);
        }}
        role="employee"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },
  headerTitle: { fontSize: 18, fontWeight: '700' },
// 
  bottomTabs: {
    height: 60,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#e5e7eb',
  },
  tab: { flex: 1, justifyContent: 'center', alignItems: 'center' },
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
});
