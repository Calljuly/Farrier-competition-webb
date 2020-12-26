import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
const APIKEY = process.env.REACT_APP_FIREBASE_KEY;

var firebaseConfig = {
  apiKey: APIKEY,
  authDomain: "farrier-project.firebaseapp.com",
  databaseURL: "https://farrier-project.firebaseio.com",
  projectId: "farrier-project",
  storageBucket: "farrier-project.appspot.com",
  messagingSenderId: "461661535814",
  appId: "1:461661535814:web:fe57d1f403bcd5574ed447",
  measurementId: "G-XTGZ5X7NCX",
};
firebase.initializeApp(firebaseConfig);
//firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
