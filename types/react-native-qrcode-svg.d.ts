declare module 'react-native-qrcode-svg' {
    import React from 'react';
    import { SvgProps } from 'react-native-svg';
  
    interface QRCodeProps extends SvgProps {
      value: string;
      size?: number;
      color?: string;
      backgroundColor?: string;
      getRef?: (c: QRCode | null) => void;
    }
  
    export default class QRCode extends React.Component<QRCodeProps> {
      toDataURL(callback: (base64: string) => void): void;
    }
  }
  