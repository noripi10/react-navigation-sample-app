import Constants from 'expo-constants';

// v9 compat packages are API compatible with v8 code
// import firebase from 'firebase/compat/app';
// import 'firebase/auth';
// import 'firebase/firestore';

// const extra = Constants.manifest!.extra!;
// const config = extra.firebaseConfig;

// // console.log(config);

// if (!firebase.apps.length) {
//   firebase.initializeApp(config);
// }

// export default firebase;
// export const auth = firebase.auth();
// export const db = firebase.firestore();

// v9
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = Constants.manifest!.extra!.firebaseConfig;

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
