import firebase from 'firebase/app';
import 'firebase/firestore';

const Config = {
  apiKey: "AIzaSyA1jNhhizHoGIumBJggacDBma_ptPjhmj8",
  authDomain: "notes-2d27a.firebaseapp.com",
  projectId: "notes-2d27a",
  storageBucket: "notes-2d27a.appspot.com",
  messagingSenderId: "286917205176",
  appId: "1:286917205176:web:c0f5f8c0f560d8fa25684d"
  };

  
  firebase.initializeApp(Config);

  export default firebase;