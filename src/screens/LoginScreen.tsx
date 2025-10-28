import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getAdmin, getEmployees, saveAdmin, setAuth } from '../utils/storage';
import { Employee } from '../types';

export default function LoginScreen({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);

  useEffect(() => {
    (async () => {
      const admin = await getAdmin();
      if (!admin) {
        await saveAdmin({ name: 'Super Admin', username: 'admin', password: 'admin' });
      }
    })();
  }, []);

  const handleLogin = async () => {
   const admin = await getAdmin();
    const storedAdmin = admin || { username: 'admin', password: 'admin' };

    if (username === storedAdmin.username && password === storedAdmin.password) {
      await setAuth({ loggedIn: true, role: 'admin' });
      navigation.replace('AdminStack');
      return;
    }
    const emps: Employee[] = await getEmployees();
    const found = emps.find(e => e.username === username && e.password === password);
    if (found) {
      await setAuth({ loggedIn: true, role: 'employee', userId: found.id });
      navigation.replace('EmployeeStack');
      return;
    }

    Alert.alert('Login failed', 'Invalid username or password');
  };

  return (
    <ImageBackground
      source={require('../assets/Image/EmployeeHomeBanner.jpg')}
      style={styles.bg}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Login</Text>

          <Text style={styles.label}>Username</Text>
          <View style={styles.inputRow}>
            <TextInput
              placeholder="Enter username"
              placeholderTextColor="#999"
              style={styles.input}
              value={username}
              onChangeText={setUsername}
            />
          </View>

          <Text style={[styles.label, { marginTop: 10 }]}>Password</Text>
          <View style={styles.inputRow}>
            <TextInput
              placeholder="Enter password"
              placeholderTextColor="#999"
              secureTextEntry={!showPwd}
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPwd(s => !s)}>
              <Icon name={showPwd ? 'visibility' : 'visibility-off'} size={20} color="#666" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.btn} onPress={handleLogin}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  card: {
    width: '90%',
    maxWidth: 380,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 18,
    color: '#000',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
    marginBottom: 6,
    marginLeft: 4,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 46,
    backgroundColor: '#fafafa',
  },
  input: {
    flex: 1,
    color: '#000',
  },
  btn: {
    marginTop: 20,
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
