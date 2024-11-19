import React from 'react';
import { View, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

interface InvoiceQRProps {
  invoiceData: any;
}

const InvoiceQR: React.FC<InvoiceQRProps> = ({ invoiceData }) => {
  const qrValue = JSON.stringify({
    transaction_code: invoiceData.transaction_code,
    amount: invoiceData.amount,
    method: invoiceData.method,
    status: invoiceData.status,
    created_at: invoiceData.created_at
  });

  return (
    <View style={styles.container}>
      <QRCode value={qrValue} size={200} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
});

export default InvoiceQR;
