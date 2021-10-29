import React, { createContext, Dispatch, SetStateAction, useState, useEffect } from 'react';
import firebase from '../libs/firebase';
import Storage from '@react-native-async-storage/async-storage';

import { auth } from '../libs/firebase';

type AuthUserContextProps = {
  user: firebase.User | null;
  setUser: Dispatch<SetStateAction<firebase.User | null>>;
};

type Props = {
  children: React.ReactNode;
};

export const AuthUserContext = createContext<AuthUserContextProps>({} as AuthUserContextProps);

export const AuthUserProvider: React.VFC<Props> = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  useEffect(() => {
    Storage.getAllKeys().then((s) => console.log('strage kyes', s));
  }, []);

  useEffect(() => {
    const subscription = auth.onAuthStateChanged((user) => {
      if (!!user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return subscription;
  }, []);

  return <AuthUserContext.Provider value={{ user, setUser }}>{children}</AuthUserContext.Provider>;
};
