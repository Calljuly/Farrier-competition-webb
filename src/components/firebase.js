import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyDPMpX_mWakVaDXRPeklWXMNxtciQPL_gI",
  authDomain: "farrier-project.firebaseapp.com",
  databaseURL: "https://farrier-project.firebaseio.com",
  projectId: "farrier-project",
  storageBucket: "farrier-project.appspot.com",
  messagingSenderId: "461661535814",
  appId: "1:461661535814:web:fe57d1f403bcd5574ed447",
  measurementId: "G-XTGZ5X7NCX",
};
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
/*
const auth = firebase.auth();
const db = firebase.firestore();

export const signUp = (email, password) => {
  auth.createUserWithEmailAndPassword(email, password).then((cred) => {
    //If cred exist user are logged in
  });
};

export const signIn = (email, password) => {
  auth.signIn(email, password).then((cred) => {
    //If cred exist user are logged in
    //cred.user loggs the info about the user
  });
};
export const logOut = () => {
  auth.signOut().then(() => {
    console.log("User logged out");
  });
};
auth.onAuthStateChanged((user) => {
  //methdo will keep track if a user signsin or out.
  //u will get a user object back if sign in or null if logged out
});
*/
