import React, { useEffect } from "react";
import "./App.css";
import { firestore } from "./components/firebase";
import { useDispatch, useSelector } from "react-redux";
import * as action from "./store/actions/auth";
import * as actionComp from "./store/actions/CompActions";
import * as resultActions from "./store/actions/resultAction";
import { getRoutes } from "./components/ProtectedRoutes";
import { auth } from "./components/firebase";
import CookieConsent from "./components/CookieConsent";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      auth.onAuthStateChanged((user) => {
        if (user) {
          firestore
            .collection("users")
            .doc(user.uid)
            .get()
            .then((item) => {
              dispatch(action.isAuth(true, false, item.data()));
              if (item.data().admin) {
                const user = item.data();
                firestore
                  .collection("competitions")
                  .onSnapshot((collection) => {
                    const competitionsAdmin = collection.docs.filter((item) => {
                      if (item.data().admins.includes(user.name)) {
                        return item.data();
                      }
                    });
                    dispatch(resultActions.fetchAdminComps(competitionsAdmin));
                  });
              }
            });
        }
      });
    }
  }, [dispatch]);

  useEffect(() => {
    firestore.collection("competitions").onSnapshot((collection) => {
      const competitions = collection.docs.map((data) => data.data());
      dispatch(actionComp.fetchCompetitions(competitions));
    });
  }, [dispatch]);

  let routes = getRoutes(isAuthenticated, true);

  return (
    <>
      <CookieConsent />
      {routes}
    </>
  );
}

export default App;
