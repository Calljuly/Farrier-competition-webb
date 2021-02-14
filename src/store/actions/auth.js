import { auth } from "../../components/firebase";

export const IS_AUTH = "IS_AUTH";
export const IS_LOADING = "IS_LOADING";
export const ERROR = "ERROR";
export const NEW_USER_DATA = "NEW_USER_DATA";
export const NEW_USER_IMAGE = "NEW_USER_IMAGE";
export const CHANGE_SIGNIN_STATE = "CHANGE_SIGNIN_STATE";

export const signUp = (user) => {
  return (dispatch) => {
    dispatch(isAuth(false, true, {}, false));
    if (user.password.value === user.passwordConfirmed.value) {
      throw new Error("Passwords not alike");
    }

    auth
      .createUserWithEmailAndPassword(user.email.value, user.password.value)
      .then((cred) => {
        dispatch(logOut());

        const newUser = {
          bio: user.bio.value,
          result: [],
          name: user.name.value,
          profileImage: user.profileImage.value.name,
          address: user.address.value,
          phone: user.phone.value,
          country: user.country.value,
          age: user.age.value,
        };

        fetch(
          `https://us-central1-farrier-project.cloudfunctions.net/app/user/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          }
        )
          .then((response) => {
            return response.json();
          })
          .then((users) => {
            console.log(users);
            return users;
          })
          .catch((error) => {
            console.log(error);
            dispatch({
              type: IS_AUTH,
              isAuthenticated: false,
              isLoadning: false,
              user: {},
              userImage: "",
              admin: false,
            });
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
    dispatch(isAuth(false, true, {}, false));

    auth
      .signInWithEmailAndPassword(email, pass)
      .then((cred) => {
        localStorage.setItem("auth", cred.user.uid);
        dispatch(changeSignInState(false));
      })
      .catch((err) => {
        dispatch(isError("Your email or password is wrong, please try again!"));
        dispatch(isAuth(false, false, {}, "", false));
        dispatch(changeSignInState(false));
      });
  };
};

export const logOut = () => {
  return (dispatch) => {
    dispatch(isAuth(false, true, {}, false));
    auth.signOut().then((cred) => {
      localStorage.removeItem("auth");
      dispatch(isAuth(false, false, {}, "", false));
      dispatch(changeSignInState(false));
    });
  };
};

export const createAdmin = (email) => {
  return (dispatch) => {
    fetch(
      `https://us-central1-farrier-project.cloudfunctions.net/app/createAdmin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  };
};
export const isAuth = (isAuthenticated, loading, user, url, admin) => {
  return {
    type: IS_AUTH,
    auth: isAuthenticated,
    isLoadning: loading,
    user: user,
    userImage: url,
    admin: admin,
  };
};
export const newUserData = (user) => {
  return {
    type: NEW_USER_DATA,
    user: user,
  };
};
export const newUserImage = (picture) => {
  return {
    type: NEW_USER_IMAGE,
    picture: picture,
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
export const changeSignInState = (state) => {
  return {
    type: CHANGE_SIGNIN_STATE,
    state: state,
  };
};
