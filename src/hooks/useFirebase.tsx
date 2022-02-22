import { useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithCredential,
  signOut,
  FacebookAuthProvider,
  GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore, collection, query, getDocs, Timestamp, addDoc } from 'firebase/firestore';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { ResponseType } from 'expo-auth-session';
import Constants from 'expo-constants';

import { firebaseApp } from '../libs/firebase';

console.info('extra', Constants.manifest.extra);

WebBrowser.maybeCompleteAuthSession();
export interface User {
  id: string;
  name?: string;
  createDate?: Timestamp;
  updateDate?: Timestamp;
}

export type UseFirebase = ReturnType<typeof useFirebase>;

export const useFirebase = () => {
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  const [requestGoogle, responseGoogle, promptGoogleAsync] = Google.useAuthRequest({
    responseType: ResponseType.IdToken,
    expoClientId: Constants.manifest.extra.googleWebClientId ?? '',
  });

  const [requestFacebook, responseFaceBook, promptFacabookAync] = Facebook.useAuthRequest({
    responseType: ResponseType.Token,
    clientId: Constants.manifest.extra.faceBookAppId ?? '',
  });

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

  const loginFacebook = () => {
    promptFacabookAync();
  };

  const loginGoogle = () => {
    promptGoogleAsync();
  };

  const logout = useCallback(async () => {
    await signOut(auth);
  }, []);

  const getUsersCollection = useCallback(async () => {
    const _query = query(collection(db, 'users'));
    const querySnapshot = await getDocs(_query);

    const users = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id } as User;
    });

    return users;
  }, []);

  const setRoom = useCallback(async () => {
    const roomsRef = collection(db, 'rooms');
    const roomRef = await addDoc(roomsRef, { name: auth.currentUser.displayName });
    console.log(roomRef);
  }, []);

  useEffect(() => {
    if (!!responseFaceBook) {
      if (responseFaceBook.type === 'success') {
        console.log(responseFaceBook.params);
        const accessToken = responseFaceBook.params['access_token'];
        const credential = FacebookAuthProvider.credential(accessToken);
        signInWithCredential(auth, credential);
      }
      if (responseFaceBook.type === 'error') {
        console.error(responseFaceBook.error);
        Alert.alert('ログインに失敗しました。');
      }
    }
  }, [responseFaceBook]);

  useEffect(() => {
    if (!!responseGoogle) {
      if (responseGoogle.type === 'success') {
        console.log(responseGoogle.params);
        const token = responseGoogle.params['id_token'];
        const credential = GoogleAuthProvider.credential(token);
        signInWithCredential(auth, credential);
      }
      if (responseGoogle.type === 'error') {
        console.error(responseGoogle.error);
        Alert.alert('ログインに失敗しました。');
      }
    }
  }, [responseGoogle]);

  return {
    auth,
    db,
    loginWithEmailPassword,
    logout,
    getUsersCollection,
    setRoom,
    loginFacebook,
    loginGoogle,
    requestFacebook,
    requestGoogle,
  };
};
