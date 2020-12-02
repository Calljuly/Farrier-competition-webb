import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { TextField } from "@material-ui/core";
import Farrier from "../../assets/Images/farrier.jpg";
import Spinner from "../../components/UI/Spinner";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions/auth";
import CustomButton from "../CustomButton";
import P from "../UI/Paragraph";
import PageHeader from "../UI/PageHeader";
import { validPassword, validateEmail } from "../../helpers/validation";
import { auth } from "firebase";
const useStyle = makeStyles({
  loginContainer: {
    width: "40%",
    height: 700,
    borderRadius: 20,
    margin: "auto",
    backgroundColor: "white",
    border: "2px solid gray",
    boxShadow: "10px 5px 5px gray",
    overflow: "hidden",
  },
  img: {
    width: "100%",
    height: 200,
    objectFit: "cover",
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
  screen: {
    width: "100%",
    height: "100vh",
    display: "flex",
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
  const isLoading = useSelector((state) => state.auth.isLoading);
  const isError = useSelector((state) => state.auth.error);
  const [validForm, setValidForm] = useState(false);
  const [register, setRegister] = useState(false);
  const [authState, setAuthState] = useState({
    email: {
      value: "",
      valid: false,
    },
    password: {
      value: "",
      valid: false,
    },
  });

  const handleInputChange = (id, text) => {
    let valid;
    if (id === "email") {
      valid = validateEmail(text);
    } else {
      valid = validPassword(text);
    }
    const updatedState = {
      ...authState,
      [id]: {
        ...authState[id],
        value: text,
        valid: valid,
      },
    };
    setAuthState(updatedState);
  };

  return (
    <div className={classes.screen}>
      <div className={classes.loginContainer}>
        <img className={classes.img} src={Farrier} alt="Bild" />
        <div className={classes.inputContainer}>
          {register ? (
            <PageHeader>Register user</PageHeader>
          ) : (
            <PageHeader>Log in</PageHeader>
          )}
          <TextField
            value={authState["email"].value}
            onChange={(event) => handleInputChange("email", event.target.value)}
            className={classes.input}
            label="Email"
          />
          <TextField
            value={authState["password"].value}
            onChange={(text) =>
              handleInputChange("password", text.target.value)
            }
            className={classes.input}
            label="Password"
            type="password"
          />

          <CustomButton
            title={register ? "Register user" : "Login"}
            onClick={() =>
              dispatch(
                register
                  ? actions.signUp(
                      authState.email.value,
                      authState.password.value
                    )
                  : actions.signIn(
                      authState.email.value,
                      authState.password.value
                    )
              )
            }
          />
          {isLoading && <Spinner />}
          {validForm && (
            <P>
              Your input was not valid. Did you enter a real email adress or a
              password according to security rules ?
            </P>
          )}
          {isError && (
            <P className={classes.failedLogin}>Inloggningen misslyckades</P>
          )}
          <div style={{ display: "flex", alignItems: "center" }}>
            {!register && <P>Do you want to register ?</P>}
            <CustomButton
              title={register ? "Go to Login" : "Register"}
              onClick={() => setRegister((prev) => !prev)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
