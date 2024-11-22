import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';

interface PaymentFormProps {
  onPaymentSubmit: (paymentData: any) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onPaymentSubmit }) => {
  const [formData, setFormData] = useState({
    transaction_code: Math.random().toString(36).substr(2, 9),
    amount: '',
    method: '',
    status: 'pending',
    created_at: new Date().toISOString(),
  });

  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
    if (formData.amount && formData.method) {
      onPaymentSubmit(formData);
      setFormData({
        transaction_code: Math.random().toString(36).substr(2, 9),
        amount: '',
        method: '',
        status: 'pending',
        created_at: new Date().toISOString(),
      });
    } else {
      alert('Por favor completa todos los campos requeridos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, styles.title]}>Formulario de Pago</Text>

      <View style={styles.inputContainer}>
        <MaterialIcons name="attach-money" size={24} color="#677c11" />
        <TextInput
          style={styles.input}
          placeholder="Monto"
          keyboardType="numeric"
          value={formData.amount}
          onChangeText={(text) => handleChange('amount', text)}
        />
      </View>

      <Text style={styles.label}>Método de Pago</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.method}
          onValueChange={(itemValue) => handleChange('method', itemValue)}
        >
          <Picker.Item label="Selecciona un método" value="" />
          <Picker.Item label="Crédito" value="credito" />
          <Picker.Item label="Débito" value="debito" />
          <Picker.Item label="PayPal" value="paypal" />
          <Picker.Item label="Pago Móvil" value="pago_movil" />
          <Picker.Item label="Efectivo" value="efectivo" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Generar QR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f7f7f7',
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#1b1c18',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#797575',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#c2c2c2',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#1b1c18',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#c2c2c2',
    borderRadius: 5,
    backgroundColor: '#ffffff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#c74b05',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaymentForm;
