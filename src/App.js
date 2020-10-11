import React, { useEffect } from "react";
import "./App.css";
import { auth, firestore } from "./components/firebase";
import { useDispatch, useSelector } from "react-redux";
import * as action from "./store/actions/auth";
import * as actionComp from "./store/actions/CompActions";
import { getRoutes } from "./components/ProtectedRoutes";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      dispatch(action.isAuth(true, false));
    }
  }, []);

  useEffect(() => {
    firestore.collection("competitions").onSnapshot((collection) => {
      const competitions = collection.docs.map((data) => data.data());
      dispatch(actionComp.fetchCompetitions(competitions));
    });
  }, []);

  const signIn = (email, pass) => {
    dispatch(() => action.isLoadning(true));
    auth
      .signInWithEmailAndPassword(email, pass)
      .then((cred) => {
        if (cred) {
          localStorage.setItem("auth", email);
          dispatch(action.isAuth(true, false));
        }
      })
      .catch((err) => {
        dispatch(action.isError(true));
        dispatch(action.isAuth(false, false));
      });
  };

  const logOut = () => {
    auth.signOut().then((cred) => {
      localStorage.removeItem("auth");
      dispatch(action.isAuth(false, false));
    });
  };

  let routes = getRoutes(logOut, signIn, isAuthenticated, false);

  return <div>{routes}</div>;
}

export default App;
