import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

interface PaymentFormProps {
  onPaymentSubmit: (paymentData: any) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onPaymentSubmit }) => {
  const [formData, setFormData] = useState({
    transaction_code: Math.random().toString(36).substr(2, 9), // Código único
    amount: '',
    method: '',
    status: 'pending', // Estado inicial
    created_at: new Date().toISOString()
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
        created_at: new Date().toISOString()
      });
    } else {
      alert('Por favor completa todos los campos requeridos.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Monto"
        keyboardType="numeric"
        value={formData.amount}
        onChangeText={(text) => handleChange('amount', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Método de Pago"
        value={formData.method}
        onChangeText={(text) => handleChange('method', text)}
      />
      <Button title="Generar QR" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default PaymentForm;
