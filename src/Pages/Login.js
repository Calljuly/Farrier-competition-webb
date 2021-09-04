import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { resgisterNewUser } from "../apiFunctions/Api";
import { Colors } from "../colors";
import ChoiseModal from "../components/ChoiseModal";
import CustomButton from "../components/CustomButton";
import { auth } from "../components/firebase";
import TextInput from "../components/TextInput";
import Devider from "../components/UI/Devider";
import PageHeader from "../components/UI/PageHeader";
import P from "../components/UI/Paragraph";
import TopPagesHeader from "../components/UI/TopPagesHeader";
import {
  validateAge, validateEmail, validatePassword, validateText
} from "../helpers/validation";
import * as actions from "../store/actions/auth";

const textFieldsRegister = [
  {
    id: 1,
    label: "Name",
    type: "text",
    key: "name",
  },
  {
    id: 2,
    label: "Age",
    type: "number",
    key: "age",
  },
  {
    id: 3,
    label: "Address",
    type: "text",
    key: "address",
  },
  {
    id: 4,
    label: "Phone number",
    type: "number",
    key: "phone",
  },
  {
    id: 5,
    label: "Country",
    type: "text",
    key: "country",
  },
];

const useStyle = makeStyles({
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: 50,
    fontSize: 20,
    margin: 10,
  },
  failedLogin: {
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
  },
  logInContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    top: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logInButtonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 17,
  },
  blackLine: {
    backgroundColor: Colors.black,
    width: "90%",
    margin: "auto",
    height: 2,
  },
  registerButtonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  background: {
    width: "50%",
    backgroundColor: "white",
  },
});

const Login = () => {

  const classes = useStyle();
  const dispatch = useDispatch();
  const isError = useSelector((state) => state.auth.error);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const signInState = useSelector((state) => state.auth.signInState);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(isError);

  const [isOpen, setIsOpen] = useState(false);
  const [formValid, setFormValid] = useState(true);
  const history = useHistory();
  const [register, setRegister] = useState(false);
  const [authState, setAuthState] = useState({
    email: {
      value: "",
      valid: true,
    },
    password: {
      value: "",
      valid: true,
    },
    passwordConfirmed: {
      value: "",
      valid: true,
    },
    name: {
      value: "",
      valid: true,
    },
    phone: {
      value: "",
      valid: true,
    },
    address: {
      value: "",
      valid: true,
    },
    country: {
      value: "",
      valid: true,
    },
    age: {
      value: "",
      valid: true,
    },
    bio: {
      value: "",
      valid: true,
    },
  });

  if (isAuth) {
    history.push("/");
  }

  const handleInputChange = (id, text) => {
    let updatedState;
    if (id === "profileImage") {
      updatedState = {
        ...authState,
        [id]: {
          ...authState[id],
          value: text.target.files[0],
        },
      };
    } else {
      updatedState = {
        ...authState,
        [id]: {
          ...authState[id],
          value: text.target.value,
        },
      };
    }

    setAuthState(updatedState);
  };

  const handleInputValidation = (id, value) => {
    let updatedState;

    updatedState = {
      ...authState,
      [id]: {
        ...authState[id],
        valid: value,
      },
    };

    setAuthState(updatedState);
  };

  const handleValidation = (item) => {
    if (item.type === "number") {
      validateAge(authState[item.key].value, handleInputValidation, item.key);
    } else if (item.key === "profileImage") {
    } else {
      validateText(authState[item.key].value, handleInputValidation, item.key);
    }
  };

  const formValidation = () => {
    const auth = Object.keys(authState);
    let valid = true;
    auth.forEach((item) => {
      const authItem = authState[item];
      if (authItem.valid === false || authItem.value === "") {
        valid = false;
      }
    });
    setFormValid(valid);
    return valid;
  };

  const createUser = async () => {
    const valid = formValidation();

    if (valid) {
      auth
        .createUserWithEmailAndPassword(
          authState.email.value,
          authState.password.value
        )
        .then((cred) => {
          const newUser = {
            bio: authState.bio.value,
            result: [],
            name: authState.name.value,
            profileImage: "",
            address: authState.address.value,
            phone: authState.phone.value,
            country: authState.country.value,
            age: authState.age.value,
            uid: cred.user.uid,
          };
          resgisterNewUser(newUser)
            .then((data) => {
              console.log(data.message);
              if (data.message === "Success") {
                setSuccess(true);
              } else {
                setError(data.message);
              }
            })
            .catch((error) => {
              console.log(error);
              setError(error.message);
            });
        })
        .catch((err) => {
          console.log(err);
          setError("Error occured when trying to create user");
        });
    }

    setIsOpen(false);
  };

  const signIn = () => {
    dispatch(actions.signIn(authState.email.value, authState.password.value));
  };

  return (
    <div className={classes.logInContainer}>
      <div className={classes.background}>
        {register ? (
          <TopPagesHeader title="Register user" />
        ) : (
          <TopPagesHeader title="Sign in" />
        )}
        <div style={{ padding: 20 }}>
          <ChoiseModal isOpen={isOpen} handleClose={() => setIsOpen(false)}>
            <PageHeader>Are you sure ?</PageHeader>
            <P> Are you sure you want to create this user ? </P>
            <div style={{ display: "flex" }}>
              <CustomButton title="Cancel" onClick={() => setIsOpen(false)} />
              <CustomButton title="Im sure" onClick={createUser} />
            </div>
          </ChoiseModal>

          <div className={classes.inputContainer}>
            {!formValid && (
              <Alert severity="error">
                You dont have a valid form to submit, please check you inputs
              </Alert>
            )}
            {success && (
              <Alert onClose={() => setSuccess(false)}>
                New user has been created
              </Alert>
            )}
            {error.length > 0 && (
              <Alert severity="error" onClose={() => setError("")}>
                {isError}
              </Alert>
            )}
            <TextInput
              value={authState["email"].value}
              onChange={(event) => handleInputChange("email", event)}
              className={classes.input}
              label="Email"
              onBlur={() =>
                validateEmail(
                  authState["email"].value,
                  handleInputValidation,
                  "email"
                )
              }
              error={!authState["email"].valid}
              helperText={
                !authState["email"].valid &&
                "You have to enter a valid email , test@test.com"
              }
            />
            <TextInput
              value={authState["password"].value}
              onChange={(text) => handleInputChange("password", text)}
              className={classes.input}
              label="Password"
              type="password"
              onBlur={() =>
                validatePassword(
                  authState["password"].value,
                  handleInputValidation,
                  "password"
                )
              }
              error={!authState["password"].valid}
              helperText={
                !authState["password"].valid &&
                "You have to enter a valid password, aleast 6 characters"
              }
            />
            {register && (
              <>
                <TextInput
                  value={authState["passwordConfirmed"].value}
                  onChange={(text) =>
                    handleInputChange("passwordConfirmed", text)
                  }
                  className={classes.input}
                  label="Confirm password"
                  type="password"
                  onBlur={() =>
                    validatePassword(
                      authState["passwordConfirmed"].value,
                      handleInputValidation,
                      "passwordConfirmed"
                    )
                  }
                  error={!authState["passwordConfirmed"].valid}
                  helperText={
                    !authState["passwordConfirmed"].valid &&
                    "You have to enter a valid password, aleast 6 characters"
                  }
                />

                {textFieldsRegister.map((item) => (
                  <TextInput
                    key={item.id}
                    value={authState[item.key].value}
                    onChange={(text) => handleInputChange(item.key, text)}
                    className={classes.input}
                    label={item.label}
                    type={item.type}
                    onBlur={() => handleValidation(item)}
                    error={!authState[item.key].valid}
                    helperText={
                      !authState[item.key].valid &&
                      "You have to enter a valid password, aleast 6 characters"
                    }
                  />
                ))}
                <TextInput
                  value={authState["bio"].value}
                  onChange={(text) => handleInputChange("bio", text)}
                  className={classes.input}
                  label="Write something about yourself"
                  type="text"
                  multiline
                  rows={4}
                />
              </>
            )}

            <Devider margin={30} />
            <div className={classes.logInButtonContainer}>
              {register && (
                <>
                  <CustomButton
                    onClick={() => {
                      dispatch(actions.changeSignInState(!signInState));
                      history.push("/");
                    }}
                    title="Go Back"
                  />
                  <p>{!register && "Not having a account ?"}</p>
                  <CustomButton
                    title={register ? "Go to Login" : "Register"}
                    onClick={() => setRegister((prev) => !prev)}
                  />
                </>
              )}
              <CustomButton
                title={register ? "Register user" : "Login"}
                onClick={() => (register ? setIsOpen(true) : signIn())}
              />
            </div>
            {!register && (
              <>
                <div className={classes.blackLine} />
                <div className={classes.registerButtonContainer}>
                  <CustomButton
                    onClick={() => {
                      dispatch(actions.changeSignInState(!signInState));
                      history.push("/");
                    }}
                    title="Go Back"
                  />
                  <p>{!register && "Not having a account ?"}</p>
                  <CustomButton
                    title={register ? "Go to Login" : "Register"}
                    onClick={() => setRegister((prev) => !prev)}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
