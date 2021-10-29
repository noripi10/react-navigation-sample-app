import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import firebase, { auth, db } from '../libs/firebase';
// import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
// import { collection, getDocs, Timestamp, doc, setDoc } from 'firebase/firestore';

export interface User {
  id: string;
  name?: string;
  createDate?: firebase.firestore.Timestamp;
  updateDate?: firebase.firestore.Timestamp;
}

export const useFirebase = () => {
  const loginWithEmailPassword = useCallback(async (email: string, password: string) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      // auth
      //   .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      //   .then(() => {
      //     // Existing and future Auth states are now persisted in the current
      //     // session only. Closing the window would clear any existing state even
      //     // if a user forgets to sign out.
      //     // ...
      //     // New sign-in will be persisted with session persistence.
      //     return firebase.auth().signInWithEmailAndPassword(email, password);
      //   })
      //   .catch((error) => {
      //     // Handle Errors here.
      //     var errorCode = error.code;
      //     var errorMessage = error.message;
      //   });
    } catch (e) {
      if (e instanceof Error) {
        Alert.alert(e.message);
      } else {
        Alert.alert('ログインに失敗しました');
        console.error(e);
      }
    }
  }, []);

  const logout = useCallback(async () => {
    await auth.signOut();
  }, []);

  const getUsersCollection = useCallback(async () => {
    // const usersRef = collection(db, 'users');
    const querySnapshot = await db.collection('users').get();
    const users = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id } as User;
    });

    querySnapshot.forEach((doc) => {
      console.log(doc.id);
    });
    console.log({ users, length: users.length });
    return users;
  }, []);

  const setRoom = useCallback(async () => {
    const roomsRef = db.collection('users').doc();
    await roomsRef.set({ name: 'hoge' });
  }, []);

  return { loginWithEmailPassword, logout, getUsersCollection, setRoom };
};
