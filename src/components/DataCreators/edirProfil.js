import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import CustomButton from "../CustomButton";
import P from "../UI/Paragraph";
import PageHeader from "../UI/PageHeader";
import { validateText, validateAge } from "../../helpers/validation";
import TextInput from "../TextInput";
import Devider from "../UI/Devider";
import ChoiseModal from "../ChoiseModal";
import { auth } from "../firebase";
import * as actions from "../../store/actions/auth";
import { useSelector } from "react-redux";
import ButtonContainer from "../UI/ButtonContainer";

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
  {
    id: 6,
    label: "",
    type: "file",
    key: "profileImage",
  },
];

const useStyle = makeStyles({
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    ["@media (max-width:1000px)"]: {
      width: "90%",
      margin: "auto",
    },
  },
  input: {
    width: "100%",
    height: 50,
    fontSize: 20,
    margin: 10,
  },
});

const EditProfile = () => {
  const classes = useStyle();
  const [isOpen, setIsOpen] = useState(false);
  const userState = useSelector((state) => state.auth.user);
  const [authState, setAuthState] = useState({
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
    profileImage: {
      value: "",
      valid: true,
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
    } else {
      validateText(authState[item.key].value, handleInputValidation, item.key);
    }
  };
  const updateUser = () => {
    let user = {};
    let newUser = userState;

    Object.keys(authState).forEach((item, index) => {
      const data = Object.values(authState)[index];
      if (data.valid && data.value !== "") {
        user[item] = data.value;
      }
    });
    Object.keys(user).forEach((item, index) => {
      const data = Object.values(authState)[index];

      newUser[item] = data.value;
    });
    auth.onAuthStateChanged((user) => {
      if (user) {
        actions.updateUser(user.uid, newUser);
      }
    });
    setAuthState({
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
      profileImage: {
        value: "",
        valid: true,
      },
    });
    setIsOpen(false);
  };
  
  return (
    <div style={{ width: "100%" }}>
      <ChoiseModal isOpen={isOpen} handleClose={() => setIsOpen(false)}>
        <PageHeader>Are you sure ?</PageHeader>
        <P> Are you sure you want to update your user data ? </P>
        <div style={{ display: "flex" }}>
          <CustomButton title="Cancel" onClick={() => setIsOpen(false)} />
          <CustomButton title="Im sure" onClick={updateUser} />
        </div>
      </ChoiseModal>
      <div className={classes.inputContainer}>
        {textFieldsRegister.map((item) => (
          <TextInput
            key={item.id}
            value={authState[item.key].value}
            onChange={(text) => handleInputChange(item.key, text.target.value)}
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
          onChange={(text) => handleInputChange("bio", text.target.value)}
          className={classes.input}
          label="Write something about yourself"
          type="text"
          multiline
          rows={4}
        />
        <Devider margin={30} />

        <ButtonContainer>
          <CustomButton
            title="Update profile"
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </ButtonContainer>
      </div>
    </div>
  );
};

export default EditProfile;
