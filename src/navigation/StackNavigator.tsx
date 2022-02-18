import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomNavigator, BottomNavigatorParamList } from './BottomNavigator';
import { ModalScreen } from '../screens/ModalScreen';
import { NavigatorScreenParams } from '@react-navigation/core';

export type StackParamList = {
  Tabs: NavigatorScreenParams<BottomNavigatorParamList>;
  FullModal: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ presentation: 'transparentModal', headerShown: false }}>
      <Stack.Screen name='Tabs' component={BottomNavigator} />
      <Stack.Screen name='FullModal' component={ModalScreen} />
    </Stack.Navigator>
  );
};
