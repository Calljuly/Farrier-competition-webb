import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import CustomButton from "../CustomButton";
import P from "../UI/Paragraph";
import PageHeader from "../UI/PageHeader";
import TextInput from "../TextInput";
import Devider from "../UI/Devider";
import ChoiseModal from "../ChoiseModal";
import { auth } from "../firebase";
import * as actions from "../../store/actions/auth";
import { useSelector, useDispatch } from "react-redux";
import ButtonContainer from "../UI/ButtonContainer";
import { storage } from "../firebase";
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
  {
    id: 6,
    label: "",
    type: "file",
    key: "img",
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
  const [authState, setAuthState] = useState(userState);
  const dispatch = useDispatch();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (id, text) => {
    if (id === "img") {
      const updatedState = {
        ...authState,
        [id]: text.target.files[0],
      };
      setAuthState(updatedState);
    } else {
      const updatedState = {
        ...authState,
        [id]: text.target.value,
      };
      setAuthState(updatedState);
    }
  };

  const updateUser = async () => {
    let newUserData = authState;
    if (authState.img) {
      const uploadTask = storage
        .ref()
        .child(`profiles/${authState.img.name}`)
        .put(authState.img);

      await uploadTask.on(
        "state_changed",
        (snapShot) => {
          newUserData = {
            ...authState,
            img: authState.img.name,
          };

          /*
          storage
            .ref()
            .child(`profiles/${authState.profileImage.name}`)
            .getDownloadURL()
            .then((url) => {
              const u = url;
              handleInputChange("profileImage", u);
            })
            .catch((err) => {
              console.log(err);
              setIsOpen(false);
            });*/
        },
        (err) => {
          console.log(err);
          setIsOpen(false);
        }
      );
    }

    const user = auth.currentUser;
    return user.getIdToken().then(async (token) => {
      fetch(
        `https://us-central1-farrier-project.cloudfunctions.net/app/user/${user.uid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: newUserData }),
          Authorization: `Bearer ${token}`,
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          console.log(res);
          if (res.message === "Success") {
            setSuccess(true);
            dispatch(actions.newUserData(newUserData));
          }
          else{
            setError(res.message);
          }
          setIsOpen(false);
        })
        .catch((error) => {
          console.log(error);
          setError(error.message);
          setIsOpen(false);
        });
    });
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
        {success && (
          <Alert onClose={() => setSuccess(false)}>
            Your account was updated successfully!
          </Alert>
        )}
        {error.length > 3 && (
          <Alert severity="error" onClose={() => setError("")}>
            {error}
          </Alert>
        )}
        {textFieldsRegister.map((item) => (
          <TextInput
            key={item.id}
            onChange={(text) => handleInputChange(item.key, text)}
            className={classes.input}
            label={item.label}
            type={item.type}
          />
        ))}
        <TextInput
          onChange={(text) => handleInputChange("bio", text)}
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
