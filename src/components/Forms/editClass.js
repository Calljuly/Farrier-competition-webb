import React, { useState } from "react";
import { compClasses } from "../../dummyData";
import CustomButton from "../CustomButton";
import { useLocation } from "react-router-dom";
import SubHeader from "../UI/SubHeader";
import ForgingClass from "../Classes/ForgingClass";
import ShoeingClass from "../Classes/ShoeingClass";
import ComboClass from "../Classes/ComboClass";
import EagleEye from "../Classes/EagleEye";
import ChoiseModal from "../ChoiseModal";
import PageHeader from "../UI/PageHeader";
import P from "../UI/Paragraph";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions/competitionAction";
import { Alert } from "@material-ui/lab";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { auth } from "../firebase";

const EditClass = ({ classes }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [numberOne, setNumberOne] = useState(1);
  const [numberTwo, setNumberTwo] = useState(1);
  const [numberThree, setNumberThree] = useState(1);
  const [numberFour, setNumberFour] = useState(1);
  const [classesObject, setClasses] = useState(classes);
  const [formValid, setFormValid] = useState(true);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  let valid = true;
  const l = useLocation();
  const id = l.id;

  const index = classesObject.type === "Forging" ? 1 : 0;
  const points = compClasses[index].headerTitles.filter((item) => {
    if (item !== "Competitor" && item !== "Total Points") {
      return item;
    }
  });

  const handleClasses = (key, value) => {
    setClasses((prev) => {
      const newValue = {
        ...prev,
        [key]: value.value,
      };
      return newValue;
    });
  };

  const pointsHandler = (key, event) => {
    switch (key) {
      case 0:
        setNumberOne(event.value);
        break;
      case 1:
        setNumberTwo(event.value);
        break;
      case 2:
        setNumberThree(event.value);
        break;
      case 3:
        setNumberFour(event.value);
        break;
      default:
        return;
    }
  };

  const submitNewClass = async () => {
    const points = classesObject.pointsToMultiply.reduce(function (a, b) {
      return a + b;
    }, 0);
    let newClass = {};
    if (points > 4) {
      newClass = {
        ...classesObject,
      };
    } else {
      newClass = {
        ...classesObject,
        pointsToMultiply: [numberOne, numberTwo, numberThree, numberFour],
      };
    }

    const o = {};
    Object.keys(newClass).forEach((item, index) => {
      if (
        Object.values(newClass)[index] !== "" ||
        !Object.values(newClass)[index] === []
      ) {
        const value = Object.values(newClass)[index];

        o[item] = value;
      }
    });
    valid = formValidation();

    if (valid) {
      dispatch(actions.loading(true));

      var user = auth.currentUser;
      return user.getIdToken().then(async (token) => {
        fetch(
          `https://us-central1-farrier-project.cloudfunctions.net/app/classes/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ className: classes.className, classes: o }),
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
              setClasses({
                className: "",
                pointsToMultiply: [],
                shoeOne: "",
                shoeTwo: "",
                time: "",
                type: "",
                unPublishedResult: [],
                sponsors: "",
                sponsorLoggo: "",
                referee: "",
              });
              setIsOpen(false);
            } else {
              setError(res.message);
              dispatch(actions.loading(false));

              setClasses({
                className: "",
                pointsToMultiply: [],
                shoeOne: "",
                shoeTwo: "",
                time: "",
                type: "",
                unPublishedResult: [],
                sponsors: "",
                sponsorLoggo: "",
                referee: "",
              });
              setIsOpen(false);
            }
          })
          .then(() => {})
          .catch((error) => {
            console.error("Error:", error);
            setError(error.message);
            dispatch(actions.loading(false));
            setClasses({
              className: "",
              pointsToMultiply: [],
              shoeOne: "",
              shoeTwo: "",
              time: "",
              type: "",
              unPublishedResult: [],
              sponsors: "",
              sponsorLoggo: "",
              referee: "",
            });
            setIsOpen(false);
          });
      });
    }
  };
  const formValidation = () => {
    const a = Object.keys(classesObject);
    let valid = true;
    a.forEach((item) => {
      const b = classesObject[item];
      if (item !== "sponsorLoggo") {
        if (b === "" || b.length === 0) {
          valid = false;
        }
      }
    });

    setFormValid(valid);
    return valid;
  };

  const getClass = (type) => {
    switch (type) {
      case "Forging":
        return (
          <ForgingClass
            pointsHandler={pointsHandler}
            points={points}
            handleClasses={handleClasses}
          />
        );

      case "Shoeing":
        return (
          <ShoeingClass
            pointsHandler={pointsHandler}
            points={points}
            handleClasses={handleClasses}
          />
        );
      case "ComboClass":
        return (
          <ComboClass
            pointsHandler={pointsHandler}
            points={compClasses}
            handleClasses={handleClasses}
          />
        );
      case "EagleEye":
        return (
          <EagleEye
            pointsHandler={pointsHandler}
            points={points}
            handleClasses={handleClasses}
          />
        );
      case "SpeedForging":
        break;
      case "Team":
        break;
      case "Pairs":
        break;
      default:
        return;
    }
  };
  return (
    <div>
      <ChoiseModal isOpen={isOpen} handleClose={() => setIsOpen(false)}>
        <PageHeader>Are you sure ?</PageHeader>
        <P> Are you sure you want update this class ? </P>
        <div style={{ display: "flex" }}>
          <CustomButton title="Cancel" onClick={() => setIsOpen(false)} />
          <CustomButton title="Im sure" onClick={() => submitNewClass()} />
        </div>
      </ChoiseModal>
      <div
        onClick={() => setShow((prev) => !prev)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <SubHeader>Edit {classes.className}</SubHeader>
        {show ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </div>
      {!formValid && (
        <Alert severity="error">
          Your input to update is not valid, please check your input
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
          {getClass(classes.type)}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <CustomButton
              onClick={() => setIsOpen(true)}
              title="Update this class"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default EditClass;
