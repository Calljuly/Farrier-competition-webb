import { auth, firestore } from "../../components/firebase";
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
    /*
    fetch(`https://us-central1-farrier-project.cloudfunctions.net/app/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: pass }),
    })
      .then((user) => {
        console.log(user.json());
        localStorage.setItem("auth", email);
        dispatch(isAuth(true, false, user.json()));
      })
      .catch((err) => {
        dispatch(isError(true));
        dispatch(isAuth(false, false, {}));
      });*/

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
  };
};
export const logOut = () => {
  return (dispatch) => {
    dispatch(isAuth(true, false, {}));
    auth.signOut().then((cred) => {});
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
