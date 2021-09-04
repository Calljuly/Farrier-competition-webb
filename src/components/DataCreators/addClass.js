import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { createClass } from "../../apiFunctions/Api";
import { auth, firestore, storage } from "../../components/UI/firebase";
import { compClasses } from "../../dummyData";
import * as actions from "../../store/actions/competitionAction";
import ChoiseModal from "../UI/ChoiseModal";
import ComboClass from "../Classes/ComboClass";
import ForgingClass from "../Classes/ForgingClass";
import ShoeingClass from "../Classes/ShoeingClass";
import CustomButton from "../UI/CustomButton";
import ButtonContainer from "../UI/ButtonContainer";
import Devider from "../UI/Devider";
import PageHeader from "../UI/PageHeader";
import P from "../UI/Paragraph";
import SubHeader from "../UI/SubHeader";
import TopPageHeader from "../UI/TopPagesHeader";
import { addClassStyle } from './styles/styles';

const AddClass = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const classes = addClassStyle();
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

    function uploadComplete(uploadTask, key) {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        firestore
          .collection("competitions")
          .doc(id)
          .collection(classesObject.divisions)
          .doc(classesObject.className)
          .update({ [key]: downloadURL });
        dispatch(actions.fetchCompetitions());
      });
    }
    user.getIdToken().then(async (token) => {
      createClass(token, newClass, id)
        .then((res) => {
          if (res.message === "Succsess") {
            const filesToUpload = [];
            if (classesObject.shoeOneImg && classesObject.shoeOneImg !== "") {
              filesToUpload.push({
                key: "shoeOneImg",
                map: "shoes",
                file: classesObject.shoeOneImg,
              });
            }
            if (classesObject.shoeTwoImg && classesObject.shoeTwoImg !== "") {
              filesToUpload.push({
                key: "shoeTwoImg",
                map: "shoes",
                file: classesObject.shoeTwoImg,
              });
            }
            if (
              classesObject.sponsorLoggo &&
              classesObject.sponsorLoggo !== ""
            ) {
              filesToUpload.push({
                key: "sponsorLoggo",
                map: "sponsors",
                file: classesObject.sponsorLoggo,
              });
            }
            if (filesToUpload.length > 0) {
              filesToUpload.forEach(async (item) => {
                const uploadTask = storage
                  .ref()
                  .child(`${item.map}/${item.file.name}`)
                  .put(item.file);

                await uploadTask.on(
                  "state_changed",
                  (snap) => {
                    console.log(snap);
                  },
                  (err) => {
                    console.log(err);
                  },
                  () => uploadComplete(uploadTask, item.key)
                );
              });
            }
            setSuccess(true);
          } else {
            setError(res.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });

    dispatch(actions.loading(false));
    setIsOpen(false);
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

  useEffect(() => {
    switch (classesObject.type) {
      case "Shoeing":
        setClasses((prev) => {
          const newValue = {
            ...prev,
            shoeOneType: "Shoeing",
            shoeTwoType: "Shoeing",
          };
          return newValue;
        });
        return;
      case "Forging":
        setClasses((prev) => {
          const newValue = {
            ...prev,
            shoeOneType: "Forging",
            shoeTwoType: "Forging",
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
