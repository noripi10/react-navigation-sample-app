import React, { createContext, Dispatch, SetStateAction, useState, useEffect } from 'react';
import Storage from '@react-native-async-storage/async-storage';

import { firebaseApp } from '../libs/firebase';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useFirebase } from '../hooks/useFirebase';

type AuthUserContextProps = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

type Props = {
  children: React.ReactNode;
};

export const AuthUserContext = createContext<AuthUserContextProps>({} as AuthUserContextProps);

export const AuthUserProvider: React.VFC<Props> = ({ children }) => {
  const { auth } = useFirebase();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    Storage.getAllKeys().then((s) => console.log('strage kyes', s));
  }, []);

  useEffect(() => {
    const subscription = onAuthStateChanged(auth, (user) => {
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
