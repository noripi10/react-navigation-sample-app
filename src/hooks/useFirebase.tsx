import { useCallback } from 'react';
import { Alert } from 'react-native';

// v8 or v0 compat
// import firebase, { auth, db } from '../libs/firebase';

import { firebaseApp } from '../libs/firebase';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithCredential,
  signOut,
  FacebookAuthProvider,
  GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore, collection, query, getDocs, Timestamp, addDoc } from 'firebase/firestore';

export interface User {
  id: string;
  name?: string;
  createDate?: Timestamp;
  updateDate?: Timestamp;
}

export const useFirebase = () => {
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  const loginWithEmailPassword = useCallback(async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
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
      return false;
    }
  }, []);

  const loginFacebook = async () => {
    const credential = FacebookAuthProvider.credential('');
    await signInWithCredential(auth, credential);
  };

  const loginGoogle = async () => {
    const credential = GoogleAuthProvider.credential('', '');
    await signInWithCredential(auth, credential);
  };

  const logout = useCallback(async () => {
    await auth.signOut();
  }, []);

  const getUsersCollection = useCallback(async () => {
    // const usersRef = collection(db, 'users');
    const _query = query(collection(db, 'users'));
    const querySnapshot = await getDocs(_query);

    const users = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id } as User;
    });

    return users;
  }, []);

  const setRoom = useCallback(async () => {
    const roomsRef = collection(db, 'rooms');
    const roomRef = await addDoc(roomsRef, { name: 'huge' });
    console.log(roomRef);
  }, []);

  return { auth, db, loginWithEmailPassword, logout, getUsersCollection, setRoom };
};
