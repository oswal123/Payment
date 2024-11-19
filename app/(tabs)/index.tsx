import { registerRootComponent } from 'expo';
import React from 'react';
import PaymentScreen from '../../components/PaymentScreen';


const App: React.FC = () => {
  return <PaymentScreen />;
};

export default App;

registerRootComponent(App);
