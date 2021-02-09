import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../store/actions/auth";
import CustomButton from "../components/CustomButton";
import P from "../components/UI/Paragraph";
import PageHeader from "../components/UI/PageHeader";
import {
  validatePassword,
  validateEmail,
  validateText,
  validateAge,
} from "../helpers/validation";
import TextInput from "../components/TextInput";
import Devider from "../components/UI/Devider";
import ChoiseModal from "../components/ChoiseModal";
import { useHistory } from "react-router-dom";
import { auth } from "../components/firebase";
import { resgisterNewUser } from "../ApiFunctions/Api";
import { Alert } from "@material-ui/lab";
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
  loginContainer: {
    width: "70%",
    borderRadius: 20,
    margin: "auto",
    backgroundColor: "white",
    border: "2px solid gray",
    boxShadow: "10px 5px 5px gray",
    overflow: "hidden",
  },
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
});

const Login = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const isError = useSelector((state) => state.auth.error);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

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
    const a = Object.keys(authState);
    let valid = true;
    a.forEach((item) => {
      const b = authState[item];
      if (b.valid === false || b.value === "") {
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

  if (isAuth) {
    history.push("/");
  }

  return (
    <div>
      <ChoiseModal isOpen={isOpen} handleClose={() => setIsOpen(false)}>
        <PageHeader>Are you sure ?</PageHeader>
        <P> Are you sure you want to create this user ? </P>
        <div style={{ display: "flex" }}>
          <CustomButton title="Cancel" onClick={() => setIsOpen(false)} />
          <CustomButton title="Im sure" onClick={createUser} />
        </div>
      </ChoiseModal>
      <div className={classes.inputContainer}>
        {register ? (
          <PageHeader>Register user</PageHeader>
        ) : (
          <PageHeader>Log in</PageHeader>
        )}
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
            error
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
              onChange={(text) => handleInputChange("passwordConfirmed", text)}
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

        {false && (
          <P>
            Your input was not valid. Did you enter a real email adress or a
            password according to security rules ?
          </P>
        )}
        {isError && (
          <P className={classes.failedLogin}>Inloggningen misslyckades</P>
        )}
        <Devider margin={50} />
        <CustomButton
          title={register ? "Register user" : "Login"}
          onClick={() =>
            register
              ? setIsOpen(true)
              : dispatch(
                  actions.signIn(
                    authState.email.value,
                    authState.password.value
                  )
                )
          }
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          {!register && <P>Do you want to register ?</P>}
          <CustomButton
            title={register ? "Go to Login" : "Register"}
            onClick={() => setRegister((prev) => !prev)}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
