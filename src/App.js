import React, { useEffect } from "react";
import { storage } from "./components/firebase";
import { useDispatch, useSelector } from "react-redux";
import * as action from "./store/actions/auth";
import * as actionComp from "./store/actions/competitionAction";
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
              const a = users.user.find((u) => u.id === user.uid);
              return a.users;
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
      {isLoadingAuth && isLoadingCompetition && <Loading />}
      <CookieConsent />
      {routes}
    </>
  );
};

export default App;
