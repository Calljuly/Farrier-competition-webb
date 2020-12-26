import React, { useState } from "react";

import { resetPassword } from "../../databaseFunctions";
import { auth } from "../firebase";
import CustomButton from "../CustomButton";
import P from "../UI/Paragraph";
import TextInput from "../TextInput";
import PageHeader from "../UI/PageHeader";
import ChoiseModal from "../ChoiseModal";
import { Alert } from "@material-ui/lab";

let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const EditEmailAndPassword = () => {
  const [authState, setAuthState] = useState({
    email: {
      value: "",
      valid: true,
    },
    password: {
      value: "",
      valid: true,
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const changePassword = () => {
    const user = auth.currentUser;
    let credential;

    if (user) {
      console.log(user);
      resetPassword(user.email);
    }
  };
  const updateEmail = () => {
    console.log(authState.email.value);
    if (authState.email.value.length > 5 && authState.email.value === "") {
      setIsOpen(false);
      setError("Your email is not valid");

      handleInputChange("email", "");
      handleInputChange("password", "");
      return;
    }
    if (!regEmail.test(authState.email.value)) {
      setIsOpen(false);
      setError("Your email is not an email address");

      handleInputChange("email", "");
      handleInputChange("password", "");
      return;
    }
    const user = auth.currentUser;

    auth
      .signInWithEmailAndPassword(user.email, authState.password.value)
      .then((userCredential) => {
        console.log(authState.email.value);
        //userCredential.user.updateEmail(newEmail);
        setSuccess(true);
      })
      .catch((error) => {
        console.log("Could not log in ");
      });
    setError("");
    setIsOpen(false);
    handleInputChange("email", "");
    handleInputChange("password", "");
  };
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
    <div style={{ display: "flex", flexDirection: "column", width: "90%" }}>
      <ChoiseModal isOpen={isOpen} handleClose={() => setIsOpen(false)}>
        <PageHeader>Are you sure ?</PageHeader>
        <P> Are you sure you want update this class ? </P>
        <div style={{ display: "flex" }}>
          <CustomButton title="Cancel" onClick={() => setIsOpen(false)} />
          <CustomButton title="Im sure" onClick={() => updateEmail()} />
        </div>
      </ChoiseModal>
      <PageHeader>Change password</PageHeader>
      <P>Do you want change your password ? </P>
      <P>
        Press the button below and you will will recive an email to your picked
        email adress. Follow the link in your email and you will be able to
        change your password
      </P>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <CustomButton title="Change password" onClick={changePassword} />
      </div>
      <PageHeader>Change Email</PageHeader>
      {error.length > 0 && <Alert severity="error">{error}</Alert>}
      {success && (
        <Alert onClose={() => setSuccess(false)}>
          You updated your email sucsessfully!
        </Alert>
      )}
      <TextInput
        value={authState.email.value}
        onChange={(text) => handleInputChange("email", text.target.value)}
        label="New email"
        type="text"
      />
      <TextInput
        value={authState.password.value}
        onChange={(text) => handleInputChange("password", text.target.value)}
        label="Password"
        type="password"
      />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <CustomButton
          title="Change Email"
          onClick={() => setIsOpen((prev) => !prev)}
        />
      </div>
    </div>
  );
};

export default EditEmailAndPassword;