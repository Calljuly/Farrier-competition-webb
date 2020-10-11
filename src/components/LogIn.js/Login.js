import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { TextField, Button } from "@material-ui/core";
import Farrier from "../../assets/Images/farrier.jpg";
import Spinner from "../../components/UI/Spinner";
import { useSelector } from "react-redux";

const useStyle = makeStyles({

  loginContainer: {
    width: "40%",
    height: 600,
    borderRadius: 20,
    margin: "auto",
    backgroundColor: "white",
    border: "2px solid gray",
    boxShadow: "10px 5px 5px gray",
    overflow: "hidden",
  },
  img: {
    width: "100%" /* width of container */,
    height: 200 /* height of container */,
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
  button: {
    width: "20%",
    padding: 10,
    backgroundColor: "blue",
    color: "white",
    marginTop: 20,
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
const Login = ({ auth }) => {
  const classes = useStyle();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const isError = useSelector((state) => state.auth.error);
  const [authState, setAuthState] = useState({
    email: {
      value: "",
    },
    password: {
      value: "",
    },
  });

  const handleInputChange = (id, text) => {
    const updatedState = {
      ...authState,
      [id]: {
        ...authState[id],
        value: text,
      },
    };
    setAuthState(updatedState);
  };
  return (
    <div className={classes.screen}>
      <div className={classes.loginContainer}>
        <img className={classes.img} src={Farrier} alt="Bild" />
        <div className={classes.inputContainer}>
          <h1>Logga in </h1>
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
            label="Lösenord"
            type="password"
          />
          <Button
            classes={{ root: classes.button }}
            onClick={() =>
              auth(authState.email.value, authState.password.value)
            }
          >
            Log in
          </Button>
          {isLoading && <Spinner />}
          {isError && (
            <p className={classes.failedLogin}>Inloggningen misslyckades</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
