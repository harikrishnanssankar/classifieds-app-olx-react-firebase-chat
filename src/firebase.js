import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC-N-XjON5GOJ6Bqq9Cnx9UPri_5CwZunA",
    authDomain: "olx-clone-83579.firebaseapp.com",
    projectId: "olx-clone-83579",
    storageBucket: "olx-clone-83579.appspot.com",
    messagingSenderId: "940914424748",
    appId: "1:940914424748:web:3a6ee03482e789bbde5809"
  };


export const Firebase = firebase.initializeApp(firebaseConfig);
const db = Firebase.firestore();
const auth = firebase.auth();

export { auth };
export default db;
