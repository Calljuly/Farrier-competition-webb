import React, { useEffect } from "react";
import "./App.css";
import { firestore } from "./components/firebase";
import { useDispatch, useSelector } from "react-redux";
import * as action from "./store/actions/auth";
import * as actionComp from "./store/actions/competitionAction";
import * as resultActions from "./store/actions/resultAction";
import { getRoutes } from "./components/ProtectedRoutes";
import { auth } from "./components/firebase";
import CookieConsent from "./components/CookieConsent";
import { useFirebase } from "./hooks/useFirebase";
import Loading from "./components/IsLoading";
import { getCompetitions } from "./components/apiFunctions";

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuth);
  const isLoading = useSelector((state) => state.auth.isLoading);

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
            });
        }
      });
    }
  }, [dispatch]);

  let routes = getRoutes(isAuthenticated, true);

  const { data, status, error } = useFirebase(
    firestore.collection("competitions")
  );
  if (status === "loading") {
    return <Loading />;
  }

  if (status === "error") {
    return `Error: ${error.message}`;
  }
  if (data) {
    dispatch(actionComp.fetchCompetitions(data));
    dispatch(resultActions.fetchAdminComps(data));
  }
  return (
    <>
      {isLoading && <Loading />}
      <CookieConsent />
      {routes}
    </>
  );
};

export default App;
