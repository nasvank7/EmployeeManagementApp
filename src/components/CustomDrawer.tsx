import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.72;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
  role: 'admin' | 'employee';
};

const CustomDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  onNavigate,
  role,
}) => {
  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isOpen ? 0 : -DRAWER_WIDTH,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={onClose}
          activeOpacity={1}
        />
      )}
      <Animated.View style={[styles.drawer, { transform: [{ translateX }] }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {/* Header */}
          <View style={styles.header}>
            <Icon name="account-circle" size={54} color="#2563eb" />
            <View>
              <Text style={styles.greeting}>Hi,</Text>
              <Text style={styles.roleText}>
                {role === 'admin' ? 'Admin' : 'Employee'}
              </Text>
            </View>
          </View>

          {/* Menu Items */}
          <View style={styles.menu}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                onNavigate(role === 'admin' ? 'AdminHome' : 'EmployeeHome');
                onClose();
              }}
            >
              <Icon name="home" size={22} color="#111827" />
              <Text style={styles.menuText}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                onNavigate(
                  role === 'admin' ? 'AdminProfile' : 'EmployeeProfile',
                );
                onClose();
              }}
            >
              <Icon name="person" size={22} color="#111827" />
              <Text style={styles.menuText}>My Profile</Text>
            </TouchableOpacity>

            {role === 'admin' && (
              <>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    onNavigate('ViewEmployees');
                    onClose();
                  }}
                >
                  <Icon name="people" size={22} color="#111827" />
                  <Text style={styles.menuText}>View Employees</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    onNavigate('CreateEmployee');
                    onClose();
                  }}
                >
                  <Icon name="person-add" size={22} color="#111827" />
                  <Text style={styles.menuText}>Create Employee</Text>
                </TouchableOpacity>
              </>
            )}
          </View>

          {/* Logout Button */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => onNavigate('Logout')}
            >
              <Icon name="logout" size={20} color="#fff" />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 18,
    elevation: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
    gap: 10,
  },
  greeting: { fontSize: 14, color: '#6b7280' },
  roleText: { fontSize: 18, fontWeight: '700', color: '#111827' },

  menu: { gap: 10 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  menuText: {
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 10,
    color: '#111827',
  },

  footer: {
    marginTop: 'auto',
    paddingTop: 24,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: 8,
    justifyContent: 'center',
    paddingVertical: 12,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 15,
  },
});

export default CustomDrawer;
