import Constants from 'expo-constants';
// v8
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// v9 compat packages are API compatible with v8 code
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

// v9
// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';

const extra = Constants.manifest!.extra!;
const firebaseConfig = extra.firebaseConfig;
console.log(firebaseConfig);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// v8 or v9 compat v8
export default firebase;
export const auth = firebase.auth();
export const db = firebase.firestore();

// v9
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);
