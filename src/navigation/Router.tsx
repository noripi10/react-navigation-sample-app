import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './StackNavigator';
import Storage from '@react-native-async-storage/async-storage';

import { auth } from '../libs/firebase';
import { AuthUserContext } from '../../AppContext';
import { LoginScreen } from '../screens/LoginScreen';

export const Router = () => {
  const { user, setUser } = useContext(AuthUserContext);

  useEffect(() => {
    Storage.getAllKeys().then((s) => console.log('strage kyes', s));
  });

  useEffect(() => {
    const subscription = auth.onAuthStateChanged((user) => {
      console.log('user change', user);
      if (!!user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return subscription;
  });

  return <NavigationContainer>{user ? <StackNavigator /> : <LoginScreen />}</NavigationContainer>;
};
