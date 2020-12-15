import React, { useState, useEffect } from "react";
import CustomSelect from "../Select";
import { compClasses } from "../../dummyData";
import CustomButton from "../CustomButton";
import { useHistory, useLocation } from "react-router-dom";
import SubHeader from "../UI/SubHeader";
import ForgingClass from "../Classes/ForgingClass";
import ShoeingClass from "../Classes/ShoeingClass";
import ComboClass from "../Classes/ComboClass";
import EagleEye from "../Classes/EagleEye";
import ChoiseModal from "../ChoiseModal";
import PageHeader from "../UI/PageHeader";
import P from "../UI/Paragraph";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/competitionAction";
import Devider from "../UI/Devider";
import { storage } from "../../components/firebase";
import { Alert } from "@material-ui/lab";

const AddClass = () => {
  const dispatch = useDispatch();
  const history = useHistory();
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
    shoeOne: "",
    shoeOneImg: "",
    shoeTwo: "",
    shoeTwoImg: "",
    time: {
      value: "",
      valid: true,
    },
    type: "",
    unPublishedResult: [],
    sponsors: {
      value: "",
      valid: true,
    },
    sponsorLoggo: "",
    referee: "",
    savedResult: false,
    feet: "right",
  });
  const sucsess = useSelector((state) => state.competitions.sucsess);
  const l = useLocation();
  const id = l.id;

  const index = classesObject.type !== "Forging" ? 1 : 0;
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

    dispatch(actions.addNewClass(id, newClass));

    setClasses({
      pointsToMultiply: [],
      shoeOne: "",
      shoeOneImg: "",
      shoeTwo: "",
      shoeTwoImg: "",
      time: "",
      type: "",
      result: [],
      unPublishedResult: [],
      sponsors: "",
      sponsorLoggo: "",
      referee: "",
      feet: "right",
    });
    setIsOpen(false);
  };
  useEffect(() => {
    if (!id) {
      history.push("/admin");
    }
  }, [compClasses]);

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
            feet={classesObject.feet}
          />
        );
      case "ComboClass":
        return (
          <ComboClass
            pointsHandler={pointsHandler}
            points={compClasses}
            handleClasses={handleClasses}
            feet={classesObject.feet}
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
    <>
      <PageHeader>Add new class</PageHeader>
      <div className="divOrange" />
      <div className="divBlack" />
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
          {sucsess && (
            <Alert onClose={() => dispatch(actions.closeAlert())}>
              You updated sucsessfully!
            </Alert>
          )}
          <SubHeader>Create new class</SubHeader>
          <CustomSelect
            handler={handleClasses}
            label="Type"
            id="type"
            classTypes={compClasses}
          />
          {getClass(classesObject.type)}
          <Devider margin={30} />

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <CustomButton
              onClick={() => setIsOpen(true)}
              title="Create class"
            />
            <CustomButton onClick={() => history.goBack()} title="Go Back" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddClass;
