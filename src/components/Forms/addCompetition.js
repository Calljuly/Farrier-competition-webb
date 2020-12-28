import React, { useReducer, useState } from "react";
import TextInput from "../TextInput";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions/competitionAction";
import CustomButton from "../CustomButton";
import { useSelector } from "react-redux";
import SubHeader from "../UI/SubHeader";
import ChoiseModal from "../ChoiseModal";
import PageHeader from "../UI/PageHeader";
import P from "../UI/Paragraph";
import { Alert } from "@material-ui/lab";
import Devider from "../UI/Devider";
import { auth } from "../firebase";

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
const AddCompetition = () => {
  const user = useSelector((state) => state.auth.user);
  const [state, dispatchReducer] = useReducer(reducer, initialState);
  const dispatch = useDispatch();
  const [formValid, setFormValid] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  let valid = true;

  const createCompetition = (userName) => {
    const valid = formValidation();
    if (valid) {
      dispatch(actions.loading(true));
      const admin = [];
      admin.push(userName);
      const comp = {
        currentEntries: 0,
        result: [],
        entries: [],
        country: state.country.value,
        anvils: state.anvils.value,
        name: state.name.value,
        referee: state.referee.value,
        admins: admin,
        dateTo: state.dateTo.value,
        dateFrom: state.dateFrom.value,
        location: state.location.value,
        hotels: state.hotels.value,
        parking: state.parking.value,
      };

      var user = auth.currentUser;
      return user.getIdToken().then(async (token) => {
        fetch(
          "https://us-central1-farrier-project.cloudfunctions.net/app/competitions",
          {
            method: "POST",
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
            if (res.message === "Succsess") {
              setSuccess(true);
              setIsOpen(false);
              dispatch(actions.fetchCompetitions());
              dispatch(actions.loading(false));
            } else {
              setError(res.message);
              setIsOpen(false);
              dispatch(actions.loading(false));
            }
          })
          .catch((error) => {
            setError(error.message);
            setIsOpen(false);
            dispatch(actions.loading(false));

            return error;
          });
      });
    }
  };

  const validateText = (text, key, type) => {
    valid = true;
    if (type === "number") {
      if (text.trim() === "") {
        valid = false;
      }
      if (text.length === 0) {
        valid = false;
      }
    } else {
      if (text.trim() === "") {
        valid = false;
      }
      if (text.length < 3) {
        valid = false;
      }
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "80%",
        margin: "auto",
      }}
    >
      <ChoiseModal isOpen={isOpen} handleClose={() => setIsOpen(false)}>
        <PageHeader>Are you sure ?</PageHeader>
        <P> Are you sure you want to create yhis competition ? </P>
        <div style={{ display: "flex" }}>
          <CustomButton title="Cancel" onClick={() => setIsOpen(false)} />
          <CustomButton
            title="Im sure"
            onClick={() => createCompetition(user.name)}
          />
        </div>
      </ChoiseModal>
      <SubHeader>Competition</SubHeader>
      {!formValid && (
        <Alert severity="error">
          You dont have a valid form to submit, please check you inputs
        </Alert>
      )}
      {success && (
        <Alert onClose={() => setSuccess(false)}>
          You updated sucsessfully!
        </Alert>
      )}
      {error.length > 4 && (
        <Alert security="error" onClose={() => setError("")}>
          {error}
        </Alert>
      )}
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
          onBlur={() => validateText(state[item.value].value, item.value, item.type)}
          error={!state[item.value].valid}
          helperText={
            !state[item.value].valid &&
            "You have to enter a valid input, atleast 3 characters"
          }
        />
      ))}
      <Devider margin={30} />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <CustomButton
          onClick={() => setIsOpen(true)}
          title="Create Competition"
        />
      </div>
    </div>
  );
};

export default AddCompetition;
