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
import { storage, auth } from "../../components/firebase";
import { Alert } from "@material-ui/lab";
import ButtonContainer from "../UI/ButtonContainer";

const AddClass = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
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
  const l = useLocation();
  const id = l.id;

  const index = classesObject.type !== "Forging" ? 1 : 0;
  const points = compClasses[index].headerTitles.filter((item) => {
    if (item !== "Competitor" && item !== "Total Points") {
      return item;
    }
  });

  const [numberOne, setNumberOne] = useState(
    classesObject.type === "Shoeing" ? 2.5 : 1.5
  );
  const [numberTwo, setNumberTwo] = useState(
    classesObject.type === "Shoeing" ? 2.5 : 1
  );
  const [numberThree, setNumberThree] = useState(
    classesObject.type === "Shoeing" ? 2.5 : 1.5
  );
  const [numberFour, setNumberFour] = useState(
    classesObject.type === "Shoeing" ? 2.5 : 1
  );

  const handleClasses = (key, value) => {
    if (
      key === "shoeOneImg" ||
      key === "shoeTwoImg" ||
      key === "sponsorLoggo"
    ) {
      console.log(value.target.files[0]);
      setClasses((prev) => {
        const newValue = {
          ...prev,
          [key]: value.target.files[0],
        };
        return newValue;
      });
    } else {
      setClasses((prev) => {
        const newValue = {
          ...prev,
          [key]: value.value,
        };
        return newValue;
      });
    }
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
    let newClass = {
      ...classesObject,
      pointsToMultiply: [numberOne, numberTwo, numberThree, numberFour],
    };

    var user = auth.currentUser;
    dispatch(actions.loading(true));
    console.log(classesObject.sponsorLoggo);
    const uploadTask = storage
      .ref()
      .child(`images/${classesObject.sponsorLoggo.name}`)
      .put(classesObject.sponsorLoggo);
    await uploadTask.on(
      "state_changed",
      (snapShot) => {
        newClass.sponsorLoggo = newClass.sponsorLoggo.name;
      },
      (err) => {
        console.log(err);
        dispatch(actions.loading(false));
      }
    );
    if (newClass.type === "Forging") {
      const uploadTaskOne = storage
        .ref()
        .child(`shoes/${newClass.shoeOneImg.name}`)
        .put(newClass.shoeOneImg);
      await uploadTaskOne.on(
        "state_changed",
        (snapShot) => {
          newClass.shoeOneImg = newClass.shoeOneImg.name;
        },
        (err) => {
          console.log(err);
          dispatch(actions.loading(false));
        }
      );
      const uploadTaskTwo = storage
        .ref()
        .child(`shoes/${newClass.shoeTwoImg.name}`)
        .put(classesObject.shoeTwoImg);
      await uploadTaskTwo.on(
        "state_changed",
        (snapShot) => {
          newClass.shoeTwoImg = newClass.shoeTwoImg.name;
        },
        (err) => {
          console.log(err);
          dispatch(actions.loading(false));
        }
      );
    }
    console.log(newClass);

    return user.getIdToken().then(async (token) => {
      fetch(
        `https://us-central1-farrier-project.cloudfunctions.net/app/classes/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newClass),
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          if (res.message === "Succsess") {
            setSuccess(true);
            dispatch(actions.fetchCompetitions());
            dispatch(actions.loading(false));
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
          } else {
            setError(res.message);
            dispatch(actions.loading(false));
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
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setError(error.message);
          dispatch(actions.loading(false));
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
        });
    });
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
      <ChoiseModal isOpen={isOpen} handleClose={() => setIsOpen(false)}>
        <PageHeader>Are you sure ?</PageHeader>
        <P> Are you sure you want to create this class ? </P>
        <div style={{ display: "flex" }}>
          <CustomButton title="Cancel" onClick={() => setIsOpen(false)} />
          <CustomButton title="Im sure" onClick={() => submitNewClass()} />
        </div>
      </ChoiseModal>
      <PageHeader>Add new class</PageHeader>
      <div className="divOrange" />
      <div className="divBlack" />
      <div style={{ margin: 30 }}>
        <div style={{ margin: "auto", width: "80%" }}>
          {success && (
            <Alert onClick={() => setSuccess(false)}>
              Your input to update is not valid, please check your input
            </Alert>
          )}
          {error.length > 3 && (
            <Alert severity="error" onClick={() => setError("")}>
              {error}
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

          <ButtonContainer>
            <CustomButton
              onClick={() => setIsOpen(true)}
              title="Create class"
            />
            <CustomButton onClick={() => history.goBack()} title="Go Back" />
          </ButtonContainer>
        </div>
      </div>
    </>
  );
};

export default AddClass;
