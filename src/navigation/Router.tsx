import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './StackNavigator';

import { AuthUserContext } from '../contexts/AuthContext';
import { LoginScreen } from '../screens/LoginScreen';

export const Router = () => {
  const { user } = useContext(AuthUserContext);

  return <NavigationContainer>{user ? <StackNavigator /> : <LoginScreen />}</NavigationContainer>;
};
