import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

import EmployeeHome from '../screens/employee/EmployeeHome';
import EmployeeProfile from '../screens/employee/EmployeeProfile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function EmployeeFeatureStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EmployeeHome" component={EmployeeHome} />
      <Stack.Screen name="EmployeeProfile" component={EmployeeProfile} />
    </Stack.Navigator>
  );
}


export default function EmployeeStack() {
  return (
    // <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#2b6cb0',
          tabBarInactiveTintColor: '#6b7280',
          tabBarStyle: {
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
            let iconName = 'home';
            if (route.name === 'EmployeeHomeTab') iconName = 'home';
            else if (route.name === 'EmployeeProfileTab') iconName = 'person';
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="EmployeeHomeTab"
          component={EmployeeFeatureStack}
          options={{ title: 'Home' }}
        />
        <Tab.Screen
          name="EmployeeProfileTab"
          component={EmployeeProfile}
          options={{ title: 'Profile' }}
        />
      </Tab.Navigator>
    // </SafeAreaView>
  );
}
