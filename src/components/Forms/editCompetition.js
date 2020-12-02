import React, { useState } from "react";
import TextInput from "../TextInput";
import CustomSelect from "../Select";
import { compClasses, shoes } from "../../dummyData";
import CustomButton from "../CustomButton";
import { Grid } from "@material-ui/core";
import P from "../UI/Paragraph";
import { useHistory } from "react-router-dom";
import SubHeader from "../UI/SubHeader";

import ForgingClass from "../Classes/ForgingClass";
import ShoeingClass from "../Classes/ShoeingClass";
import ComboClass from "../Classes/ComboClass";
import EagleEye from "../Classes/EagleEye";
import { useLocation } from "react-router-dom";

const EditCompetition = () => {
  const { goBack } = useHistory();
  const [numberOne, setNumberOne] = useState(1);
  const [numberTwo, setNumberTwo] = useState(1);
  const [numberThree, setNumberThree] = useState(1);
  const [numberFour, setNumberFour] = useState(1);
  const [classesObject, setClasses] = useState({
    className: "",
    pointsToMultiply: [],
    shoeOne: "",
    shoeTwo: "",
    time: "",
    type: "",
    result: [],
    unPublishedResult: [],
    sponsors: "",
  });

  const l = useLocation();
  const id = l.id;

  const index = classesObject.type === "forging" ? 1 : 0;
  const points = compClasses[index].headerTitles.filter((item) => {
    if (item !== "Competitor" && item !== "Total Points") {
      return item;
    }
  });

  const handleClasses = (key, value) => {
    setClasses((prev) => {
      const newValue = {
        ...prev,
        [key]: value,
      };
      return newValue;
    });
  };

  const pointsHandler = (key, event) => {
    event.preventDefault();
    switch (key) {
      case 0:
        setNumberOne(event.target.value);
        break;
      case 1:
        setNumberTwo(event.target.value);
        break;
      case 2:
        setNumberThree(event.target.value);
        break;
      case 3:
        setNumberFour(event.target.value);
        break;
      default:
        return;
    }
  };

  const submitNewClass = () => {
    const newClass = {
      ...classesObject,
      pointsToMultiply: [numberOne, numberTwo, numberThree, numberFour],
    };
    console.log(newClass);
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
            points={points}
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
    <div style={{ margin: 30 }}>
      <Grid container spacing={2}>
        <Grid item md={8} xs={12}>
          <SubHeader>Class</SubHeader>
          <CustomSelect
            handler={handleClasses}
            label="Type"
            id="type"
            classTypes={compClasses}
          />
          {getClass(classesObject.type)}
          <div style={{ display: "flex" }}>
            <CustomButton
              onClick={() => submitNewClass()}
              title="Create class"
            />
            <CustomButton onClick={() => goBack()} title="Go Back" />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default EditCompetition;
