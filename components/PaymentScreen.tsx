import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import PaymentForm from './PaymentForm';
import InvoiceQR from './InvoiceQR';

const PaymentScreen: React.FC = () => {
  const [invoice, setInvoice] = useState<any>(null);

  const handlePaymentSubmit = (paymentData: any) => {
    setInvoice(paymentData); // Guardamos los datos del formulario como factura
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}></Text>
      <PaymentForm onPaymentSubmit={handlePaymentSubmit} />
      {invoice && (
        <View style={styles.qrSection}>
          <Text style={styles.subtitle}>Factura Generada:</Text>
          <InvoiceQR invoiceData={invoice} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Permite que el contenido se ajuste al tamaño del ScrollView
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1b1c18',
  },
  qrSection: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#677c11',
  },
});

export default PaymentScreen;
