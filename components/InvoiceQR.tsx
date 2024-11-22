import React, { useRef } from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

interface InvoiceQRProps {
  invoiceData: any;
}

const InvoiceQR: React.FC<InvoiceQRProps> = ({ invoiceData }) => {
  const qrRef = useRef<QRCode | null>(null); // Correcto tipo para el ref

  const saveQRToFile = async () => {
    try {
      if (qrRef.current) {
        const base64Data = await new Promise<string>((resolve, reject) => {
          qrRef.current?.toDataURL((data: string) => {
            if (data) resolve(data);
            else reject('Error al generar el QR como Base64.');
          });
        });

        const fileUri = `${FileSystem.cacheDirectory}qr-code.png`;

        await FileSystem.writeAsStringAsync(fileUri, base64Data, {
          encoding: FileSystem.EncodingType.Base64,
        });

        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(fileUri, {
            mimeType: 'image/png',
            dialogTitle: 'Compartir QR',
          });
        } else {
          Alert.alert('Éxito', `El QR se guardó como imagen en: ${fileUri}`);
        }
      } else {
        Alert.alert('Error', 'El QR no está disponible.');
      }
    } catch (error) {
      console.error('Error al guardar o compartir el QR:', error);
      Alert.alert('Error', 'No se pudo guardar o compartir el QR.');
    }
  };

  const qrValue = JSON.stringify({
    transaction_code: invoiceData.transaction_code,
    amount: invoiceData.amount,
    method: invoiceData.method,
    status: invoiceData.status,
  });

  return (
    <View style={styles.container}>
      <QRCode
        value={qrValue}
        size={200}
        getRef={(ref) => {
          qrRef.current = ref; // Asignamos la referencia manualmente
        }}
      />
      <View style={styles.buttonContainer}>
        <Button title="Guardar y Compartir QR" onPress={saveQRToFile} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    width: '100%',
  },
  buttonContainer: {
    width: '80%',
    marginTop: 10,
  },
});

export default InvoiceQR;
