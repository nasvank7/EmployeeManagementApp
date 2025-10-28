export type Role = 'admin' | 'employee';

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  dob?: string;
  phone?: string;
  email?: string;
  username: string;
  password: string;
}
