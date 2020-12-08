import { auth, firestore, storage } from "../../components/firebase";
import Cookies from 'js-cookie';

export const IS_AUTH = "IS_AUTH";
export const IS_LOADING = "IS_LOADING";
export const ERROR = "ERROR";

export const signUp = (user) => {
  return (dispatch) => {
    dispatch(isAuth(false, true, {}));
    if (user.password === user.passwordConfirmed) {
      throw new Error("Passwords not alike");
    }
    auth
      .createUserWithEmailAndPassword(user.email.value, user.password.value)
      .then((cred) => {
        /*
        const uploadTask = storage
          .ref(`profiles/${cred.user.uid}/${user.profileImage.value}`)
          .put(user.profileImage.value);
        uploadTask.on(
          "state_changed",
          (snapShot) => {
            console.log(snapShot);
          },
          (err) => {
            console.log(err);
          }
        );*/

        return firestore.collection("users").doc(cred.user.uid).set({
          bio: user.bio.value,
          result: [],
          name: user.name.value,
          img: user.profileImage.value,
          address: user.address.value,
          phone: user.phone.value,
          country: user.country.value,
          age: user.age.value,
        });
      })
      .then(() => {
        dispatch(isAuth(false, false, {}));
        alert("User sucsessfully created");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const signIn = (email, pass) => {
  return (dispatch) => {
    dispatch(isAuth(false, true, {}));
    /*
    auth
      .signInWithEmailAndPassword(email, pass)
      .then(({ user }) => {

      
        fetch(
          `https://us-central1-farrier-project.cloudfunctions.net/app/user/${user.uid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            const validUser = data.user.filter((item) => {
              if (item.id === user.uid) {
                return item.competition;
              }
            });
            localStorage.setItem("auth", validUser.uid);
            dispatch(isAuth(true, false, validUser[0].competition));
          });
      })
      .then(() => {
        /* const expiresIn = 60 * 60 * 24 * 5 * 1000;
        admin
          .auth()
          .createSessionCookie(idToken, { expiresIn })
          .then(async(sessionCookie) => {
            const options = { maxAge: expiresIn, httpOnly: true };
            res.cookie("session", sessionCookie, options);
            //res.end(JSON.stringify({ status: "success" }));
           const user = await db.collection("users").doc(userId).get();
            result(null, {
              type: "Sucsess",
              user: user
            });
            return;
          })
          .catch((error) => {
            result(null, {
              type: "Error",
              error: error,
            });
            return;
          });
      })
      .catch((err) => {
        dispatch(isAuth(false, false, {}));
        localStorage.removeItem("auth");
      });
*/

    auth
      .signInWithEmailAndPassword(email, pass)
      .then(async (cred) => {
        firestore
          .collection("users")
          .doc(cred.user.uid)
          .get()
          .then((doc) => {
            const user = doc.data();
            storage
              .ref()
              .child(`images/${user.img}.jpg`)
              .getDownloadURL()
              .then((url) => {
                Cookies.set('user', 'value', { expires: 7 })
                localStorage.setItem("auth", cred.user.uid);
                dispatch(isAuth(true, false, user, url));
              });
          })
          .catch((err) => {
            console.log(err);
          });
        const ref = firestore.collection("users").doc(cred.user.uid);
        await ref.get().then((userData) => {
          console.log(userData.data());
        });
      })
      .catch((err) => {
        dispatch(isError(true));
        dispatch(isAuth(false, false, {}, ""));
      });
  };
};

export const logOut = () => {
  return (dispatch) => {
    dispatch(isAuth(true, false, {}));
    auth.signOut().then((cred) => {
      Cookies.remove('user')
      dispatch(isAuth(false, false, {}, ""));
    });
  };
};

export const isAuth = (isAuthenticated, loading, user, url) => {
  return {
    type: IS_AUTH,
    auth: isAuthenticated,
    isLoadning: loading,
    user: user,
    userImage: url,
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
