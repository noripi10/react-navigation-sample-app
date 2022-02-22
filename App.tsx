import React from 'react';
import { LogBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { INativebaseConfig, NativeBaseProvider } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';

import { AuthUserProvider } from './src/contexts/AuthContext';
import { Router } from './src/navigation/Router';

LogBox.ignoreLogs([/^AsyncStorage has been/]);

const config: INativebaseConfig = {
  dependencies: {
    'linear-gradient': LinearGradient,
  },
};

export default function App() {
  return (
    <NativeBaseProvider config={config}>
      <AuthUserProvider>
        <Router />
      </AuthUserProvider>
      <StatusBar style='auto' />
    </NativeBaseProvider>
  );
}
