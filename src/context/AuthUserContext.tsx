import React, { createContext, Dispatch, SetStateAction, useState, useEffect, VFC } from 'react';
import Storage from '@react-native-async-storage/async-storage';

// v8
// import firebase from '../libs/firebase';

import { User } from 'firebase/auth';
import { auth } from '../libs/firebase';

type AuthUserContextProps = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

type Props = {
  children: React.ReactNode;
};

export const AuthUserContext = createContext<AuthUserContextProps>({} as AuthUserContextProps);

export const AuthProvider: VFC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    Storage.getAllKeys().then((s) => console.log('strage kyes', s));
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('user change', user);
      if (!!user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  });

  return <AuthUserContext.Provider value={{ user, setUser }}>{children}</AuthUserContext.Provider>;
};
