import React, { useReducer, useState } from "react";
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
    label: "Referee",
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
];
const initialState = {
  name: {
    value: "",
    valid: true,
  },
  referee: {
    value: "",
    valid: true,
  },
  country: {
    value: "",
    valid: true,
  },
  location: {
    value: "",
    valid: true,
  },
  anvils: {
    value: "",
    valid: true,
  },
  admins: [],
  dateFrom: {
    value: "",
    valid: true,
  },
  dateTo: {
    value: "",
    valid: true,
  },

  hotels: {
    value: "",
    valid: true,
  },
  parking: {
    value: "",
    valid: true,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "name":
      return {
        ...state,
        [action.type]: {
          ...state[action.type],
          [action.key]: action.value,
        },
      };
    case "location":
      return {
        ...state,
        [action.type]: {
          ...state[action.type],
          [action.key]: action.value,
        },
      };
    case "referee":
      return {
        ...state,
        [action.type]: {
          ...state[action.type],
          [action.key]: action.value,
        },
      };
    case "country":
      return {
        ...state,
        [action.type]: {
          ...state[action.type],
          [action.key]: action.value,
        },
      };
    case "anvils":
      return {
        ...state,
        [action.type]: {
          ...state[action.type],
          [action.key]: action.value,
        },
      };
    case "dateFrom":
      return {
        ...state,
        [action.type]: {
          ...state[action.type],
          [action.key]: action.value,
        },
      };
    case "dateTo":
      return {
        ...state,
        [action.type]: {
          ...state[action.type],
          [action.key]: action.value,
        },
      };
    case "hotels":
      return {
        ...state,
        [action.type]: {
          ...state[action.type],
          [action.key]: action.value,
        },
      };
    case "parking":
      return {
        ...state,
        [action.type]: {
          ...state[action.type],
          [action.key]: action.value,
        },
      };

    default:
      return;
  }
};
const EditCompetition = () => {
  const [show, setShow] = useState(false);
  const l = useLocation();
  const id = l.id;
  const [state, dispatchReducer] = useReducer(reducer, initialState);
  const dispatch = useDispatch();
  const [formValid, setFormValid] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  let valid = true;
  const history = useHistory();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!id) {
    history.push("/admin");
  }

  const updateCompetition = () => {
    const valid = formValidation();
    if (valid) {
      dispatch(actions.loading(true));
      var user = auth.currentUser;
      return user.getIdToken().then(async (token) => {
        const comp = {
          country: state.country.value,
          anvils: state.anvils.value,
          name: state.name.value,
          referee: state.referee.value,
          dateTo: state.dateTo.value,
          dateFrom: state.dateFrom.value,
          location: state.location.value,
          hotels: state.hotels.value,
          parking: state.parking.value,
        };
        fetch(
          `https://us-central1-farrier-project.cloudfunctions.net/app/competitions/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(comp),
          }
        )
          .then((response) => {
            return response.json();
          })
          .then((res) => {
            console.log(res.message);
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
    }
    setIsOpen(false);
  };

  const validateText = (text, key) => {
    valid = true;
    if (text.trim() === "") {
      valid = false;
    }
    if (text.length < 3) {
      valid = false;
    }
    dispatchReducer({ type: key, value: valid, key: "valid" });
  };

  const formValidation = () => {
    const a = Object.keys(state);
    let valid = true;
    a.forEach((item) => {
      const b = state[item];
      if (b.valid === false || b.value === "") {
        valid = false;
      }
    });
    setFormValid(valid);
    return valid;
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
          <Alert severity="error">
            You dont have a valid form to submit, please check you inputs
          </Alert>
        )}
        {success && (
          <Alert onClick={() => setSuccess(false)}>
            You updated succsessfully!
          </Alert>
        )}
        {error.length > 3 && (
          <Alert severity="error" onClick={() => setError("")}>
            {error}
          </Alert>
        )}
        {show && (
          <>
            {textInputs.map((item) => (
              <TextInput
                required
                key={item.id}
                label={item.label}
                type={item.type}
                placeholder={item.label}
                onChange={(event) =>
                  dispatchReducer({
                    type: item.value,
                    value: event.target.value,
                    key: "value",
                  })
                }
                onBlur={() => validateText(state[item.value].value, item.value)}
                error={!state[item.value].valid}
                helperText={
                  !state[item.value].valid &&
                  "You have to enter a valid input, atleast 3 characters"
                }
              />
            ))}
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
