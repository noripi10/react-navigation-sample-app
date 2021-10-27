import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { auth } from '../libs/firebase';

export const useFirebase = () => {
  const [logined, setLogined] = useState(false);
  const currentUser = logined ? auth.currentUser : '';

  const loginWithEmailPassword = useCallback(async (email: string, password: string) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (e) {
      if (e instanceof Error) {
        Alert.alert(e.message);
      } else {
        Alert.alert('ログインに失敗しました');
        console.error(e);
      }
    }
  }, []);

  const logout = useCallback(() => {
    auth.signOut();
  }, []);

  useEffect(() => {
    const subscription = auth.onAuthStateChanged((user) => {
      if (!!user) {
        setLogined(true);
      } else {
        setLogined(false);
      }
    });

    return subscription;
  });

  return { logined, currentUser, loginWithEmailPassword, logout };
};
