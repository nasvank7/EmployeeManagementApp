import React from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Employee } from '../../types';

interface Props {
  visible: boolean;
  employee: Employee | null;
  onClose: () => void;
  onSave: (updated: Employee) => void;
}

const EditEmployeeModal: React.FC<Props> = ({
  visible,
  employee,
  onClose,
  onSave,
}) => {
  const [form, setForm] = React.useState<Partial<Employee>>({});
  const [showPassword, setShowPassword] = React.useState(false);

  React.useEffect(() => {
    if (employee) setForm(employee);
  }, [employee]);

  const handleChange = (key: keyof Employee, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    if (!form.firstName || !form.username || !form.password) {
      alert('Please fill all required fields.');
      return;
    }
    onSave(form as Employee);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      transparent={false}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Text style={styles.title}>Edit Employee</Text>

            {[
              { label: 'First Name', key: 'firstName' },
              { label: 'Last Name', key: 'lastName' },
              { label: 'Email', key: 'email' },
              { label: 'Phone', key: 'phone' },
              { label: 'Date of Birth', key: 'dob' },
              { label: 'Username', key: 'username' },
              { label: 'Password', key: 'password' },
            ].map(({ label, key }) => (
              <View key={key} style={{ marginBottom: 14 }}>
                <Text style={styles.label}>{label}</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={[styles.input, { color: '#000' }]}
                    value={form[key] as string}
                    onChangeText={t => handleChange(key as keyof Employee, t)}
                    placeholder={label}
                    placeholderTextColor={'#000'}
                    secureTextEntry={key === 'password' && !showPassword}
                    returnKeyType="done"
                  />
                  {key === 'password' && (
                    <TouchableOpacity
                      style={styles.iconBtn}
                      onPress={() => setShowPassword(s => !s)}
                    >
                      <Icon
                        name={showPassword ? 'visibility' : 'visibility-off'}
                        size={20}
                        color="#6B7280"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}

            <View style={styles.btnRow}>
              <TouchableOpacity
                style={[styles.btn, styles.saveBtn]}
                onPress={handleSave}
              >
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, styles.cancelBtn]}
                onPress={onClose}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default EditEmployeeModal;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 6,
  },
  inputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 10,
    paddingRight: 36,
  },
  iconBtn: {
    position: 'absolute',
    right: 10,
    padding: 6,
  },
  btnRow: {
    flexDirection: 'row',
    marginTop: 24,
  },
  btn: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveBtn: {
    backgroundColor: '#000',
    marginRight: 10,
  },
  cancelBtn: {
    backgroundColor: '#E5E7EB',
  },
  saveText: {
    color: '#fff',
    fontWeight: '600',
  },
  cancelText: {
    fontWeight: '500',
  },
});
