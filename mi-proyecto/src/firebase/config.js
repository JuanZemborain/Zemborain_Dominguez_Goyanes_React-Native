import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyB69hqnJpVv7nMIyQGoFSRHqCFx-oFVCF0",
  authDomain: "proyecto-react-native-9125e.firebaseapp.com",
  projectId: "proyecto-react-native-9125e",
  storageBucket: "proyecto-react-native-9125e.firebasestorage.app",
  messagingSenderId: "801358892185",
  appId: "1:801358892185:web:09960b07e74b3464513c08"
};
app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();