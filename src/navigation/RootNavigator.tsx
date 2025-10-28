import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import AdminStack from './AdminStack';
import EmployeeStack from './EmployeeNavigator';
import { getAuth, getAdmin, saveAdmin } from '../utils/storage';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  AdminStack: undefined;
  EmployeeStack: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {

  useEffect(() => {
    (async () => {
      const a = await getAdmin();
      if (!a) {
        await saveAdmin({ name: 'Admin', username: 'admin', password: 'admin' });
      }
    })();
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="AdminStack" component={AdminStack} />
      <Stack.Screen name="EmployeeStack" component={EmployeeStack} />
    </Stack.Navigator>
  );
}
