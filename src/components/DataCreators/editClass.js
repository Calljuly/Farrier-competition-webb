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
import { editClass } from "../../ApiFunctions/Api";

const EditClass = ({ classes }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [numberOne, setNumberOne] = useState(1);
  const [numberTwo, setNumberTwo] = useState(1);
  const [numberThree, setNumberThree] = useState(1);
  const [numberFour, setNumberFour] = useState(1);
  const [classesObject, setClasses] = useState(classes);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
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
    const points = classesObject.pointsToMultiply.reduce((a, b) => {
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
    
    dispatch(actions.loading(true));

    const user = auth.currentUser;
    user.getIdToken().then(async (token) => {
      editClass(token, id, newClass.className, newClass)
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
