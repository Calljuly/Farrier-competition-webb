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
import Loading from "./components/IsLoading";

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuth);
  const isLoadingAuth = useSelector((state) => state.auth.isLoading);
  const isLoadingCompetition = useSelector(
    (state) => state.competitions.isLoading
  );
  const user = useSelector((item) => item.auth.user);
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

  let routes = getRoutes(isAuthenticated, user.admin ? true : false);

  useEffect(() => {
    dispatch(actionComp.fetchCompetitions());
  }, []);

  if (isLoadingAuth || isLoadingCompetition) {
    return <Loading />;
  }

  return (
    <>
      {isLoadingAuth && isLoadingCompetition && <Loading />}
      <CookieConsent />
      {routes}
    </>
  );
};

export default App;
