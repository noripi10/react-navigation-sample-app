import React, { createContext, Dispatch, SetStateAction, useState } from 'react';
import firebase from './src/libs/firebase';

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

  return <AuthUserContext.Provider value={{ user, setUser }}>{children}</AuthUserContext.Provider>;
};
