import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Octicons';
import { SafeAreaView } from 'react-native-safe-area-context';

import AdminHome from '../screens/admin/AdminHome';
import CreateEmployee from '../screens/admin/CreateEmployeeScreen';
import ViewEmployees from '../screens/admin/ViewEmployeeScreen';
import AdminProfile from '../screens/admin/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AdminFeatureStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminHome" component={AdminHome} />
      <Stack.Screen name="CreateEmployee" component={CreateEmployee} />
      <Stack.Screen name="ViewEmployees" component={ViewEmployees} />
      <Stack.Screen name="AdminProfile" component={AdminProfile} />
    </Stack.Navigator>
  );
}


export default function AdminStack() {
  return (
    // <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#2b6cb0',
          tabBarInactiveTintColor: '#6b7280',
          tabBarStyle: {
            // height: 60,
            borderTopWidth: 1,
            borderColor: '#e5e7eb',
            backgroundColor: '#fff',
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            position: 'absolute',
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 3,
          },
          tabBarIcon: ({ color, size }) => {
            let iconName: string = 'home';
            if (route.name === 'HomeTab') iconName = 'home';
            else if (route.name === 'ProfileTab') iconName = 'person';
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="HomeTab"
          component={AdminFeatureStack}
          options={{ title: 'Home' }}
        />
        <Tab.Screen
          name="ProfileTab"
          component={AdminProfile}
          options={{ title: 'Profile' }}
        />
      </Tab.Navigator>
    // </SafeAreaView>
  );
}
