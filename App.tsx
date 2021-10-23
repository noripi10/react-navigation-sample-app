import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { INativebaseConfig, NativeBaseProvider } from 'native-base';
import { Router } from './src/navigation/Router';
import { LinearGradient } from 'expo-linear-gradient';

const config: INativebaseConfig = {
  dependencies: {
    'linear-gradient': LinearGradient,
  },
};

export default function App() {
  return (
    <NativeBaseProvider config={config}>
      <Router />
      <StatusBar style='auto' />
    </NativeBaseProvider>
  );
}
