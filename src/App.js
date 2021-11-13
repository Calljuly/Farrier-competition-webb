import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CookieConsent from "./components/UI/CookieConsent";
import { auth, storage } from "./components/UI/firebase";
import Loading from "./components/UI/IsLoading";
import { getRoutes } from "./components/UI/ProtectedRoutes";
import Login from "./pages/Login";
import * as action from "./store/actions/auth";
import * as actionComp from "./store/actions/competitionAction";

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuth);
  const isLoadingAuth = useSelector((state) => state.auth.isLoading);
  const signInState = useSelector((state) => state.auth.signInState);

  const isLoadingCompetition = useSelector(
    (state) => state.competitions.isLoading
  );

  const admin = useSelector((state) => state.auth.admin);
  
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        user.getIdTokenResult().then((idTokenResult) => {
          fetch(
            `https://us-central1-farrier-project.cloudfunctions.net/app/user/${user.uid}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((response) => {
              return response.json();
            })
            .then((users) => {
              return users.user.users;
            })
            .then((a) => {
              if (a.img !== "") {
                storage
                  .ref()
                  .child(`profiles/${a.img}`)
                  .getDownloadURL()
                  .then((url) => {
                    localStorage.setItem("auth", user.uid);
                    dispatch(
                      action.isAuth(
                        true,
                        false,
                        a,
                        url,
                        idTokenResult.claims.admin
                      )
                    );
                  })
                  .catch(() => {
                    localStorage.setItem("auth", user.uid);
                    dispatch(
                      action.isAuth(
                        true,
                        false,
                        a,
                        "",
                        idTokenResult.claims.admin
                      )
                    );
                  });
              } else {
                localStorage.setItem("auth", user.uid);
                dispatch(action.isAuth(true, false, a, "", false));
              }
            })
            .catch((error) => {
              console.log(error);
              dispatch(action.isError(true));
              dispatch(action.isAuth(false, false, {}, "", false));
            });
        });
      } else {
        dispatch(action.isAuth(false, false, {}, "", false));
      }
    });
  }, [isAuthenticated]);

  let routes = getRoutes(isAuthenticated, admin);

  useEffect(() => {
    dispatch(actionComp.fetchCompetitions());
  }, [isAuthenticated]);

  if (isLoadingAuth) {
    return <Loading />;
  }
  return (
    <>
      {signInState && <Login />}
      {isLoadingAuth && isLoadingCompetition && <Loading />}
      <CookieConsent />
      {routes}
    </>
  );
};

export default App;
