import React, { useState } from "react";
import TextInput from "../TextInput";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions/competitionAction";
import CustomButton from "../CustomButton";
import SubHeader from "../UI/SubHeader";
import ChoiseModal from "../ChoiseModal";
import PageHeader from "../UI/PageHeader";
import P from "../UI/Paragraph";
import { Alert } from "@material-ui/lab";
import { useLocation, useHistory } from "react-router-dom";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { auth } from "../firebase";
import ButtonContainer from "../UI/ButtonContainer";
import { editCompetition } from "../../ApiFunctions/Api";
import { Colors } from "../../colors";
import { Grid } from "@material-ui/core";

const textInputs = [
  {
    id: 0,
    label: "Name",
    value: "name",
    type: "text",
    multiline: false,
  },
  {
    id: 2,
    label: "Judge",
    value: "referee",
    type: "text",
    multiline: false,
  },
  {
    id: 3,
    label: "Country",
    value: "country",
    type: "text",
    multiline: false,
  },
  {
    id: 4,
    label: "Location",
    value: "location",
    type: "text",
    multiline: false,
  },
  {
    id: 5,
    label: "Anvils avalible",
    value: "anvils",
    type: "number",
    multiline: false,
  },
  {
    id: 11,
    label: "Semi final spaces",
    value: "semi",
    type: "number",
    multiline: false,
  },
  {
    id: 12,
    label: "Final spaces",
    value: "final",
    type: "number",
    multiline: false,
  },
  {
    id: 6,
    label: "",
    value: "dateFrom",
    type: "date",
    multiline: false,
  },
  {
    id: 7,
    label: "",
    value: "dateTo",
    type: "date",
    multiline: false,
  },
  {
    id: 8,
    label: "Hotels",
    value: "hotels",
    type: "text",
    multiline: true,
  },
  {
    id: 9,
    label: "Parking",
    value: "parking",
    type: "text",
    multiline: true,
  },
  {
    id: 10,
    label: "Other information",
    value: "information",
    type: "text",
    multiline: true,
  },
];

const EditCompetition = () => {
  const [show, setShow] = useState(false);
  const l = useLocation();
  const id = l.id;
  const competition = l.competition;
  const [state, setState] = useState(competition);
  const dispatch = useDispatch();
  const [formValid, setFormValid] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!id) {
    history.push("/admin");
  }

  const updateCompetition = () => {
    dispatch(actions.loading(true));
    const user = auth.currentUser;
    return user.getIdToken().then(async (token) => {
      editCompetition(token, id, state)
        .then((res) => {
          if (res.message === "Succsess") {
            setSuccess(true);
            dispatch(actions.fetchCompetitions());
            dispatch(actions.loading(false));
            setIsOpen(false);
          } else {
            setError(res.message);
            dispatch(actions.loading(false));
            setIsOpen(false);
          }
        })
        .then(() => {})
        .catch((error) => {
          console.error("Error:", error);
          setError(error.message);
          dispatch(actions.loading(false));

          setIsOpen(false);
        });
    });
  };

  const handleCompetition = (event, key) => {
    event.persist();
    setState((prev) => {
      const newValue = {
        ...prev,
        [key]: event.target.value,
      };
      return newValue;
    });
  };
  const addReferee = (event) => {
    event.persist();
    const value = event.target.value;
    if (value.length < 4) {
      setError("You have to add en Judge with more than 3 characters");
      return;
    }
    const currentState = [...state["referee"]];
    currentState.push(event.target.value);
    setState((prev) => {
      const newValue = {
        ...prev,
        referee: currentState,
      };
      return newValue;
    });
  };

  const deleteReferee = (name) => {
    let currentState = [...state["referee"]];
    currentState = currentState.filter((item) => item !== name);

    setState((prev) => {
      const newValue = {
        ...prev,
        referee: currentState,
      };
      return newValue;
    });
  };
  return (
    <div style={{ width: "100%" }}>
      <ChoiseModal isOpen={isOpen} handleClose={() => setIsOpen(false)}>
        <PageHeader>Are you sure ?</PageHeader>
        <P>Are you sure you want to make these changes to your competition ?</P>
        <div style={{ display: "flex" }}>
          <CustomButton title="Cancel" onClick={() => setIsOpen(false)} />
          <CustomButton title="Im sure" onClick={updateCompetition} />
        </div>
      </ChoiseModal>

      <div
        style={{
          margin: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          onClick={() => setShow((prev) => !prev)}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <SubHeader>Competition</SubHeader>
          {show ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </div>

        {!formValid && (
          <Alert severity="error" onClose={() => setFormValid(false)}>
            You dont have a valid form to submit, please check you inputs
          </Alert>
        )}
        {success && (
          <Alert onClose={() => setSuccess(false)}>
            You updated succsessfully!
          </Alert>
        )}
        {error.length > 3 && (
          <Alert severity="error" onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        {show && (
          <>
            {textInputs.map((item, index) => (
              <TextInput
                required
                value={state[item.lable]}
                key={item.id}
                label={item.label}
                type={item.type}
                placeholder={item.label}
                onChange={(event) => handleCompetition(event, item.value)}
              />
            ))}
            <SubHeader>Add Judges</SubHeader>
            <P>
              You can add more than one. A new judge will be added every time
              you leave the textfield
            </P>
            <TextInput
              label="Judge"
              type="text"
              placeholder="Judge"
              onBlur={(event) => addReferee(event)}
            />
            <Grid container>
              {state["referee"].map((item) => {
                return (
                  <Grid item>
                    <Alert
                      style={{
                        backgroundColor: Colors.orange,
                        fontColor: Colors.black,
                        maxWidth: 200,
                        margin: "20px 20px 0px 0px",
                      }}
                      severity="info"
                      key={item}
                      onClose={() => deleteReferee(item)}
                      icon={false}
                    >
                      {item}
                    </Alert>
                  </Grid>
                );
              })}
            </Grid>
            <ButtonContainer>
              <CustomButton
                onClick={() => setIsOpen(true)}
                title="Update competition"
              />
            </ButtonContainer>
          </>
        )}
      </div>
    </div>
  );
};

export default EditCompetition;
