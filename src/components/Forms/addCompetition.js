import React, { useReducer, useState } from "react";
import TextInput from "../TextInput";
import { compClasses, shoes } from "../../dummyData";
import AddClass from "./addClass";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import AddPoints from "../Forms/addPoints";
import * as actions from "../../store/actions/CompActions";

const textInputs = [
  {
    id: 0,
    label: "Name",
    value: "name",
  },
  {
    id: 1,
    label: "Price",
    value: "price",
  },
  {
    id: 2,
    label: "Referee",
    value: "referee",
  },
  {
    id: 3,
    label: "Country",
    value: "country",
  },
  {
    id: 4,
    label: "Max entries",
    value: "maxEntries",
  },
];
const initialState = {
  name: "",
  price: "",
  referee: "",
  country: "",
  maxEntries: "",
  classes: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "name":
      return { ...state, [action.type]: action.value };
    case "price":
      return { ...state, [action.type]: action.value };
    case "referee":
      return { ...state, [action.type]: action.value };
    case "country":
      return { ...state, [action.type]: action.value };
    case "maxEntries":
      return { ...state, [action.type]: action.value };
    case "classes":
      return {
        ...state,
        [action.type]: [...action.value],
      };
    default:
      return;
  }
};
const AddCompetition = () => {
  const [state, dispatchReducer] = useReducer(reducer, initialState);
  const [classesObject, setClasses] = useState({
    pointsToMultiply: [],
    shoeToForge: "",
    shoeToHorse: "",
    time: "",
    type: "",
    result: [],
  });
  const dispatch = useDispatch();
  const array = [];

  const handleClasses = (key, value, index) => {
    setClasses((prev) => {
      const a = {
        ...prev,
        [key]: value,
      };
      return a;
    });
  };

  const addNewClassHandler = () => {
    array.push(classesObject);
    dispatchReducer({
      type: "classes",
      value: array,
    });

    /*const newClassesArray = [...classesObject];
    newClassesArray.push({
      pointsToMultiply: [],
      shoeToForge: "",
      shoeToHorse: "",
      time: "",
      type: "",
    });
    setClasses(newClassesArray);*/
  };
  const confirmPoints = (data) => {
    Object.values(data).map((item) => {
      classesObject.pointsToMultiply.push(item);
    });
  };
  const createCompetition = () => {
    dispatch(actions.createCompetition(state));
  };
  return (
    <div>
      <h3>Competition</h3>
      {textInputs.map((item) => (
        <TextInput
          required
          key={item.id}
          label={item.label}
          placeholder={item.label}
          onChange={(event) =>
            dispatchReducer({ type: item.value, value: event.target.value })
          }
        />
      ))}

      <AddClass
        disabled={classesObject.type === "forging"}
        shoes={shoes}
        compClasses={compClasses}
        handleClasses={handleClasses}
        label=" New Class"
      />

      <AddPoints
        confirmPoints={confirmPoints}
        disabled={classesObject.type === "forging"}
      />

    <Button onClick={addNewClassHandler}>Add new class</Button>

      <Button onClick={createCompetition}>Create Competition</Button>
    </div>
  );
};

export default AddCompetition;
