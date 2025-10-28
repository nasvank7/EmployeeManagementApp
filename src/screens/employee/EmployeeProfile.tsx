import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  getAuth,
  getEmployees,
  saveEmployees,
  setAuth,
} from '../../utils/storage';
import { Employee } from '../../types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomDrawer from '../../components/CustomDrawer';

export default function EmployeeProfile({ navigation }: any) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [emp, setEmp] = useState<Employee | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    (async () => {
      const auth = await getAuth();
      if (auth?.userId) {
        const list = await getEmployees();
        const found = list.find(i => i.id === auth.userId) || null;
        setEmp(found);
      }
    })();
  }, []);

  const save = async () => {
    if (!emp) return;
    const list = await getEmployees();
    const updated = list.map(i => (i.id === emp.id ? emp : i));
    await saveEmployees(updated);
    Alert.alert('Success', 'Profile updated successfully');
  };

  if (!emp) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading Profile...</Text>
      </View>
    );
  }
  const handleNavigate = (route: string) => {
    if (route === 'Logout') {
      setAuth(null).then(() => navigation.replace('Login'));
      return;
    }
    navigation.navigate(route);
  };

  return (
    <SafeAreaView style={styles.container}>
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
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20 }}
        >
          <View style={styles.profileCard}>
            <View style={styles.avatarSection}>
              <Icon name="account-circle" size={80} color="#2b6cb0" />
              <Text style={styles.nameText}>
                {emp.firstName} {emp.lastName}
              </Text>
              <Text style={styles.roleText}>Employee</Text>
            </View>

            <View style={styles.form}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                value={emp.firstName}
                onChangeText={t => setEmp({ ...emp, firstName: t })}
              />

              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                value={emp.lastName}
                onChangeText={t => setEmp({ ...emp, lastName: t })}
              />

              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={emp.email}
                keyboardType="email-address"
                onChangeText={t => setEmp({ ...emp, email: t })}
              />

              <Text style={styles.label}>Phone</Text>
              <TextInput
                style={styles.input}
                value={emp.phone}
                keyboardType="phone-pad"
                onChangeText={t => setEmp({ ...emp, phone: t })}
              />

              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[{ flex: 1, color: '#000' }]}
                  value={emp.password}
                  onChangeText={t => setEmp({ ...emp, password: t })}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Icon
                    name={showPassword ? 'visibility' : 'visibility-off'}
                    size={22}
                    color="#6b7280"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.saveButton} onPress={save}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  container: { flex: 1, backgroundColor: '#F8F9FB' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 16, color: '#4b5563' },

  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },

  avatarSection: { alignItems: 'center', marginBottom: 16 },
  nameText: { fontSize: 18, fontWeight: '700', color: '#111827', marginTop: 8 },
  roleText: { color: '#6b7280', fontSize: 13 },
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
  form: { marginTop: 10 },
  label: { fontSize: 13, fontWeight: '500', color: '#374151', marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 6,
    backgroundColor: '#f9fafb',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 6,
    backgroundColor: '#f9fafb',
  },
  saveButton: {
    backgroundColor: '#2b6cb0',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  saveButtonText: { color: '#fff', fontSize: 15, fontWeight: '600' },
});
