import React, { useEffect } from "react";
import "./App.css";
import { firestore, storage } from "./components/firebase";
import { useDispatch, useSelector } from "react-redux";
import * as action from "./store/actions/auth";
import * as actionComp from "./store/actions/competitionAction";
import * as resultActions from "./store/actions/resultAction";
import { getRoutes } from "./components/ProtectedRoutes";
import { auth } from "./components/firebase";
import CookieConsent from "./components/CookieConsent";
import Loading from "./components/IsLoading";
import Cookies from "js-cookie";

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuth);
  const isLoadingAuth = useSelector((state) => state.auth.isLoading);
  const isLoadingCompetition = useSelector(
    (state) => state.competitions.isLoading
  );
  const user = useSelector((item) => item.auth.user);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userData = await firestore
          .collection("users")
          .doc(user.uid)
          .get();
        const a = userData.data();
        if (a.img !== "") {
          storage
            .ref()
            .child(`images/${a.img}.jpg`)
            .getDownloadURL()
            .then((url) => {
              localStorage.setItem("auth", user.uid);
              dispatch(action.isAuth(true, false, userData.data(), url));
            });
        } else {
          localStorage.setItem("auth", user.uid);
          dispatch(action.isAuth(true, false, user, ""));
        }
      } else {
        dispatch(action.isAuth(false, false, {}, ""));
      }
    });
  }, [isAuthenticated]);

  let routes = getRoutes(isAuthenticated, user?.admin ? true : false);

  useEffect(() => {
    dispatch(actionComp.fetchCompetitions());
  }, [isAuthenticated]);

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
