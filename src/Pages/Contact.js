import React, { useState, useEffect, useReducer } from "react";
import { makeStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import P from "../components/UI/Paragraph";
import PageHeader from "../components/UI/PageHeader";
import { Colors } from "../colors";
import Devider from "../components/UI/Devider";
import TextInput from "../components/TextInput";
import { Button } from "@material-ui/core";
import SubHeader from "../components/UI/SubHeader";
import ButtonContainer from "../components/UI/ButtonContainer";
import Picture from "../assets/Images/newpic.jpg";

const useStyle = makeStyles({
  email: {
    textDecoration: "none",
    color: "black",
  },
  container: {
    width: "99%",
    padding: 20,
    marginTop: 10,
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
  },
  button: {
    backgroundColor: Colors.black,
    color: Colors.orange,
    width: 200,
    padding: 10,
    margin: "10px 0px 10px 10px",
    ["@media (max-width:956px)"]: {
      width: "100%",
    },
  },
  input: {
    width: "96%",
    margin: 20,
  },
});

const initialState = {
  firstName: {
    value: "",
    valid: true,
  },
  lastName: {
    value: "",
    valid: true,
  },
  email: {
    value: "",
    valid: true,
  },
  phone: {
    value: "",
    valid: true,
  },
  message: {
    value: "",
    valid: true,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "firstName":
      return {
        ...state,
        [action.type]: {
          ...state[action.type],
          [action.key]: action.value,
        },
      };
    case "lastName":
      return {
        ...state,
        [action.type]: {
          ...state[action.type],
          [action.key]: action.value,
        },
      };
    case "email":
      return {
        ...state,
        [action.type]: {
          ...state[action.type],
          [action.key]: action.value,
        },
      };
    case "phone":
      return {
        ...state,
        [action.type]: {
          ...state[action.type],
          [action.key]: action.value,
        },
      };
    case "message":
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

const Contact = () => {
  const classes = useStyle();
  const [state, dispatchReducer] = useReducer(reducer, initialState);
  const [formValid, setFormValid] = useState(false);
  let valid;

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

    return valid;
  };
  useEffect(() => {
    setFormValid(formValidation());
  }, [state]);

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <PageHeader>Contact</PageHeader>
      </div>
      <div className="divOrange" />
      <div className="divBlack" />
      <Devider margin={30} />
      <div
        style={{
          display: "flex",
          margin: 40,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <h2>Fill out the form to contact me</h2>
            <form
              className={classes.formContainer}
              name="contact"
              method="post"
            >
              <input type="hidden" name="form-name" value="contact" />

              <TextInput
                type="text"
                className={classes.input}
                label="First name"
                placeholder="First name"
                name="firstName"
                value={state.firstName.value}
                onChange={(event) =>
                  dispatchReducer({
                    type: "firstName",
                    value: event.target.value,
                    key: "value",
                  })
                }
                onBlur={(event) =>
                  validateText(
                    state["firstName"].value,
                    event.target.name,
                    event.target.type
                  )
                }
              />
              <TextInput
                type="text"
                className={classes.input}
                label="Last name"
                placeholder="Last name"
                name="lastName"
                value={state.lastName.value}
                onChange={(event) =>
                  dispatchReducer({
                    type: "lastName",
                    value: event.target.value,
                    key: "value",
                  })
                }
                onBlur={(event) =>
                  validateText(
                    state["lastName"].value,
                    event.target.name,
                    event.target.type
                  )
                }
              />
              <TextInput
                type="text"
                className={classes.input}
                label="Email"
                placeholder="Email"
                name="email"
                value={state.email.value}
                onChange={(event) =>
                  dispatchReducer({
                    type: "email",
                    value: event.target.value,
                    key: "value",
                  })
                }
                onBlur={(event) =>
                  validateText(
                    state["email"].value,
                    event.target.name,
                    event.target.type
                  )
                }
              />
              <TextInput
                className={classes.input}
                label="Phone"
                placeholder="Phone"
                type="number"
                name="phone"
                value={state.phone.value}
                onChange={(event) =>
                  dispatchReducer({
                    type: "phone",
                    value: event.target.value,
                    key: "value",
                  })
                }
                onBlur={(event) =>
                  validateText(
                    state["phone"].value,
                    event.target.name,
                    event.target.type
                  )
                }
              />
              <TextInput
                type="text"
                className={classes.input}
                label="Message"
                multiline
                rows={4}
                name="message"
                value={state.message.value}
                onChange={(event) =>
                  dispatchReducer({
                    type: "message",
                    value: event.target.value,
                    key: "value",
                  })
                }
                onBlur={(event) =>
                  validateText(
                    state["message"].value,
                    event.target.name,
                    event.target.type
                  )
                }
              />
              <ButtonContainer>
                <Button
                  disabled={!formValid}
                  name="button"
                  type="submit"
                  className={classes.button}
                >
                  Send Message
                </Button>
              </ButtonContainer>
            </form>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src={Picture}
              alt="Timmy Hoas"
              style={{ width: "100%", marginBottom: 20 }}
            />
            <h2>Julia Call and Timmy Hoas</h2>

            <P>
              If you want to get in touch with the creators please contact us by
              the email or phone number below.
            </P>
            <P>
              Our names are Julia Call and Timmy Hoas and we are the creators of
              the site. The site has been made to make it easier for competitive
              farriers to enter their competitions, create them, follow results
              and keep live scores if wished.
              <br />
              <br />
            </P>
            <P>
              <strong>Mvh Julia Call</strong>
            </P>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
export default Contact;
