import React, { useState } from "react";
import CustomSelect from "../Select";
import { compClasses } from "../../dummyData";
import CustomButton from "../CustomButton";
import { useHistory } from "react-router-dom";
import SubHeader from "../UI/SubHeader";
import ForgingClass from "../Classes/ForgingClass";
import ShoeingClass from "../Classes/ShoeingClass";
import ComboClass from "../Classes/ComboClass";
import EagleEye from "../Classes/EagleEye";
import { useLocation } from "react-router-dom";
import { firestore } from "../firebase";
import ChoiseModal from "../ChoiseModal";
import PageHeader from "../UI/PageHeader";
import P from "../UI/Paragraph";

const EditCompetition = () => {
  const { goBack } = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [numberOne, setNumberOne] = useState(1);
  const [numberTwo, setNumberTwo] = useState(1);
  const [numberThree, setNumberThree] = useState(1);
  const [numberFour, setNumberFour] = useState(1);
  const [classesObject, setClasses] = useState({
    className: {
      value: "",
      valid: true,
    },
    pointsToMultiply: [],
    shoeToForge: "",
    shoeToHorse: "",
    time: {
      value: "",
      valid: true,
    },
    type: "",
    result: [],
    unPublishedResult: [],
    sponsors: {
      value: "",
      valid: true,
    },
    sponsorLoggo: "",
    referee: "",
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
    const newClass = {
      ...classesObject,
      pointsToMultiply: [numberOne, numberTwo, numberThree, numberFour],
    };
    await firestore
      .collection("competitions")
      .doc(id)
      .collection("classes")
      .doc(newClass.className)
      .set({
        className: newClass.className,
        pointsToMultiply: newClass.pointsToMultiply,
        shoeOne: newClass.shoeToForge,
        shoeTwo: newClass.shoeToHorse,
        time: newClass.time,
        type: newClass.type,
        unPublishedResult: newClass.unPublishedResult,
        savedResult: false
      });

    setClasses({
      className: "",
      pointsToMultiply: [],
      shoeToForge: "",
      shoeToHorse: "",
      time: "",
      type: "",
      result: [],
      unPublishedResult: [],
      sponsors: "",
      sponsorLoggo: "",
      referee: "",
    });
    setIsOpen(false);
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
      <ChoiseModal isOpen={isOpen} handleClose={() => setIsOpen(false)}>
        <PageHeader>Are you sure ?</PageHeader>
        <P> Are you sure you want to create this class ? </P>
        <div style={{ display: "flex" }}>
          <CustomButton title="Cancel" onClick={() => setIsOpen(false)} />
          <CustomButton title="Im sure" onClick={() => submitNewClass()} />
        </div>
      </ChoiseModal>

      <div style={{ margin: "auto", width: "80%" }}>
        <SubHeader>Create new class</SubHeader>
        <CustomSelect
          handler={handleClasses}
          label="Type"
          id="type"
          classTypes={compClasses}
        />
        {getClass(classesObject.type)}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <CustomButton onClick={() => setIsOpen(true)} title="Create class" />
          <CustomButton onClick={() => goBack()} title="Go Back" />
        </div>
      </div>
    </div>
  );
};

export default EditCompetition;
