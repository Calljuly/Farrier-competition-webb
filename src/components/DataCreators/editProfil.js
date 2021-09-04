import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../../store/actions/auth";
import ChoiseModal from "../UI/ChoiseModal";
import CustomButton from "../UI/CustomButton";
import { auth, storage } from "../UI/firebase";
import TextInput from "../UI/TextInput";
import ButtonContainer from "../UI/ButtonContainer";
import Devider from "../UI/Devider";
import PageHeader from "../UI/PageHeader";
import P from "../UI/Paragraph";
import TopPagesHeader from "../UI/TopPagesHeader";
import { textFieldsRegister } from './constants/constants';
import EditEmailAndPassword from "./editEmailAndPassword";
import { editProfileStyle } from './styles/styles';

const EditProfile = () => {
  const classes = editProfileStyle();
  const [isOpen, setIsOpen] = useState(false);
  const userState = useSelector((state) => state.auth.user);
  const [authState, setAuthState] = useState(userState);
  const dispatch = useDispatch();
  const history = useHistory();

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

    if (authState.img && typeof authState.img !== "string") {
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
        },
        (err) => {
          console.log(err);
          setIsOpen(false);
        },
        () => {
          storage
            .ref()
            .child(`profiles/${authState.img.name}`)
            .getDownloadURL()
            .then((url) => {
              dispatch(actions.newUserImage(url));
            })
            .catch((err) => {
              console.log(err);
            });
        }
      );
    }

    const user = auth.currentUser;
    user.getIdToken().then(async (token) => {
      fetch(
        `https://us-central1-farrier-project.cloudfunctions.net/app/user/${user.uid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ user: newUserData }),
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          if (res.message === "Success") {
            setSuccess(true);
            dispatch(actions.newUserData(newUserData));
          } else {
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

  const deleteUser = () => {
    const user = auth.currentUser;
    user.getIdToken().then(async (token) => {
      fetch(
        `https://us-central1-farrier-project.cloudfunctions.net/app/user/${user.uid}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          if (res.message === "Success") {
            history.push("/");
          } else {
            setError(res.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <>
      <TopPagesHeader title="Edit Profile" />

      <div style={{ width: "80%", margin: "auto" }}>
        <ChoiseModal isOpen={isOpen} handleClose={() => setIsOpen(false)}>
          <PageHeader>Are you sure ?</PageHeader>
          <P> Are you sure you want to update your user data ? </P>
          <div style={{ display: "flex" }}>
            <CustomButton title="Cancel" onClick={() => setIsOpen(false)} />
            <CustomButton title="Im sure" onClick={updateUser} />
          </div>
        </ChoiseModal>
        <PageHeader>Edit profile Information</PageHeader>
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
        <EditEmailAndPassword />
        <Devider margin={30} />
        <PageHeader>Delete user</PageHeader>
        <P>Do you want to delete your user ? </P>
        <ButtonContainer>
          <CustomButton title="Delete profile" onClick={() => deleteUser()} />
        </ButtonContainer>
      </div>
    </>
  );
};

export default EditProfile;
