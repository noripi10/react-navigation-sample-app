import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { Router } from './src/navigation/Router';

export default function App() {
  return (
    <NativeBaseProvider>
      <Router />
      <StatusBar style='auto' />
    </NativeBaseProvider>
  );
}
