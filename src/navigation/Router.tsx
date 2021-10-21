import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './StackNavigator';

export const Router = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};
