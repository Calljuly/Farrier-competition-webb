import { auth, firestore } from "../../components/firebase";
import Cookies from "js-cookie";

export const IS_AUTH = "IS_AUTH";
export const IS_LOADING = "IS_LOADING";
export const ERROR = "ERROR";

export const signUp = (email, pass) => {
  return (dispatch) => {
    dispatch(isAuth(false, true, {}));
    auth
      .createUserWithEmailAndPassword(email, pass)
      .then((cred) => {
        return firestore.collection("users").doc(cred.user.uid).set({
          info: "",
          result: "",
          name: "",
          img: "",
        });
      })
      .then(() => {
        //signIn(email, pass);
        dispatch(isAuth(false, false, {}));
        alert("User sucsessfully created");
      });
  };
};
export const signIn = (email, pass) => {
  return (dispatch) => {
    dispatch(isAuth(false, true, {}));
    auth
      .signInWithEmailAndPassword(email, pass)
      .then(({ user }) => {
        return user.getIdToken().then((token) => {
          fetch(
            "https://us-central1-farrier-project.cloudfunctions.net/app/logIn",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "CSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
              },
              body: JSON.stringify(token),
            }
          );
        });
      })
      .then(() => {
        dispatch(isAuth(true, false, {}));
        localStorage.setItem("auth", true);
      })
      .catch((err) => {
        dispatch(isAuth(false, false, {}));
        localStorage.removeItem("auth");
      });

    /*
          auth
      .signInWithEmailAndPassword(email, pass)
      .then((cred) => {
        firestore
          .collection("users")
          .doc(cred.user.uid)
          .get()
          .then((doc) => {
            localStorage.setItem("auth", cred.user.uid);
            dispatch(isAuth(true, false, doc.data()));
          });
      })
      .catch((err) => {
        dispatch(isError(true));
        dispatch(isAuth(false, false, {}));
      });
      */
  };
};

export const logOut = () => {
  return (dispatch) => {
    dispatch(isAuth(true, false, {}));
    auth.signOut().then((cred) => {
      fetch(
        "https://us-central1-farrier-project.cloudfunctions.net/app/logOut",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "CSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
          },
        }
      );
    });
    localStorage.removeItem("auth");
    dispatch(isAuth(false, false, {}));
  };
};
export const isAuth = (isAuthenticated, loading, user) => {
  return {
    type: IS_AUTH,
    auth: isAuthenticated,
    isLoadning: loading,
    user: user,
  };
};

export const isLoadning = (loading) => {
  return {
    type: IS_LOADING,
    isLoadning: loading,
  };
};
export const isError = (error) => {
  return {
    type: ERROR,
    error: error,
  };
};
