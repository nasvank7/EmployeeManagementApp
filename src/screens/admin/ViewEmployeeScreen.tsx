import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Employee } from '../../types';
import { getEmployees, saveEmployees, setAuth } from '../../utils/storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import EditEmployeeModal from './EditEmployeeScreen';
import CustomDrawer from '../../components/CustomDrawer';
import { useNavigation } from '@react-navigation/native';

export default function ViewEmployees() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [list, setList] = useState<Employee[]>([]);
  const [editing, setEditing] = useState<Employee | null>(null);
  const navigation = useNavigation();
  const load = async () => {
    const data = await getEmployees();
    setList(data);
  };

  useEffect(() => {
    load();
  }, []);

  const deleteEmp = (id: string) => {
    Alert.alert('Delete', 'Are you sure?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const updated = list.filter(i => i.id !== id);
          await saveEmployees(updated);
          setList(updated);
        },
      },
    ]);
  };

  const handleSave = async (updatedEmp: Employee) => {
    const updatedList = list.map(i =>
      i.id === updatedEmp.id ? updatedEmp : i,
    );
    await saveEmployees(updatedList);
    setList(updatedList);
    setEditing(null);
  };

  const handleNavigate = (route: string) => {
    if (route === 'Logout') {
      setAuth(null).then(() => navigation.replace('Login'));
      return;
    }
    navigation.navigate(route);
  };
  const renderItem = ({ item }: { item: Employee }) => (
    <View style={styles.card}>
      <View>
        <Text style={styles.name}>
          {item.firstName} {item.lastName}
        </Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>

      <View style={styles.iconRow}>
        <TouchableOpacity
          onPress={() => setEditing(item)}
          style={styles.iconButton}
        >
          <Icon name="edit" size={18} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => deleteEmp(item.id)}
          style={[styles.iconButton, styles.deleteIcon]}
        >
          <Icon name="delete" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
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
      <View style={styles.headerBox}>
        <Text style={styles.headers}>Employees</Text>
        <FlatList
          data={list}
          keyExtractor={i => i.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>

      <EditEmployeeModal
        visible={!!editing}
        employee={editing}
        onClose={() => setEditing(null)}
        onSave={handleSave}
      />
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

// same styles as before

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
  },
  headerBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
    marginTop:'2%'
  },
  headers: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
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
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  email: {
    color: '#6B7280',
    marginTop: 2,
  },
  iconRow: {
    flexDirection: 'row',
  },
  iconButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 8,
    marginLeft: 8,
  },
  deleteIcon: {
    backgroundColor: '#000',
  },
  modalContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalBtnRow: {
    flexDirection: 'row',
    marginTop: 12,
  },
  modalBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelBtn: {
    backgroundColor: '#E5E7EB',
    marginRight: 8,
  },
  saveBtn: {
    backgroundColor: '#000',
  },
});
