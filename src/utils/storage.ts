import AsyncStorage from '@react-native-async-storage/async-storage';
import { Employee, Role } from '../types';
import { EMP_KEY, ADMIN_KEY, AUTH_KEY } from '@env';

export const getEmployees = async (): Promise<Employee[]> => {
  const s = await AsyncStorage.getItem(EMP_KEY);
  return s ? JSON.parse(s) : [];
};

export const saveEmployees = async (arr: Employee[]) => {
  await AsyncStorage.setItem(EMP_KEY, JSON.stringify(arr));
};

export const getAdmin = async (): Promise<{ name: string; username: string; password: string } | null> => {
  const s = await AsyncStorage.getItem(ADMIN_KEY);
  return s ? JSON.parse(s) : null;
};

export const saveAdmin = async (admin: { name: string; username: string; password: string }) => {
  await AsyncStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
};

export const setAuth = async (payload: { loggedIn: boolean; role?: Role; userId?: string } | null) => {
  if (!payload) await AsyncStorage.removeItem(AUTH_KEY);
  else await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(payload));
};

export const getAuth = async () => {
  const s = await AsyncStorage.getItem(AUTH_KEY);
  return s ? JSON.parse(s) : null;
};

export const clearAll = async () => {
  await AsyncStorage.removeItem(EMP_KEY);
  await AsyncStorage.removeItem(ADMIN_KEY);
  await AsyncStorage.removeItem(AUTH_KEY);
};
