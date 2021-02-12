import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { compClasses } from "../../dummyData";
import CustomButton from "../CustomButton";
import { useHistory, useLocation } from "react-router-dom";
import SubHeader from "../UI/SubHeader";
import ForgingClass from "../Classes/ForgingClass";
import ShoeingClass from "../Classes/ShoeingClass";
import ComboClass from "../Classes/ComboClass";
import ChoiseModal from "../ChoiseModal";
import PageHeader from "../UI/PageHeader";
import P from "../UI/Paragraph";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions/competitionAction";
import Devider from "../UI/Devider";
import { storage, auth } from "../../components/firebase";
import { Alert } from "@material-ui/lab";
import ButtonContainer from "../UI/ButtonContainer";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Colors } from "../../colors";
import { createClass } from "../../ApiFunctions/Api";
import TopPageHeader from "../UI/TopPagesHeader";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    marginRight: 20,
  },
  "&.makeStyles-formControl-42": {
    margin: 0,
  },
  select: {
    "&:before": {
      margin: 0,
      borderBottom: `1px solid ${Colors.black}`,
    },
    "&:after": {
      borderBottom: `1px solid ${Colors.orange}`,
    },
    "&:hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error):before": {
      borderBottom: `1px solid ${Colors.orange}`,
    },
  },
}));

const AddClass = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const classes = useStyles();
  const [classesObject, setClasses] = useState({
    className: "",
    pointsToMultiply: [],
    shoeOne: "",
    shoeOneType: "",
    shoeOneImg: "",
    shoeTwo: "",
    shoeTwoType: "",
    shoeTwoImg: "",
    time: "",
    type: "",
    unPublishedResult: [],
    sponsors: "",
    sponsorLoggo: "",
    referee: "",
    savedResult: false,
    feet: "right",
    divisions: "",
  });

  const l = useLocation();
  const id = l.id;
  const competition = l.competitionDivisions;

  if (!competition || !id) {
    history.push("/admin");
  }

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
    if (
      classesObject.divisions === "" ||
      classesObject.className === "" ||
      classesObject.type === ""
    ) {
      setError(
        "You need to add your class to a division or regular, name  and type"
      );
      setIsOpen(false);
      return;
    }
    let newClass = {
      ...classesObject,
      pointsToMultiply: [numberOne, numberTwo, numberThree, numberFour],
    };

    const user = auth.currentUser;
    dispatch(actions.loading(true));

    if (classesObject.sponsorLoggo && classesObject.sponsorLoggo !== "") {
      const uploadTask = storage
        .ref()
        .child(`sponsors/${classesObject.sponsorLoggo.name}`)
        .put(classesObject.sponsorLoggo);
      await uploadTask.on(
        "state_changed",
        (snapShot) => {
          newClass.sponsorLoggo = newClass.sponsorLoggo.name;
        },
        (err) => {
          console.log(err);
          dispatch(actions.loading(false));
          setIsOpen(false);
        }
      );
    }
    if (classesObject.shoeOneImg && classesObject.shoeOneImg !== "") {
      const uploadTask = storage
        .ref()
        .child(`sponsors/${classesObject.shoeOneImg.name}`)
        .put(classesObject.shoeOneImg);
      await uploadTask.on(
        "state_changed",
        (snapShot) => {
          newClass.shoeOneImg = newClass.shoeOneImg.name;
        },
        (err) => {
          console.log(err);
          dispatch(actions.loading(false));
          setIsOpen(false);
        }
      );
    }
    if (classesObject.shoeTwoImg && classesObject.shoeTwoImg !== "") {
      const uploadTask = storage
        .ref()
        .child(`sponsors/${classesObject.shoeTwoImg.name}`)
        .put(classesObject.shoeTwoImg);
      await uploadTask.on(
        "state_changed",
        (snapShot) => {
          newClass.shoeTwoImg = newClass.shoeTwoImg.name;
        },
        (err) => {
          console.log(err);
          dispatch(actions.loading(false));
          setIsOpen(false);
        }
      );
    }

    user.getIdToken().then(async (token) => {
      createClass(token, newClass, id)
        .then((res) => {
          console.log(res);
          if (res.message === "Succsess") {
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
            setSuccess(true);
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
      setIsOpen(false);
    });
  };

  useEffect(() => {
    switch (classesObject.type) {
      case "Shoeing":
        setClasses((prev) => {
          const newValue = {
            ...prev,
            ["shoeOneType"]: "Shoeing",
            ["shoeTwoType"]: "Shoeing",
          };
          return newValue;
        });
        return;
      case "Forging":
        setClasses((prev) => {
          const newValue = {
            ...prev,
            ["shoeOneType"]: "Forging",
            ["shoeTwoType"]: "Forging",
          };
          return newValue;
        });
        return;
      case "Combo":
        setClasses((prev) => {
          const newValue = {
            ...prev,
            ["shoeOneType"]: "Shoeing",
            ["shoeTwoType"]: "Forging",
          };
          return newValue;
        });
        return;
      default:
        return;
    }
  }, [classesObject.type]);

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
        break;
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
      <TopPageHeader title="Add new class" />

      <div style={{ margin: 30 }}>
        <div style={{ margin: "auto", width: "80%" }}>
          {success && (
            <Alert onClose={() => setSuccess(false)}>
              Your class was created successfully!
            </Alert>
          )}
          {error.length > 3 && (
            <Alert severity="error" onClose={() => setError("")}>
              {error}
            </Alert>
          )}
          <SubHeader>Create new class</SubHeader>
          <FormControl className={classes.formControl}>
            <InputLabel>Pick type</InputLabel>
            <Select
              value={classesObject.type}
              onChange={(event) => handleClasses("type", event.target)}
              className={classes.select}
            >
              {compClasses &&
                compClasses.map((item) => {
                  return (
                    <MenuItem key={item.type} value={item.type}>
                      {item.title}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Pick Division</InputLabel>
            <Select
              value={classesObject.divisions}
              onChange={(event) => handleClasses("divisions", event.target)}
              className={classes.select}
            >
              {competition &&
                competition.map((item) => {
                  return (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
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
