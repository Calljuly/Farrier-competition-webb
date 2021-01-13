import { auth, firestore, storage } from "../../components/firebase";
import Cookies from "js-cookie";

export const IS_AUTH = "IS_AUTH";
export const IS_LOADING = "IS_LOADING";
export const ERROR = "ERROR";

export const signUp = (user) => {
  return (dispatch) => {

    dispatch(isAuth(false, true, {}, false));
    if (user.password.value === user.passwordConfirmed.value) {
      throw new Error("Passwords not alike");
    }

    auth
      .createUserWithEmailAndPassword(user.email.value, user.password.value)
      .then((cred) => {
       
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
        /*
        return firestore.collection("users").doc(cred.user.uid).set({
          bio: user.bio.value,
          result: [],
          name: user.name.value,
          img: user.profileImage.value,
          address: user.address.value,
          phone: user.phone.value,
          country: user.country.value,
          age: user.age.value,
        });*/
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
      .then(async (cred) => {
        fetch(
          `https://us-central1-farrier-project.cloudfunctions.net/app/user/${cred.user.uid}`,
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
            const a = users.user.find((u) => u.id === cred.user.uid);
            return a.users;
          })
          .then((user) => {
            storage
              .ref()
              .child(`images/${user.img}.jpg`)
              .getDownloadURL()
              .then((url) => {
                
                Cookies.set("user", "value", { expires: 7 });
                localStorage.setItem("auth", user.uid);
                dispatch(isAuth(true, false, user, url, false));
              });
          })
          .catch((error) => {
            console.log(error);
            dispatch(isAuth(false, false, {}, "", false));
          });
      })
      .catch((err) => {
        dispatch(isError(true));
        dispatch(isAuth(false, false, {}, "", false));
      });
  };
};
export const updateUser = (id, user) => {
  fetch(
    `https://us-central1-farrier-project.cloudfunctions.net/app/user/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: user }),
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((users) => {
      return users.user;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const logOut = () => {
  return (dispatch) => {
    dispatch(isAuth(false, true, {}, false));
    auth.signOut().then((cred) => {
      Cookies.remove("user");
      dispatch(isAuth(false, false, {}, "", false));
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
