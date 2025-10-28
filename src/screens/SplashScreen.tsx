import React, { useEffect } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { getAuth } from '../utils/storage';

export default function SplashScreen({ navigation }: any) {
  useEffect(() => {
    (async () => {
      const a = await getAuth();
      setTimeout(() => {
        if (a && a.loggedIn && a.role === 'admin') navigation.replace('AdminStack');
        else if (a && a.loggedIn && a.role === 'employee') navigation.replace('EmployeeStack');
        else navigation.replace('Login');
      }, 900);
    })();
  }, []);

  return (
    <ImageBackground
      source={require('../assets/Image/SplashScreen.jpeg')} 
      style={styles.background}
      resizeMode="cover" 
    />

  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)', 
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#000',
    marginBottom: 16,
  },
});
