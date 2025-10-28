import React, { useState } from 'react';
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
import { getEmployees, saveEmployees, setAuth } from '../../utils/storage';
import uuid from 'react-native-uuid';
import { Employee } from '../../types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomDrawer from '../../components/CustomDrawer';

export default function CreateEmployee({ navigation }: any) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form, setForm] = useState<Partial<Employee>>({
    firstName: '',
    lastName: '',
    dob: '',
    phone: '',
    email: '',
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const update = (k: keyof Employee, v: string) =>
    setForm(f => ({ ...f, [k]: v }));

  const addEmployee = async () => {
    if (!form.firstName || !form.username || !form.password) {
      Alert.alert(
        'Validation',
        'First Name, Username, and Password are required.',
      );
      return;
    }

    const list = await getEmployees();
    const newEmp: Employee = {
      id: String(uuid.v4()),
      firstName: form.firstName || '',
      lastName: form.lastName || '',
      dob: form.dob,
      phone: form.phone,
      email: form.email,
      username: form.username || '',
      password: form.password || '',
    };

    list.push(newEmp);
    await saveEmployees(list);
    Alert.alert('Success', 'Employee added successfully!');
    navigation.navigate('ViewEmployees');
  };

  const handleNavigate = (route: string) => {
    if (route === 'Logout') {
      setAuth(null).then(() => navigation.replace('Login'));
      return;
    }
    navigation.navigate(route);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setDrawerOpen(true)}
          style={styles.menuBtn}
        >
          <Icon name="menu" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Admin</Text>
        <TouchableOpacity onPress={() => handleNavigate('Logout')}>
          <Icon name="logout" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <Text style={styles.title}>Create Employee</Text>

            {(
              [
                'firstName',
                'lastName',
                'dob',
                'phone',
                'email',
                'username',
              ] as (keyof Employee)[]
            ).map(k => (
              <View key={k} style={styles.inputContainer}>
                <Text style={styles.label}>
                  {k === 'firstName'
                    ? 'First Name'
                    : k === 'lastName'
                    ? 'Last Name'
                    : k === 'dob'
                    ? 'Date of Birth'
                    : k === 'phone'
                    ? 'Phone'
                    : k === 'email'
                    ? 'Email'
                    : 'Username'}
                </Text>
                <TextInput
                  value={(form as any)[k] || ''}
                  onChangeText={t => update(k, t)}
                  style={styles.input}
                  placeholderTextColor={'#CCCCCC'}
                  placeholder={
                    k === 'firstName'
                      ? 'First Name'
                      : k === 'lastName'
                      ? 'Last Name'
                      : k === 'dob'
                      ? 'YYYY-MM-DD'
                      : k === 'phone'
                      ? '8956561215'
                      : k === 'email'
                      ? 'Email'
                      : 'Username'
                  }
                  keyboardType={k === 'phone' ? 'number-pad' : 'default'}
                  returnKeyType="next"
                />
              </View>
            ))}

            {/* Password Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordWrapper}>
                <TextInput
                  value={form.password || ''}
                  onChangeText={t => update('password', t)}
                  style={[
                    styles.input,
                    { flex: 1, marginBottom: 0, color: '#000' },
                  ]}
                  secureTextEntry={!showPassword}
                  placeholder="********"
                  placeholderTextColor={'#CCCCCC'}
                  returnKeyType="done"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Icon
                    name={showPassword ? 'visibility-off' : 'visibility'}
                    size={22}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.addButton} onPress={addEmployee}>
              <Text style={styles.addButtonText}>Add Employee</Text>
            </TouchableOpacity>
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
        role="admin"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    justifyContent: 'center',
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 6,
    color: '#374151',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#F9FAFB',
    fontSize: 15,
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
  },
  addButton: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
