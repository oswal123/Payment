import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PaymentForm from './PaymentForm';
import InvoiceQR from './InvoiceQR';

const PaymentScreen: React.FC = () => {
  const [invoice, setInvoice] = useState<any>(null);

  const handlePaymentSubmit = (paymentData: any) => {
    setInvoice(paymentData); // Guardamos la factura generada
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generar Factura de Pago</Text>
      <PaymentForm onPaymentSubmit={handlePaymentSubmit} />
      {invoice && (
        <View>
          <Text style={styles.subtitle}>Factura Generada:</Text>
          <InvoiceQR invoiceData={invoice} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 20,
  },
});

export default PaymentScreen;
