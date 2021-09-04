import { Grid } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import { Alert } from "@material-ui/lab";
import React, { useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { createCompetition } from "../../apiFunctions/Api";
import { Colors } from "../../colors";
import * as actions from "../../store/actions/competitionAction";
import ChoiseModal from "../UI/ChoiseModal";
import CustomButton from "../UI/CustomButton";
import { auth } from "../UI/firebase";
import TextInput from "../UI/TextInput";
import ButtonContainer from "../UI/ButtonContainer";
import Devider from "../UI/Devider";
import PageHeader from "../UI/PageHeader";
import P from "../UI/Paragraph";
import SubHeader from "../UI/SubHeader";
import {textInputsAddCompetition, divisionDataAddCompetition} from './constants/constants';

const initialState = {
  name: {
    value: "",
    valid: true,
    required: true,
  },
  referee: {
    value: [],
    valid: true,
    required: true,
  },
  country: {
    value: "",
    valid: true,
    required: true,
  },
  location: {
    value: "",
    valid: true,
    required: true,
  },
  anvils: {
    value: "",
    valid: true,
    required: true,
  },
  semi: {
    value: "",
    valid: true,
  },
  final: {
    value: "",
    valid: true,
  },
  admins: [],
  dateFrom: {
    value: "",
    valid: true,
    required: true,
  },
  dateTo: {
    value: "",
    valid: true,
    required: true,
  },

  hotels: {
    value: "",
    valid: true,
  },
  parking: {
    value: "",
    valid: true,
  },
  information: {
    value: "",
    valid: true,
  },
  divisions: ["regular"],
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
    case "semi":
      return {
        ...state,
        [action.type]: {
          ...state[action.type],
          [action.key]: action.value,
        },
      };
    case "final":
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
    case "information":
      return {
        ...state,
        [action.type]: {
          ...state[action.type],
          [action.key]: action.value,
        },
      };
    case "divisions":
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
  const user = auth.currentUser;
  const [state, dispatchReducer] = useReducer(reducer, initialState);
  const dispatch = useDispatch();
  const [formValid, setFormValid] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [divisions, setDivisions] = useState({
    div1: false,
    div2: false,
    div3: false,
  });

  const changeDivisions = (event) => {
    setDivisions({ ...divisions, [event.target.name]: event.target.checked });
  };

  let valid = true;

  const addCompetition = (userId) => {
    const divs = Object.keys(divisions).filter((item, index) => {
      if (Object.values(divisions)[index]) {
        return item;
      }
    });

    const valid = formValidation();
    if (valid) {
      dispatch(actions.loading(true));
      const admin = [];
      admin.push(userId);
      const comp = {
        currentEntries: 0,
        result: [],
        entries: [],
        country: state.country.value,
        anvils: state.anvils.value,
        semi: state.semi.value,
        final: state.final.value,
        name: state.name.value,
        referee: state.referee.value,
        admins: admin,
        dateTo: state.dateTo.value,
        dateFrom: state.dateFrom.value,
        location: state.location.value,
        hotels: state.hotels.value,
        parking: state.parking.value,
        information: state.information.value,
        divisions: divs,
      };

      const user = auth.currentUser;
      user.getIdToken().then(async (token) => {
        createCompetition(token, comp)
          .then((res) => {
            if (res.message === "Succsess") {
              setSuccess(true);
              setIsOpen(false);
              dispatch(actions.fetchCompetitions());
              dispatch(actions.loading(false));
            } else {
              setError(res.error);
              setIsOpen(false);
              dispatch(actions.loading(false));
            }
          })
          .catch((error) => {
            setError(error);
            setIsOpen(false);
            dispatch(actions.loading(false));

            return error;
          });
        setIsOpen(false);
      });
    }
    setIsOpen(false);
  };

  const validateText = (text, key, type, required) => {
    valid = true;
    if (required) {
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
    }
    dispatchReducer({ type: key, value: valid, key: "valid" });
  };

  const formValidation = () => {
    const a = Object.keys(state);
    let valid = true;
    a.forEach((item) => {
      const b = state[item];
      if (b.required) {
        if (b.valid === false || b.value === "") {
          valid = false;
        }
      }
    });
    setFormValid(valid);
    return valid;
  };

  const addReferee = (event) => {
    event.persist();
    const value = event.target.value;
    if (value.length < 4) {
      setError("You have to add en Judge with more than 3 characters");
      return;
    }
    const currentState = [...state["referee"].value];
    currentState.push(event.target.value);

    dispatchReducer({ type: "referee", value: currentState, key: "value" });
  };

  const deleteReferee = (name) => {
    let currentState = [...state["referee"].value];
    currentState = currentState.filter((item) => item !== name);

    dispatchReducer({ type: "referee", value: currentState, key: "value" });
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
            onClick={() => addCompetition(user.uid)}
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
          You created your competition sucsessfully!
        </Alert>
      )}
      {error.length > 4 && (
        <Alert severity="error" onClose={() => setError("")}>
          {error}
        </Alert>
      )}
      {textInputsAddCompetition.map((item) => (
        <TextInput
          required={item.required}
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
          onBlur={() =>
            validateText(
              state[item.value].value,
              item.value,
              item.type,
              item.required
            )
          }
          error={!state[item.value].valid}
          helperText={
            !state[item.value].valid &&
            "You have to enter a valid input, atleast 3 characters"
          }
        />
      ))}
      <FormControl component="fieldset" style={{ marginTop: 20 }}>
        <SubHeader>
          Choose which divisions to include in you competition
        </SubHeader>

        <FormGroup style={{ display: "flex", flexDirection: "row" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={divisions.div1}
                onChange={changeDivisions}
                name="div1"
              />
            }
            label="Div 1"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={divisions.div2}
                onChange={changeDivisions}
                name="div2"
              />
            }
            label="Div 2"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={divisions.div3}
                onChange={changeDivisions}
                name="div3"
              />
            }
            label="Div 3"
          />
        </FormGroup>
      </FormControl>

      <SubHeader>Add Judges</SubHeader>
      <P>
        You can add more than one. A new judge will be added every time you
        leave the textfield
      </P>
      <TextInput
        required
        label="Judge"
        type="text"
        placeholder="Judge"
        onBlur={(event) => addReferee(event)}
      />
      <Grid container>
        {state["referee"].value.map((item) => {
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
      <Devider margin={30} />
      <ButtonContainer>
        <CustomButton
          onClick={() => setIsOpen(true)}
          title="Create Competition"
        />
      </ButtonContainer>
    </div>
  );
};

export default AddCompetition;
